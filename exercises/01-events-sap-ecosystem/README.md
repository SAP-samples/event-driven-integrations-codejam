# Exercise 01 - Events in the SAP Ecosystem

Before we start exchanging events between our systems, let's get familiar with the events that SAP applications can produce. In the SAP Business Accelerator Hub, you can discover, explore, and test the different types of content available for SAP products, as well as third-party products. The content available here can be used to accelerate the development of integrations and extensions required at your company. 

At the end of this exercise, you'll have an understanding of the SAP Business Accelerator Hub, the different SAP products that can generate events and the different types of events that you will be able to find in it.

## Tour the events section in the SAP Business Accelerator Hub

Let's start by exploring the Events section part of the SAP Business Accelerator Hub.

👉 Navigate to the SAP Business Accelerator Hub (https://hub.sap.com) and select the [Events category](https://hub.sap.com/content-type/Events/events/events) to list all the events produced by different SAP applications.

<p align = "center">
    <img alt="Events category in the SAP Business Accelerator Hub" src="../../assets/to-be-added.png" width="50%"/><br/>
    <i>Events category in the SAP Business Accelerator Hub</i>
</p>

This will list more than 350 events available. Let's group these events by SAP application and get familiar with the events produced by a particular SAP application.

👉 Click on the `Packages` tab, select the [SAP Marketing Cloud Business Events](https://hub.sap.com/package/SAPMarketingCloudBusinessEvents/event)

<p align = "center">
    <img alt="Navigate to SAP Marketing Cloud Business Events" src="../../assets/to-be-added.png" width="50%"/><br/>
    <i>Navigate to SAP Marketing Cloud Business Events</i>
</p>

## Type of events

In the two examples above we can see that they differ in the amount of information included in the payload. Let's explore this further.

### Notification events

TBA

### Event-Carried State Transfer (ECTS) events

TBA

## Explore the Business Partner events available in SAP S/4HANA Cloud 

As part of this CodeJam, we will interact with the Business Partner data from an SAP S/4HANA Cloud system. The Business Partner events

👉 Now that you are familiar with how to get around the SAP Business Accelerator Hub, search for the [Business Partner events](https://api.sap.com/products/SAPS4HANACloud/apis/all) available for SAP S/4HANA Cloud, check out the different operations and get acquainted with the payload for the create event.


🧭 Take some time to explore what's documented on the [Business Partner events - Overview page](https://api.sap.com/api/API_BUSINESS_PARTNER/overview). You will be able to find lots of valuable information here, e.g. attributes, authentication methods, API specifications, and configuration details.


## Summary

Now that you are familiar with some of the events available in the SAP Business Accelerator Hub, we are ready to start exploring the format used to describe the events.

## Further Study

* [Explore the SAP Business Accelerator Hub Community](https://hub.sap.com/community)

---

If you finish earlier than your fellow participants, you might like to ponder these questions. There isn't always a single correct answer and there are no prizes - they're just to give you something else to think about.

1. Can you think of reasons why would you prefer publishing notification events instead of data events?

## Next

Continue to 👉 [Exercise 02 - Cloud Events](../02-cloud-events/README.md)
