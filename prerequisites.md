# Prerequisites

There are hardware, software and service prerequisites for participating in this CodeJam. The exercises will be developed using SAP Integration Suite, Advanced Event Mesh which will be made available for the CodeJam. 

## Accessing the supporting material referenced in exercises

In this CodeJam, you will see that across exercises, there are references to files that will help you get started or that are needed to complete the activities. To access these files, you can download the individual files directly from the repository website, or you can make a copy of the repository on your local machine by following one of the options below:
1. **(Recommended)** Clone the git repository in your local machine with the following command:
   ```bash
   $ git clone https://github.com/SAP-samples/event-driven-integrations-codejam.git
   ```
   > If you've set up [SSH to communicate with GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) from your local machine, you can clone it using the following command: `git clone git@github.com:SAP-samples/event-driven-integrations-codejam.git`

   Using `git` is recommended as there might be future updates on the CodeJam content; updating your local copy will just be a command away.

   ```bash
   $ git pull origin main
   ```
2. Alternatively, download the [repository as a zip](https://github.com/SAP-samples/event-driven-integrations-codejam/archive/refs/heads/main.zip), and unzip it.

## Hardware

None.

## Software

### Web browser

A web browser supported by the SAP Integration Suite[^1]: For the UIs of the service, the following browsers are supported on Microsoft Windows PCs and, where mentioned below, on macOS. Note that, however, certain limitations might apply for specific browsers:

```
Cloud Integration has been tested using the following browsers:
- Google Chrome (latest version)
- Microsoft Edge (latest version)
- Mozilla Firefox (latest version)
- Windows Internet Explorer (as of version 10)

The application can also be used with Safari browser and Internet Explorer 9. However, some features might not work as expected.
```

<!-- ### Bruno

[Bruno](https://www.usebruno.com/downloads), used to get familiar with Cloud Events and the SAP Integration Suite, Advanced Event Mesh API. Follow the installation instructions included on the [website](https://www.usebruno.com/downloads).
  > Once installed you can import the collection and environments included in the `./assets/bruno` folder. -->

## Services

### SAP Business Application Studio

TODO: Add instructions to instantiate SAP Business Application Studio

#### (Alternative) Visual Studio Code

[Visual Studio Code](https://code.visualstudio.com/), can be used to run the Cloud Application Programming project (Node.js) that we will develop and we will use to consume events from SAP Integration Suite, advanced event mesh. Follow the installation instructions included on the [website](https://code.visualstudio.com/Download).

Once installed, you will need to open the repository [cloned/downloaded previously](#accessing-the-supporting-material-referenced-in-exercises) in Visual Studio Code. There is a .devcontainer configuration included in the repository that will allow you to open the project in a container with all the necessary dependencies.

### SAP Integration Suite

<details>
<summary>Using the SAP BTP Free Tier (⚡️ recommended ⚡️)</summary>

<br>

* Get a free SAP Business Technology Platform account (if you don't already have one):
  * [Tutorial: Get an Account on SAP BTP to Try Out Free Tier Service Plans](https://developers.sap.com/tutorials/btp-free-tier-account.html)
  * [Video: SAP BTP Free Tier: Create Your Individual Account](https://www.youtube.com/watch?v=0zGuMus4R10)
* Subscribe to the SAP Integration Suite service by following the instructions included in [step 2](https://developers.sap.com/tutorials/cp-starter-isuite-onboard-subscribe.html#754869b5-274f-4a7d-b195-f4082f790b0d) of the _Set up the SAP Integration Suite trial_ tutorial. 

</details>

<details>
<summary>Using the SAP BTP Trial account</summary>

<br>

* Get an SAP Business Technology Platform trial account:
  * [Tutorial: Get an account on SAP BTP Trial](https://developers.sap.com/tutorials/hcp-create-trial-account.html)
  * [Tutorial: Set up the SAP Integration Suite trial](https://developers.sap.com/tutorials/cp-starter-isuite-onboard-subscribe.html#f55ec71c-2853-4b83-8092-4e3031f8d6e6)

</details>

### Activating SAP Integration Suite capabilities

Once subscribed to the SAP Integration Suite service, we will need to provision the following capabilities:
- Cloud Integration

To provision the SAP Integration Suite capabilities, follow the instructions included in [step 3](https://developers.sap.com/tutorials/cp-starter-isuite-onboard-subscribe.html#d87e7e9f-7862-410d-ae85-ede409587a60) of the  _Set up the SAP Integration Suite trial_ tutorial.


[^1]: [Feature Scope Description for SAP Integration
Suite](https://help.sap.com/doc/e50e61e7b66c4b60ae5e88c00c01486a/sap.cp.integration.suite/en-US/FSD_IntegrationSuite.pdf)
