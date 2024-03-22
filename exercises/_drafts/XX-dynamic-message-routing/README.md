# Exercise XX - Dynamic Message Routing

So far we've been able to publish and consume messages within a single event broker service. 

The payload of an event can be anything.... It can be plain text, XML, JSON, or even binary format. Fortunately, there is a specification we can use to describe the event data. In this exercise, we will focus on what the [CloudEvents specification](https://github.com/CloudEvents/spec) is, the . Finally, we will touch on how this specification has been adopted by different SAP products to describe the events produced by the systems. 

<p align = "center">
    <img alt="CloudEvents logo" src="assets/CloudEvents-logo.png" width="50%"/><br/>
    <i>CloudEvents</i>
</p>

## What is CloudEvents?

Today's system landscapes are very complex and we need to deal with many systems communicating with each other, ideally as close to real-time as possible. Nowadays, a system can publish events to notify other systems of the changes happening within the objects of their system. Given that we are talking of many systems, ideally there will be a common way of describing the data produced by these systems. The CloudEvents specification can help us with this. We can leverage it to provide a consistent way for how our systems can communicate with others about these events.

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

For example, in the [SAP Digital Vehicle Hub Business Events package](https://hub.sap.com/event/SAPDigitalVehicleHubBusinessEvents_SAPDigitalVehicleHubBusinessEvents), we can see that the event raised when a vehicle changes - `sap.dmo.dvh.Vehicle.Changed.v1`, contains the extension context attribute `sappassport`, which is an SAP specific tracing identifier.

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

A CloudEvent message may include a payload but this is not required. If included it will be in the format specified in the `datacontenttype` context attribute. Although it is not required, we will generally have a payload in messages. Below we can see an example of an event message which contains a payload.

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

Now that we are familiar with the CloudEvent format, let's proceed to create our first CloudEvent message. For this, let's use as an example an existing system in our organization. Think of a system that you are familiar with. A system that you know that it interacts/notifies other systems in your landscape about a particular change occurring within it. 

> The event that we create doesn't need to be of a real system/scenario. The goal of this exercise is to get familiar with the message format and create a sample event message that we can use in the future.

In my case, I will use as a reference a ticket managing system and create a CloudEvent message that will be produced whenever a new ticket is created. 

```json
{
  "specversion": "1.0",
  "type": "com.ajmaradiaga.tms.Ticket.Created.v1",
  "source": "https://tms-prod.ajmaradiaga.com/tickets",
  "subject": "IT00010232",
  "id": "d121e256-2afd-1724-c80b-b5l3645357fa",
  "time": "2024-02-22 14:10:00",
  "datacontenttype": "application/json",
  "data": { 
    "ID": "IT00010232",
    "Description": "Install ColdTurkey to block distracting websites.",
    "Urgency": {
      "ID": 1,
      "Description": "High"
    }
  }
}
```

Create a CloudEvent message and share it as a comment in the comments section below.

---

As we learned in the previous exercise, CloudEvents is a specification for describing event data in common formats. The goal is to provide interoperability across services, platforms and systems.

## CloudEvent format

Event Formats specify how to serialize a CloudEvent with certain encoding formats. Depending on our requirements it is possible that we might need to use a specific format to encode our CloudEvent message. We might need to send the data in something different than the JSON format, e.g. [AVRO](https://github.com/cloudevents/spec/blob/main/cloudevents/formats/avro-format.md), [Protobuf](https://github.com/cloudevents/spec/blob/main/cloudevents/formats/protobuf-format.md). Check out the specification document if you want to learn more about these [different formats](https://github.com/cloudevents/spec/blob/main/cloudevents/formats/).

> For simplicity purposes we will stick to the [JSON Event format](https://github.com/cloudevents/spec/blob/main/cloudevents/formats/json-format.md) as it is the most common and easiest to interact with.

In the previous exercise we basically created . If we would have sent that message with the HTTP protocol it would have been of type `application/cloudevents+json`.

Now that we are familiar with what a CloudEvent is, what a CloudEvent message looks like, and the different Event Formats available, let's see how we can create one programmatically.

## CloudEvents SDK

There are language-specific SDKs that can be used to create a message that complies with the CloudEvents standard. Below a list of the different languages that an SDK is available for:

- [C#](https://github.com/cloudevents/sdk-csharp)
- [Go](https://github.com/cloudevents/sdk-go)
- [Java](https://github.com/cloudevents/sdk-java)
- [Javascript](https://github.com/cloudevents/sdk-javascript)
- [PHP](https://github.com/cloudevents/sdk-php)
- [PowerShell](https://github.com/cloudevents/sdk-powershell)
- [Python](https://github.com/cloudevents/sdk-python)
- [Ruby](https://github.com/cloudevents/sdk-ruby)
- [Rust](https://github.com/cloudevents/sdk-rust)

Using an SDK allows us to easily create a CloudEvent message and ensure that it follows the guidelines defined in the standard. As an example, I will use the Python SDK to create the CloudEvent message for the Ticket Management System that I used as an example previously.

```python
from cloudevents.http import CloudEvent
from cloudevents.conversion import to_binary
import requests

ticket_id = "IT00010232"

# Create a CloudEvent
attributes = {
    "type": "com.ajmaradiaga.tms.Ticket.Created.v1",
    "source": "https://tms-prod.ajmaradiaga.com/tickets",
    "subject": ticket_id,
}
data = { 
    "ID": ticket_id,
    "Description": "Install ColdTurkey to block distracting websites.",
    "Urgency": {
      "ID": 1,
      "Description": "High"
    }
  }
event = CloudEvent(attributes, data)

# Creates the HTTP request representation of the CloudEvent in binary content mode
headers, body = to_binary(event)

print(body)
```


For this week's challenge. Pick you favourite language from the list above and create the message that you shared as part of week's 1 challenge. 

> There is no SDK available for your favourite language? Not a problem, you can create the message structure manually. Just share the code used to generate a message and a screenshot of the program's output.

To complete this week's challenge, share the code you used to create the CloudEvent message and a screenshot of your program's output.

In a future exercise, we will use the XYZ SDK in SAP Business Application Studio to create a message that follows the CloudEvent specification and send it to SAP Integration Suite, Advanced Event Mesh.

## CloudEvents at SAP

SAP is one of the many [adopters](https://CloudEvents.io/) of the CloudEvents specification and we've noticed this in the events that we explored in [exercise 01](../01-events-sap-ecosystem/README.md). Let's dissect the ***PRODUCT NAME*** payload and see how it aligns with the CloudEvents specification.

Now that you are familiar with the CloudEvents specification, we are ready to start exploring the events capabilities of SAP Integration Suite, Advanced Event Mesh and start sending some events.

## Further Study

* [CloudEvents specification](https://github.com/CloudEvents/spec)
* [JSON Event Format](https://github.com/cloudevents/spec/blob/main/cloudevents/formats/json-format.md)

---

If you finish earlier than your fellow participants, you might like to ponder these questions. There isn't always a single correct answer and there are no prizes - they're just to give you something else to think about.

1. Is it possible to batch CloudEvents in a single JSON document?
  <details>
    <summary>Hint 🔦</summary>
   Check out the CloudEvents primer - [https://github.com/cloudevents/spec/blob/main/cloudevents/primer.md](https://github.com/cloudevents/spec/blob/main/cloudevents/primer.md)
   <i>Batching of multiple events into a single API call is natively supported by some protocols. To aid interoperability, it is left up to the protocols if and how batching is implemented. Details may be found in the protocol binding or in the protocol specification.</i>
   </details>
2. 
3. 

## Next

Continue to 👉 [Exercise 03 - ....](../03-/README.md)
