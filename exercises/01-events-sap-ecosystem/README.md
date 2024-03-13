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

👉 Now that you are familiar with how to get around the SAP Business Accelerator Hub, search for the [Business Partner events](https://api.sap.com/products/SAPS4HANACloud/apis/all) available for SAP S/4HANA Cloud Public Edition, check out the different operations and get acquainted with the payload for the Business Partner changed event - [https://hub.sap.com/event/CE_BUSINESSPARTNEREVENTS/resource](https://hub.sap.com/event/CE_BUSINESSPARTNEREVENTS/resource).

```json
{
    "type": "sap.s4.beh.businesspartner.v1.BusinessPartner.Changed.v1",
    "specversion": "1.0",
    "source": "/default/sap.s4.beh/244572008",
    "id": "194780e0-b5db-1ede-b58a-4550178dff9e",
    "time": "2024-02-26T02:53:06Z",
    "datacontenttype": "application/json",
    "data": {
        "BusinessPartner": "1000667"
    }
}
```

🧭 Take some time to explore what's documented on the [Business Partner events - Overview page](https://hub.sap.com/event/CE_BUSINESSPARTNEREVENTS/overview). You will be able to find lots of valuable information here, e.g. [event reference](https://hub.sap.com/event/CE_BUSINESSPARTNEREVENTS/resource), event specifications (in JSON and YAML format), and a link to the [documentation](https://help.sap.com/docs/SAP_S4HANA_CLOUD/3c916ef10fc240c9afc594b346ffaf77/a75345282ddd4054a1e5ce7687e4b088.html?locale=en-US&state=PRODUCTION&version=2402.500).


## Summary

Now that you are familiar with some of the events available in the SAP Business Accelerator Hub, we are ready to start exploring the format used to describe the events.

## Further Study

* [Explore the SAP Business Accelerator Hub Community](https://hub.sap.com/community)

---

If you finish earlier than your fellow participants, you might like to ponder these questions. There isn't always a single correct answer and there are no prizes - they're just to give you something else to think about.

1. Can you think of reasons why would you prefer publishing notification events instead of data events?
2. Which format is used to document the Business Partner event specification?
   <details>
    <summary>Hint 🔦</summary>
    <i>Go to the Business Accelerator Hub and open the Business Partner event specification, in JSON or YAML format.</i>
    </details>
3. 

## Next

Continue to 👉 [Exercise 02 - Cloud Events](../02-cloud-events/README.md)
