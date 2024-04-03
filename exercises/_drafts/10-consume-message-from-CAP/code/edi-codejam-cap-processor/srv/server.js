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

  console.log(`Received message: '${message.body}'.`);

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
      console.log(
        "Invalid CloudEvent message:",
        ajv.errorsText(validate.errors)
      );
      validationMessage =
        "Invalid Payload: Payload is not a CloudEvent message. Schema validation: " +
        ajv.errorsText(validate.errors);
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.log("SyntaxError", error.message);
      validationMessage = "Invalid JSON: " + error.message;
    } else {
      var errorDescription = error.name + ": " + error.message;
      console.log(errorDescription);
      validationMessage = errorDescription;
    }
  }

  const isValid = validationMessage == "" ? true : false;

  console.log(`Message is valid: ${isValid}. Validation message: ${validationMessage}`);

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
        console.log(x);
        console.log("Message has been inserted into the database");
      });

    if (isValid && ceData != null) {
      // Calculate qrcode
      var ticketId = ceData.ID;

      console.log("ticketId: " + ticketId);

      var QRCode = require("qrcode");

      QRCode.toDataURL(ticketId, function (err, url) {
        console.log(url);

        // Print the type of url
        console.log(typeof url);

        if (err) {
          console.log(err);
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
              console.log(x);
              console.log("QRCode has been inserted into the database");
            });
        }
        
        // Send the processed message to the topic
        publishMessageToTopic(qrcodeEntry, process.env.SOLACE_REST_PUBLISH_TOPIC);
      });
    }
  } catch (error) {
    var errorDescription = error.name + ": " + error.message;
    console.log(errorDescription);
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
    QueueConsumer.exit();
  });

  /********************************************************
   * Set up Queue Consumer
   ********************************************************/

  var solaceHostname = `${process.env.SOLACE_AMQP_PROTOCOL}://${process.env.SOLACE_AMQP_USERNAME}:${process.env.SOLACE_AMQP_PASSWORD}@${process.env.SOLACE_AMQP_HOST}:${process.env.SOLACE_AMQP_PORT}`;

  var queueConsumer = new QueueConsumer(processMessage)
    .host(solaceHostname)
    .queue(process.env.SOLACE_AMPQ_QUEUE_NAME);

  // the next statement blocks until a message is received
  queueConsumer.receive();
});
