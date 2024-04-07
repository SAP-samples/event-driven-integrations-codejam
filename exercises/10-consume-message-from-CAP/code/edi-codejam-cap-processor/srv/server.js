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

  // INSERT CODE HERE

  /********************************************************
   * Store the message in the database
   ********************************************************/

  // INSERT CODE HERE

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

  // INSERT CODE HERE
  
});
