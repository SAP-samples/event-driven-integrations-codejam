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
* Define the Cloud Event contents *
***********************************
*/

const ticketId = "VPHAH0OC";

const type = "com.itelo-entertainment.tms.Ticket.Purchased.v1";
const source = "https://tms-prod.itelo-entertainment.com/tickets";
const datacontenttype = "application/json";
const sapcommunityid = "ajmaradiaga";

var data = {
  "ID": ticketId,
  "BusinessPartner": "10003245",
  "TicketType": {
    "ID": 1,
    "Description": "General Admission",
  },
  "NumberOfTickets": 2,
};

/*
**************************
* Create the Cloud Event *
**************************
*/

const emit = emitterFor(sendProcessedMessageToTopic, { mode: Mode.STRUCTURED });

// Create a new CloudEvent
const ce = new CloudEvent({ type, source, datacontenttype, data, sapcommunityid });

/*
**************************
* Send the Cloud Event *
**************************
*/

// Send it to the endpoint - encoded as HTTP binary by default but we've set it to structured
console.log(ce);

emit(ce);
