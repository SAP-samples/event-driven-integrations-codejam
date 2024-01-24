# Exercise 02 - CloudEvents specification

The payload of an event can be anything.... It can be plain text, XML, JSON, or even binary format. Fortunately, there is a specification we can use to describe the event data. In this exercise, we will focus on what the [CloudEvents specification](https://github.com/CloudEvents/spec) is, the . Finally, we will touch on how this specification has been adopted by different SAP products to describe the events produced by the systems. 

<p align = "center">
    <img alt="CloudEvents logo" src="assets/CloudEvents-logo.png" width="50%"/><br/>
    <i>CloudEvents</i>
</p>

## What is CloudEvents?

Given the complexity of today's landscapes and how we now deal with many systems. These systems need to communicate with each other, ideally as close to real-time as possible, and to enable this, a system can produce events to notify others of changes within the objects of the system. There is a need to have a common way of describing the data produced by these systems. The cloudevents specification can help us provide a consistent way for how our systems can communicate others about these events.

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

You'll notice that the example above is composed of many attributes. These attributes describe the event and are independent of the event data. Meaning that we can somehow process/inspect the event without having the need to process its data. Now, let's dive a bit into the message itself.

> For more information on the history, development and design rationale behind the specification, see the [CloudEvents Primer](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/primer.md) document.

## CloudEvents message format

A CloudEvent message is mainly composed of context attributes and data. As we briefly touched on exercise 01, the payload in the data field will depend if it is a notification event or an ECTS event.

### Context Attributes

## CloudEvents SDK

In a future exercise, we will use the XYZ SDK in SAP Business Application Studio to create a message that follows the CloudEvent specification and send it to SAP Integration Suite, Advanced Event Mesh.

## CloudEvents at SAP

SAP is one of the many [adopters](https://CloudEvents.io/) of the CloudEvents specification and we've noticed this in the events that we explored in [exercise 01](../01-events-sap-ecosystem/README.md). Let's dissect the ***PRODUCT NAME*** payload and see how it aligns with the CloudEvents specification.

Now that you are familiar with the CloudEvents specification, we are ready to start exploring the events capabilities of SAP Integration Suite, Advanced Event Mesh and start sending some events.

## Further Study

* [CloudEvents website](https://CloudEvents.io/)
* [CloudEvents specification](https://github.com/CloudEvents/spec)
* [Privacy and Security of an event message](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#privacy-and-security)

---

If you finish earlier than your fellow participants, you might like to ponder these questions. There isn't always a single correct answer and there are no prizes - they're just to give you something else to think about.

1. Think of an event that is raised by one of the systems in your company. Can you think of you can model that event if you follow the CloudEvents specification?
2. What are some things that you should take into consideration when thinking of the data that you should include in message?
   <details>
    <summary>Hint 🔦</summary>
    <i>Privacy and Security recommendation included in the <a href="https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#privacy-and-security">CloudEvents specification</a>. </i>
    </details>
3. 

## Next

Continue to 👉 [Exercise 03 - ....](../03-/README.md)
