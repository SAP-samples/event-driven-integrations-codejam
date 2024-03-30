/*
* This is a simple example of how to create a CloudEvent and send it to a SAP Integration Suite, advanced event mesh.
* The CloudEvent is created with the CloudEvents SDK for JavaScript - https://www.npmjs.com/package/cloudevents.
* The CloudEvent is then sent to the event broker service using the emitter.js module.
* The emitter.js module uses the Solace REST API to send the CloudEvent to the event broker service.
* We need to set some environment variables, which are loaded using dotenv - https://www.npmjs.com/package/dotenv.
*/

const { emitterFor, Mode, CloudEvent } = require("cloudevents");

require('dotenv').config()

const sendProcessedMessageToTopic = require('./emitter');

/*
***********************************
* Define the CloudEvent contents *
***********************************
*/



/*
**************************
* Create the CloudEvent *
**************************
*/



/*
**************************
* Send the CloudEvent *
**************************
*/

