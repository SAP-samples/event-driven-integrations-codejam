const https = require("https");
const { CloudEvent, HTTP } = require("cloudevents");

function publishMessageToTopic(payload, topic) {
  const LOG = cds.log("publisher");
  const base64Credentials = Buffer.from(
    `${process.env.SOLACE_REST_USERNAME}:${process.env.SOLACE_REST_PASSWORD}`
  ).toString("base64");

  LOG.info('Sending processed message to topic', topic);

  /****************************
   * Create CloudEvent message and publish to topic
   ***************************/

  // INSERT CODE HERE

  try {
    const req = https.request(options, (res) => {
      let response = "";

      res.on("data", (chunk) => {
        response += chunk;
      });

      res.on("end", () => {
        LOG.info('Submitted processed message to topic', topic);
        LOG.info(response);
      });
    });

    req.on("error", (error) => {
      LOG.error(error);
    });

    req.write(postData);
    req.end();
  } catch (error) {
    LOG.error(error);
  }
}

module.exports = publishMessageToTopic;
