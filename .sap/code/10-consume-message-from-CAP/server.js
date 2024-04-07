const cds = require("@sap/cds");
const https = require("https");
const { CloudEvent, HTTP } = require("cloudevents");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const cloudEventsSchema = require("./cloudEventsSchema");
const QueueConsumer = require("./queueConsumer");
const publishMessageToTopic = require("./topicPublisher");

const ajv = new Ajv();
addFormats(ajv);

var InternalService = null;

function processMessage(message) {
  const { messages, qrcodes } = InternalService.entities();

  const LOG = cds.log("consumer");

  LOG.info("Received message:", message.body);

  var topic = "";
  var validationMessage = "";
  var communityId = "";

  // CloudEvent elements
  var messageId = null;
  var source = null;
  var specversion = null;
  var type = null;
  var payload = "";
  var ceData = null;

  /********************************************************
   * Validate the message against a CloudEvents schema
   ********************************************************/

  try {
    topic = message.properties.to;
    payload = message.body;

    // Validate that the body is a JSON
    var body = JSON.parse(message.body);

    // Check for required CloudEvent elements
    messageId = "id" in body ? body.id : null;
    source = "source" in body ? body.source : null;
    specversion = "specversion" in body ? body.specversion : null;
    type = "type" in body ? body.type : null;
    ceData = "data" in body ? body.data : null;

    const validate = ajv.compile(cloudEventsSchema);
    const isMessageBodyCloudEvent = validate(body);

    if (!isMessageBodyCloudEvent) {
      LOG.error(
        "Invalid CloudEvent message:",
        ajv.errorsText(validate.errors)
      );
      validationMessage =
        "Invalid Payload: Payload is not a CloudEvent message. Schema validation: " +
        ajv.errorsText(validate.errors);
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      LOG.error("SyntaxError", error.message);
      validationMessage = "Invalid JSON: " + error.message;
    } else {
      var errorDescription = error.name + ": " + error.message;
      LOG.error(errorDescription);
      validationMessage = errorDescription;
    }
  }

  const isValid = validationMessage == "" ? true : false;

  LOG.info('Message is valid: ', isValid, 'Validation message: ', validationMessage);

  /********************************************************
   * Store the message in the database
   ********************************************************/

  var entry = {
    topic: topic,
    messageId: messageId,
    source: source,
    specversion: specversion,
    type: type,
    payload: payload,
    isValid: isValid,
    validationCriticality: isValid ? 3 : 1,
    validationMessage: validationMessage,
  };

  try {
    INSERT.into(messages)
      .entries(entry)
      .then((x) => {
        LOG.info(x);
        LOG.info("Message has been inserted into the database", entry.messageId);
      });

    if (isValid && ceData != null) {
      // Calculate qrcode
      var ticketId = ceData.ID;

      LOG.info("Ticket Id: ", ticketId);

      var QRCode = require("qrcode");

      QRCode.toDataURL(ticketId, function (err, url) {
        LOG.info("QRCode data URL:" , url);

        // Print the type of url
        LOG.info(typeof url);

        if (err) {
          LOG.error(err);
          return;
        } else {
          var qrcodeEntry = {
            ticketId: ticketId,
            messageId: messageId,
            dataURL: url,
          };

          INSERT.into(qrcodes)
            .entries(qrcodeEntry)
            .then((x) => {
              LOG.info(x);
              LOG.info("QRCode has been inserted into the database");
            });
        }
        
        // Send the processed message to the topic
        publishMessageToTopic(qrcodeEntry, process.env.SOLACE_REST_PUBLISH_TOPIC);
      });
    }
  } catch (error) {
    var errorDescription = error.name + ": " + error.message;
    LOG.error(errorDescription);
    validationMessage = errorDescription;
  }

}

cds.on("served", (services) => {
  // We can safely access service instances through the provided argument
  InternalService = services.InternalService;

  process.on("unhandledRejection", (reason, promise) => {
    console.log(
      "QueueConsumer Unhandled Rejection: promise ",
      promise,
      ", reason: ",
      reason
    );
    queueConsumer.exit();
  });

  /********************************************************
   * Set up Queue Consumer
   ********************************************************/

  var solaceHostname = `${process.env.SOLACE_AMQP_PROTOCOL}://${process.env.SOLACE_AMQP_USERNAME}:${process.env.SOLACE_AMQP_PASSWORD}@${process.env.SOLACE_AMQP_HOST}:${process.env.SOLACE_AMQP_PORT}`;

  var queueConsumer = new QueueConsumer(processMessage)
    .host(solaceHostname)
    .queue(process.env.SOLACE_AMPQ_QUEUE_NAME)
    .logger(cds.log("AMPQConsumer"));

  // the next statement blocks until a message is received
  queueConsumer.receive();
});
