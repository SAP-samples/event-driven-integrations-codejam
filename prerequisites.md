# Prerequisites

There are hardware, software and service prerequisites for participating in this CodeJam. The exercises will be developed using SAP Integration Suite, advanced event mesh which will be made available for the CodeJam. 

## Accessing the supporting material referenced in exercises

In this CodeJam, you will see that across exercises, there are references to files that will help you get started or that are needed to complete the activities. To access these files, you can download the individual files directly from the repository website, or you can make a copy of the repository on your local machine by following one of the options below:

1. **(Recommended)** Clone the git repository in your local machine with the following command:

   ```bash
   git clone https://github.com/SAP-samples/event-driven-integrations-codejam.git
   ```

   > If you've set up [SSH to communicate with GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) from your local machine, you can clone it using the following command: `git clone git@github.com:SAP-samples/event-driven-integrations-codejam.git`

   Using `git` is recommended as there might be future updates on the CodeJam content; updating your local copy will just be a command away.

   ```bash
   git pull origin main
   ```

2. Alternatively, download the [repository as a zip](https://github.com/SAP-samples/event-driven-integrations-codejam/archive/refs/heads/main.zip), and unzip it.

## Hardware

None.

## Software

### Web browser

A web browser supported by the SAP Integration Suite[^1]: For the UIs of the service, the following browsers are supported on Microsoft Windows PCs and, where mentioned below, on macOS. Note that, however, certain limitations might apply for specific browsers:

```text
Cloud Integration has been tested using the following browsers:
- Google Chrome (latest version)
- Microsoft Edge (latest version)
- Mozilla Firefox (latest version)
- Windows Internet Explorer (as of version 10)

The application can also be used with Safari browser and Internet Explorer 9. However, some features might not work as expected.
```

## Services

### SAP Business Application Studio

When creating a new SAP BTP Trial account, by default an instance of SAP Business Application Studio is provisioned. If this is not the case, you can follow the instructions included in the [Set Up SAP Business Application Studio for Development](https://developers.sap.com/tutorials/appstudio-onboarding.html) tutorial. Also, you can refer to the instructions in the SAP Help documentation - [Working with a Trial account](https://help.sap.com/docs/bas/sap-business-application-studio/working-with-trial-account).

> For setting up SAP Business Application Studio in an enterprise account, refer to the [Set Up SAP Business Application Studio](https://help.sap.com/docs/bas/sap-business-application-studio/getting-started) topic of the SAP Business Application Studio Administrator Guide.

#### 1. Create a Dev space

Once you've set up SAP Business Application Studio, you can access it by navigating to the instance from your subaccount and clicking on the `Go to Application` button. Once in the SAP Business Application Studio, create a new Dev Space (`Full Stack Cloud application`) to work on the exercises.

<p align = "center">
  <img alt="Access SAP Business Application Studio and Dev Space creation" src="assets/access-bas-and-create-dev-space.gif" width="90%"/><br/>
  <i>Access SAP Business Application Studio and Dev Space creation</i>
</p>

> You are getting an access denied when trying to access the SAP Business Application Studio? Check the [troubleshooting section](./troubleshooting.md#access-denied-when-trying-to-access-the-sap-business-application-studio) for a possible solution.

#### 2. Open the Dev space and access the simplified Git view

Once the Dev Space is created, you can open it and access the simplified Git view to clone the repository that you will use to work on the exercises. You can access the simplified Git view by clicking on the icon in the left-hand side menu.

<p align = "center">
  <img alt="Open dev space" src="assets/open-bas-simplified-git.gif" width="90%"/><br/>
  <i>Open dev space</i>
</p>

#### 3. Clone repository and open project

In the simplified Git view, clone the repository by clicking the ***Clone Repository*** button. Enter the following URL `https://github.com/SAP-samples/event-driven-integrations-codejam.git` in the dialog box that will appear on the top of the screen and clone it in the `/home/user/projects` folder. Once cloned, open the project by clicking the ***Open*** button in the dialog box that appears lower-right corner of the Dev Space.

<p align = "center">
  <img alt="Clone repo and open project" src="assets/clone-and-open-project.gif" width="90%"/><br/>
  <i>Clone repo and open project</i>
</p>

#### 4. Validate the setup

To validate that the repository has been cloned successfully, you can open the terminal in the SAP Business Application Studio (click on the `Hamburger menu` 🍔 > `View` > `Terminal`).

<p align = "center">
  <img alt="Open terminal in SAP Business Application Studio" src="assets/open-terminal.gif" width="90%"/><br/>
  <i>Open terminal in SAP Business Application Studio</i>
</p>

Now run the following commands. You should be able to install the dependencies and execute the app.js file. No output is expected in the terminal as we haven't added the required code in that exercise :-).

```bash
# Navigate to the exercise 08 folder
cd exercises/08-cloudevents-sdk/code

# Install the dependencies
npm install

# Execute the app.js file
node app.js
```

<p align = "center">
  <img alt="Validate project" src="assets/validate-project.gif" width="90%"/><br/>
  <i>Validate project</i>
</p>

#### (Alternative) Visual Studio Code

[Visual Studio Code](https://code.visualstudio.com/), can be used to run the Cloud Application Programming project (Node.js) that we will develop and we will use to consume events from SAP Integration Suite, advanced event mesh. Follow the installation instructions included on the [website](https://code.visualstudio.com/Download).

Once installed, you will need to open the repository [cloned/downloaded previously](#accessing-the-supporting-material-referenced-in-exercises) in Visual Studio Code. There is a .devcontainer configuration included in the repository that will allow you to open the project in a container with all the necessary dependencies.

### SAP Integration Suite

We will be using the Cloud Integration component of SAP Integration Suite in one of the exercises, to connect to SAP Integration Suite, advanced event mesh. To get started with SAP Integration Suite, you will need to have access to an SAP Business Technology Platform account and subscribe to the SAP Integration Suite service.

<details>
⇟ <summary>Using the SAP BTP Trial account (⚡️ recommended ⚡️). If possible, create the trial account or a new subaccount in the Singapore 🇸🇬 region.</summary>

<br />

<ul>
<li> Get an SAP Business Technology Platform trial account:
  <ul>
  <li> [Tutorial: Get an account on SAP BTP Trial](https://developers.sap.com/tutorials/hcp-create-trial-account.html)</li>
  <li> [Tutorial: Set up the SAP Integration Suite trial](https://developers.sap.com/tutorials/cp-starter-isuite-onboard-subscribe.html#f55ec71c-2853-4b83-8092-4e3031f8d6e6)</li>
  </ul>
</li>
</ul>

</details>

<details>
⇟ <summary>Using the SAP BTP Free Tier</summary>

<br />

* Get a free SAP Business Technology Platform account (if you don't already have one):
  * [Tutorial: Get an Account on SAP BTP to Try Out Free Tier Service Plans](https://developers.sap.com/tutorials/btp-free-tier-account.html)
  * [Video: SAP BTP Free Tier: Create Your Individual Account](https://www.youtube.com/watch?v=0zGuMus4R10)
* Subscribe to the SAP Integration Suite service by following the instructions included in [step 2](https://developers.sap.com/tutorials/cp-starter-isuite-onboard-subscribe.html#754869b5-274f-4a7d-b195-f4082f790b0d) of the _Set up the SAP Integration Suite trial_ tutorial. 

</details>

### Activating SAP Integration Suite capabilities

Once subscribed to the SAP Integration Suite service, we will need to provision the following capabilities:

* Cloud Integration

To provision the SAP Integration Suite capabilities, follow the instructions included in [step 3](https://developers.sap.com/tutorials/cp-starter-isuite-onboard-subscribe.html#d87e7e9f-7862-410d-ae85-ede409587a60) of the  _Set up the SAP Integration Suite trial_ tutorial.

[^1]: [Feature Scope Description for SAP Integration Suite](https://help.sap.com/doc/e50e61e7b66c4b60ae5e88c00c01486a/sap.cp.integration.suite/en-US/FSD_IntegrationSuite.pdf)
