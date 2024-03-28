# Exercise 04 - Event-Driven Architectures

Long gone are the days when a system (aka ***target system***) will constantly poll to check if there are any changes in another system, e.g. a new customer created in a master data system. Traditionally, the ***target system*** will only know this by programming a routine that will poll a file share and check for any files produced by this system or a web service exposed in the ***source system***, every X minutes/hours/days. The expectation nowadays is that systems are integrated and that the data exchanged between these systems will be immediately available in the ***target system(s)*** if any data is created/changed in the ***source system***. Enter **Event-Driven architectures**.

An Event-Driven Architecture is a software architecture paradigm concerning the production and consumption of events. An event can be defined as a significant change in the state of an object within a system[^1]. For example, when a customer/supplier/employee (***business object***) is created/updated/deleted ( ***action***) in a system. Translating this to the SAP world, when a Business Partner is created/changed in SAP S/4HANA (***source system***), SAP S/4HANA can notify that there was a change in a business object and ***target system(s)*** interested in the Business Partner object can then react and trigger follow-up activities in their systems.

### How do source and target systems communicate?

Now, if the source system lets other systems know of any changes happening in its business objects, it will not be sustainable to create a new programming routine within the source system every time we want to notify a new target system of any changes. Traditionally we would have some form of middleware, e.g. SAP Cloud Integration, and configure our source system, an SAP S/4HANA system, to send notifications of these events to the middleware and then use the middleware to distribute these messages, e.g. we would add target system(s) as needed. Now, we are moving the problem from the source system to a sort of middleware but ideally, there will be a way for the source system to notify others without the need to make any changes. Enter the **event broker**.

*An event broker is message-oriented middleware that enables the transmission of events between different components of a system, acting as a mediator between publishers and subscribers. It is the cornerstone of event-driven architecture, and all event-driven applications use some form of event broker to send and receive information*[^2].

By introducing an event broker in our landscapes, we can configure our source systems to **publish** their events to this message-oriented middleware. The source system will specify the class of the message (aka **topic**). Then, systems interested in the changes happening, e.g. in a particular business object in the source system, can **subscribe** to the event(s), via the event broker, by specifying the topic they are interested (`topic-based filtering`) in or it can also be based on the content of the message (`content-based filtering`). There are two keywords important here, publish and subscribe (PubSub), this is a well-known messaging pattern used to decouple systems/applications and allow asynchronous communication between them.

### What is the PubSub messaging pattern?

*Publish-subscribe is a communication pattern that is defined by the decoupling of applications, where applications publish messages to an intermediary broker rather than communicating directly with consumers (as in point-to-point)*[^3]. In a way, publishers and consumers do not need to know each other; they simply publish (produce) or consume (receive) the events. When following this messaging pattern we move from the traditional polling mechanism to know if there have been any changes in the source system to reacting to real-time events (notifications) the moment something happens in the source system.

<p align = "center">
  <img alt="PubSub messaging pattern" src="assets/CloudEvents-PubSub.drawio.png" width="100%"/><br/>
  <i>PubSub messaging pattern</i>
</p>

A subscriber (consumer), is generally only interested in a subset of the messages published. Normally, a message-oriented middleware will provide subscribers with a mechanism to set filters on the data that they want to receive. There are two common ways of filtering: topic-based and content-based[^6].

#### Topic-based filtering

We mentioned before how target systems can subscribe to events by specifying a topic they are interested in.... some event brokers will allow subscribers to subscribe to topics by using wildcards (*) and they will be able to receive only the events they are interested in, which can be for different topics. For example, let's assume we have an SAP S/4HANA with the name `S4D` and it publishes the Business Partner create and change on the following topics: `sap/S4HANAOD/S4D/ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Created/v1` and `sap/S4HANAOD/S4D/ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Changed/v1`. A subscriber system could subscribe to both topics using a wildcard, e.g. `sap/S4HANAOD/S4D/ce/sap/s4/beh/businesspartner/v1/BusinessPartner/*/v1` and receive the messages for both event types. In this case, we are filtering the message by topics.

#### Content-based filtering

In some other cases, the event broker will allow the subscriber to specify which messages they want to receive, based on the attributes or content of the message. For example, the message sent to the event broker can contain attributes that describe the message and we can do some filtering based on the values of those attributes. *Note: An example is shared later, on how attributes in a message (CloudEvent) can be used to define filters.*

> SAP offers different services that can act as event brokers. These were discussed in the previous exercise.

With many systems in our landscapes and each one being developed by different vendors/teams, it would be good if there was a standard way of structuring these events to simplify how systems create/handle/process these messages right? This is why we discussed [CloudEvents](https://CloudEvents.io/) previously.

## Summary

In this exercise, we learned about Event-Driven Architectures and how it can help us to move from the traditional polling mechanism to reacting to real-time events (notifications) the moment something happens in the source system. We also learned about the PubSub messaging pattern and how it can help us to decouple systems/applications and allow asynchronous communication between them. Finally, we learned about two common ways of filtering messages, topic-based and content-based filtering. In a future exercise, we will dive deeper into some of these concepts, e.g. topics, queues, topic structures, topic endpoints, and how to publish and subscribe to events.

## Further Study

* Event-Driven architecture: [link](https://en.wikipedia.org/wiki/Event-driven_architecture)
* What is an event broker?: [link](https://solace.com/what-is-an-event-broker/).
* What is the publish-subscribe messaging pattern?: [link](https://solace.com/blog/publish-subscribe-messaging-pattern/)
* SAP Event-Driven integrations: [link](https://help.sap.com/docs/event-broker/event-broker-service-guide/event-driven-integrations?locale=en-US%3Fversion%3DCloud).

---

If you finish earlier than your fellow participants, you might like to ponder these questions. There isn't always a single correct answer and there are no prizes - they're just to give you something else to think about.

1. Some event brokers only support topic-based filtering, while others support only content-based filtering. Can you think of the advantages and disadvantages of each?
2. 

## Next

Continue to 👉 [Exercise 05 - Explore SAP Integration Suite, advanced event mesh](../05-explore-aem/README.md)
