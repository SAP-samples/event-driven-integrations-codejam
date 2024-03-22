# Exercise XX - Publish and subscrbe to events

In a previous exercise, we learnt more about Event-Driven Architectures and we now familiar with the UI in SAP Integration Suite, advanced event mesh (AEM).

<p align = "center">
  <img alt="Screenshot sample" src="../assets/wk4-data-flow.png" width="100%"/><br/>
  <i>Week 4 - Data flow</i>
</p>

In this exercise we will build upon on what we learnt last week and we will extend our program to subscribe to a topic. By subscribing to a topic we will be able to receive message from AEM. Before we get to the challenge, we might need to expand a bit on some concepts. Let's get started.

## Topics

Last week we mention that a topic is a mean by which a publisher classifies a message. The topic tells us what type of message we will receive if we subscribe to a specific topic. In essence, it is a string that is composed of one or more levels. Each level is separated by a forward slash (/) and the levels can be anything. This is commonly known as topic level granularity. The granularity allows for more targeted and efficient information exchange. Instead of having a single topic for all updates on a business object in a complex system (/BusinessPartner), the system can have distinct topics for different types of updates on a business object (/BusinessPartner/Created, /BusinessPartner/Updated, /BusinessPartner/Deleted). There is no specific schema/specification on how you need to structure your topic string but you do find that patterns are established within a system. Lets get familiar with the structure of a topic by "dissecting" a real-world topic. Below we can see a topic on which an SAP S/4HANA Cloud system will publish a Business Partner message.

Example: `sap/S4HANAOD/E4L/ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Created/v1`:
-  *sap/S4HANAOD/E4L*: System information.
-  */ce*: CloudEvent. We know that all events published by an SAP S/4HANA Cloud system follow the CloudEvent specification
-  */sap/s4*: This is coming from an SAP S/4HANA system.
-  */beh/businesspartner/v1/BusinessPartner*: Information of the Business object that we will be receiving.
-  */Created*: This is the action that took place in the source system. In this case, it is notifying us that a BusinessPartner was created. Many actions can take place in a system, e.g. this could be `/Updated`, `/Deleted`. In other case if we were dealing with a business object like a PurchaseOrder, there could be an event raised when it is `/Cancelled` or `/Rejected`.
-  */v1*: Version of the message. If a new version of the message would be made available, e.g. adding new fields to the payload, then this will change.

> In our case, we've defined levels on our topic string based on the week, SAP Community ID and action, e.g. `dev-challenge/week-4/ajmaradiaga/notification`.

Now, by knowing the topic on which a mesage type will be published, we can create a consumer program/service that subscribes to the topic directly (aka topic endpoint) and process the messages sent to it. Generally you can subscribe to a topic by specifying the entire topic string when establishing the connection, e.g. *sap/S4HANAOD/E4L/ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Created/v1*. But what if we want to subscribe to all actions (Created, Updated, Deleted) that occur on a BusinessPartner object? Luckily, in the case of SAP Integration Suite, advanced event mesh we can subscribe to topic by using wildcards (\*). For example, by subscribing to the topic sap/S4HANAOD/E4L/ce/sap/s4/beh/businesspartner/v1/BusinessPartner/*/v1 I will be able to get all messages for different actions (Created, Updated, Deleted) whose version is v1. In AEM, the > character can be used at the last level of a subscription to indicate a "one or more" wildcard match for any topics, e.g. by subscribing to the topic *sap/S4HANAOD/E4L/ce/sap/s4/beh/>* will bring all objects that are published under that prefix, independent of type, action, and version.

> In the example above we can see how the topic level granularity can allow a consumer program/service to subscribe only to the information it needs. To learn more about wildcard characters in topic subscriptions 👉: [https://help.pubsub.em.services.cloud.sap/Messaging/Wildcard-Charaters-Topic-Subs.htm](https://help.pubsub.em.services.cloud.sap/Messaging/Wildcard-Charaters-Topic-Subs.htm)

If our consumer program/service subscribes to a topic, we create a topic endpoint, and we will receive all message for that topic subscription. That said, topic endpoints last only as long as the consumer is connected. The problem here is that our consumer needs to be online in order to receive a message. If the consumer becomes unavailable then we will end up losing message. In some scenarios, this is unacceptable and we need ensure that we receive and process all messages published. Fortunately, there is a mechanism to retain messages without the need of a consumer service to be online 100%. Then, the consumer can process the messages asynchronously or whenever it is available. Enter Queues.

## Queues

Queues allow us to subscribe to one or more topics and receive messages for all topics matching their subscriptions. The messages are received by the messaging system, saved in the queue and delivered to consuming clients if they are online and connected or held in the queue until the consumer becomes available. Queues can provide exclusive access to one consumer or access to multiple consumers where messages are distributed among the consumers. The message will be in the queue until a consumer acknowledges that a message has been processed. Only then the message will be removed from the queue.

<p align = "center">
  <img alt="Queue" src="../assets/wk4-guaranteed-queue.png" width="70%"/><br/>
  <i>Queue</i>
</p>

In the case of AEM, Queues can be durable or non-durable:

- Durable queues exist until they are removed by an administrative action. They accumulate messages whether clients are online or offline. When offline clients reconnect, they receive all of the messages that accumulated while they were offline.
- Temporary (or non-durable) queues follow the lifecycle of the client connection and are useful for ensuring message persistence while clients are online.

## Topic endpoint

As mentioned before, we can subscribe to a topic directly. A topic endpoint is created after establishing a connection to AEM (the `messaging service - messaging_service.connect()`) and subscribing to the topic (*dev-challenge/week-4/[sapcommunityid]/processed* - `direct_receive_service.with_subscriptions(topics).build()`). This is not a polling mechanism, but a running connection is required, through which AEM will send a message to your service. If your service is not online the message will be missed. See the code sample in the section below.

> To learn more about Topic endpoints and Queues 👉: [https://help.pubsub.em.services.cloud.sap/Get-Started/topic-endpoints-queues.htm](https://help.pubsub.em.services.cloud.sap/Get-Started/topic-endpoints-queues.htm)

## Publish an event
TBA

## Subscribe to an event
TBA

## Further Study

* [CloudEvents specification](https://github.com/CloudEvents/spec)
* [JSON Event Format](https://github.com/cloudevents/spec/blob/main/cloudevents/formats/json-format.md)

---

If you finish earlier than your fellow participants, you might like to ponder these questions. There isn't always a single correct answer and there are no prizes - they're just to give you something else to think about.

1. 
2. 

## Next

Continue to 👉 [Exercise 03 - ....](../03-/README.md)
