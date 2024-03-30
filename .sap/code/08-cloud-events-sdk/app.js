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

const ticketId = "VPHAH0OC";

const type = "itelo.tms.ticket.v1.Ticket.Purchased.v1";
const source = "https://tms-prod.itelo-entertainment.com/tickets";
const datacontenttype = "application/json";
const sapcommunityid = "[your-sap-community-id]";

var data = {
  "ID": ticketId,
  "Customer": {
    "Name": "John Doe",
    "Email": "john.doe@gmail.com"
  },
  "CustomerAddress": {
    "Street": "123 Main St",
    "City": "Anytown",
    "State": "CA",
    "Postcode": "12345",
    "Country": "USA",
  },
  "TicketType": {
    "ID": 1,
    "Description": "General Admission",
  },
  "DeliverTicketsByMail": true,
  "NumberOfTickets": 2,
};

/*
**************************
* Create the CloudEvent *
**************************
*/

const emit = emitterFor(sendProcessedMessageToTopic, { mode: Mode.STRUCTURED });

// Create a new CloudEvent
const ce = new CloudEvent({ type, source, datacontenttype, data, sapcommunityid });

/*
**************************
* Send the CloudEvent *
**************************
*/

console.log(ce);

emit(ce);
