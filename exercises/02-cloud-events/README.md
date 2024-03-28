# Exercise 02 - CloudEvents specification

The payload of an event can be anything.... It can be plain text, XML, JSON, or even binary format. Fortunately, there is a specification we can use to describe the event data. In this exercise, we will focus on what the [CloudEvents specification](https://github.com/CloudEvents/spec) is, the . Finally, we will touch on how this specification has been adopted by different SAP products to describe the events produced by the systems. 

<p align = "center">
    <img alt="CloudEvents logo" src="assets/CloudEvents-logo.png" width="50%"/><br/>
    <i>CloudEvents</i>
</p>

## What is CloudEvents?

Today's system landscapes are very complex and we need to deal with many systems communicating with each other, ideally as close to real-time as possible. Nowadays, a system can publish events to notify other systems of the changes happening within the objects of their system. Given that we are talking of many systems, ideally, there will be a common way of describing the data produced by these systems. The CloudEvents specification can help us with this. We can leverage it to provide a consistent way for how our systems can communicate with others about these events.

As mentioned on the [CloudEvents website](https://CloudEvents.io/)..... CloudEvents is a specification for describing event data in a common way. It's goal is to simplify event declaration and delivery across services, platforms and beyond! The specification is now under the [Cloud Native Computing Foundation](https://cncf.io/).

Below is an example of what a CloudEvent message will look like:
```json
{
  "specversion" : "1.0",
  "type" : "com.github.pull_request.opened",
  "source" : "https://github.com/cloudevents/spec/pull",
  "subject" : "123",
  "id" : "A234-1234-1234",
  "time" : "2018-04-05T17:31:00Z",
  "comexampleextension1" : "value",
  "comexampleothervalue" : 5,
  "datacontenttype" : "text/xml",
  "data" : "<much wow=\"xml\"/>"
}
```

You'll notice that the example above is composed of many attributes. These attributes describe the event and are independent of the event data. Meaning that we can somehow process/inspect the event without needing to process its data. Now, let's dive a bit into the message itself.

> For more information on the history, development and design rationale behind the specification, see the [CloudEvents Primer](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/primer.md) document.

## CloudEvents message format

A CloudEvent message is mainly composed of context attributes and data. As we briefly touched on previously, the payload in the data field will depend if it is a notification event or an ECTS event.

### Context Attributes

A number of attributes can be included within the message, these attributes are known as [Context Attributes](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#context-attributes) and the idea is that these context attributes can be used to describe the event. We can think of these context attributes as the header information of our event. Let's explore some of the attributes available.

| Name | Required | Description | Example |
| ---- | ----- | ---- | --- |
| id | ✅ | Identifies the event. Producers MUST ensure that source + id is unique for each distinct event. | QgEK7wzuHtqdhJwqCS+VOA== |
| source | ✅ | Identifies the context in which an event happened. | https://github.com/cloudevents |
| specversion | ✅ | The version of the CloudEvents specification which the event uses. | `1.0` |
| type | ✅ | Describes the type of the event | `sap.s4.beh.businesspartner.v1.BusinessPartner.Created.v1` |
| datacontenttype | | Content type of the value in data. | `application/json` |


#### Extension Context Attributes
A CloudEvent message may also include additional context attributes, which are not defined as part of the specification. These additional attributes are known as "extension attributes" and can be used by the producer systems to include additional metadata to an event, similar to how we can use HTTP custom headers.

👉 Check out the events available for the [SAP Digital Vehicle Hub](https://hub.sap.com/event/SAPDigitalVehicleHubBusinessEvents_SAPDigitalVehicleHubBusinessEvents/resource) in the SAP Business Accelerator Hub.

For example, in the [SAP Digital Vehicle Hub Business Events package](https://hub.sap.com/event/SAPDigitalVehicleHubBusinessEvents_SAPDigitalVehicleHubBusinessEvents), we can see that the event is raised when a vehicle changes - `sap.dmo.dvh.Vehicle.Changed.v1`, contains the extension context attribute `sappassport`, which is an SAP-specific tracing identifier.

```json
{
  "specversion": "1.0",
  "type": "sap.dmo.dvh.Vehicle.Changed.v1",
  "source": "/eu10/sap.dmo.dvh",
  "subject": "808E6E30B65149978A443429B29FB300",
  "id": "a823e884-5edc-4194-a81a-f3a3632417ee",
  "time": "2018-04-08 08:31:00",
  "datacontenttype": "application/json",
  "sappassport": "string",
  ....
}
```

### Data

A CloudEvent message may include a payload but this is not required. If included it will be in the format specified in the `datacontenttype` context attribute. Although it is not required, we will generally have a payload in messages. Below we can see an example of an event message that contains a payload.

```json
{
  "specversion": "1.0",
  "type": "sap.dmo.dvh.Vehicle.Changed.v1",
  "source": "/eu10/sap.dmo.dvh",
  "subject": "808E6E30B65149978A443429B29FB300",
  "id": "a823e884-5edc-4194-a81a-f3a3632417ee",
  "time": "2018-04-08 08:31:00",
  "datacontenttype": "application/json",
  "sappassport": "string",
  "data": { 
    "BusinessPartner": "10003245"
  }
}
```

## Create a CloudEvent

Now that we are familiar with the CloudEvent format, let's proceed to create our first CloudEvent message. For this, let's use as an example the ticket website included in the diagram of our event-driven integration scenario. Let's imagine that the ticket website generates an event after a customer purchases a ticket. The event generated includes customer information (BusinessPartner) and the number of tickets it wants to purchase. 

> The goal of this exercise is to get familiar with the message format and create a sample event message that we can use in the future.

👉 Create a CloudEvent message manually, that follows the CloudEvent specification, simulating the ticket website when a ticket is purchased. Validate your message on this service - TBA.

Below is an example of an event message that follows the CloudEvent specification and that could be produced by our ticket website when a ticket is purchased. 

```json
{
  "specversion": "1.0",
  "type": "com.itelo-entertainment.tms.Ticket.Purchased.v1",
  "source": "https://tms-prod.itelo-entertainment.com/tickets",
  "subject": "VPHAH0OC",
  "id": "d121e256-2afd-1724-c80b-b5l3645357fa",
  "time": "2024-05-06 10:10:00",
  "datacontenttype": "application/json",
  "data": { 
    "ID": "VPHAH0OC",
    "BusinessPartner": "10003245"
    "TicketType": {
      "ID": 1,
      "Description": "General Admission",
      },
    "NumberOfTickets": 2,
  }
}
```

To summarise, CloudEvents is a specification for describing event data in common formats. The goal is to provide interoperability across services, platforms and systems.

## CloudEvent transport format

Event Formats specify how to serialize a CloudEvent with certain encoding formats. Depending on our requirements it is possible that we might need to use a specific format to encode our CloudEvent message. We might need to send the data in something different than the JSON format, e.g. [AVRO](https://github.com/cloudevents/spec/blob/main/cloudevents/formats/avro-format.md), [Protobuf](https://github.com/cloudevents/spec/blob/main/cloudevents/formats/protobuf-format.md). Check out the specification document if you want to learn more about these [different formats](https://github.com/cloudevents/spec/blob/main/cloudevents/formats/).

> For simplicity purposes we will stick to the [JSON Event format](https://github.com/cloudevents/spec/blob/main/cloudevents/formats/json-format.md) as it is the most common and easiest to interact with.

Now that we are familiar with what a CloudEvent is, what a CloudEvent message looks like, and the different Event transport formats available, let's see how we can create one programmatically.

## CloudEvents SDK

There are language-specific SDKs that can be used to create a message that complies with the CloudEvents standard. Below is a list of the different languages that an SDK is available for:

- [C#](https://github.com/cloudevents/sdk-csharp)
- [Go](https://github.com/cloudevents/sdk-go)
- [Java](https://github.com/cloudevents/sdk-java)
- [Javascript](https://github.com/cloudevents/sdk-javascript)
- [PHP](https://github.com/cloudevents/sdk-php)
- [PowerShell](https://github.com/cloudevents/sdk-powershell)
- [Python](https://github.com/cloudevents/sdk-python)
- [Ruby](https://github.com/cloudevents/sdk-ruby)
- [Rust](https://github.com/cloudevents/sdk-rust)

Using an SDK allows us to easily create a CloudEvent message and ensure that it follows the guidelines defined in the standard. As an example, below we can see how we can use the Python SDK to create the CloudEvent message for the Ticket Website that I used as an example previously.

```python
from cloudevents.http import CloudEvent
from cloudevents.conversion import to_binary
import requests

ticket_id = "VPHAH0OC"

# Create a CloudEvent
attributes = {
"specversion": "1.0",
  "type": "com.itelo-entertainment.tms.Ticket.Purchased.v1",
  "source": "https://tms-prod.itelo-entertainment.com/tickets",
  "subject": ticket_id,
}
data = { 
    "ID": ticket_id,
    "BusinessPartner": "10003245"
    "TicketType": {
      "ID": 1,
      "Description": "General Admission",
      },
    "NumberOfTickets": 2,
  }

event = CloudEvent(attributes, data)

# Creates the HTTP request representation of the CloudEvent in binary content mode
headers, body = to_binary(event)

print(body)
```
In a future exercise, we will create a CloudEvent message programmatically using the CloudEvents SDK available for Node.js.

## Summary

We've learned about the CloudEvents specification and how it can help us to provide a consistent way for how our systems can communicate with others about the events generated by a system. We also learned about the CloudEvents message format, which is composed of context attributes and data. Finally, we learned about the different Event transport formats available and how using an SDK can help us when creating a CloudEvent message programmatically.

## Further Study

* [CloudEvents website](https://CloudEvents.io/)
* [CloudEvents specification](https://github.com/CloudEvents/spec)
* [Privacy and Security of an event message](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#privacy-and-security)

---

If you finish earlier than your fellow participants, you might like to ponder these questions. There isn't always a single correct answer and there are no prizes - they're just to give you something else to think about.

1. Can you think of reasons why would you want to inspect the message header before processing the data?
2. What are some things that you should take into consideration when thinking of the data that you should include in message?
   <details>
    <summary>Hint 🔦</summary>
    <i>Privacy and Security recommendation included in the <a href="https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#privacy-and-security">CloudEvents specification</a>. </i>
    </details>
3. 

## Next

Continue to 👉 [Exercise 03 - SAP's adoption of CloudEvents](../03-cloud-events-at-sap/README.md)
