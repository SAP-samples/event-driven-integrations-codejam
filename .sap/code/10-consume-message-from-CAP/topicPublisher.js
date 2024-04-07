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

  const ce = new CloudEvent({
    specversion: "1.0",
    type: "com.sap.codejam.edi.maildelivery.processed",
    source: "https://codejam-edi-cap-processor.cfapps.eu10.hana.ondemand.com/",
    data: payload
  });

  const { headers, body } = HTTP.structured(ce);

  // Add Authorization to headers
  headers["Authorization"] = `Basic ${base64Credentials}`;

  const postData = JSON.stringify(JSON.parse(body), null, 2);

  LOG.debug("Headers: ", JSON.stringify(headers, null, 2));
  LOG.debug("Body: ", postData);

  const options = {
    hostname: process.env.SOLACE_REST_HOST,
    port: process.env.SOLACE_REST_PORT,
    path: `/${topic}`,
    method: "POST",
    headers: headers,
  };

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
