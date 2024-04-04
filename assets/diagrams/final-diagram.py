# diagram.py
from diagrams import Cluster, Diagram, Edge
from diagrams.sap.erp import SAPS4HANACloud
from diagrams.sap.integration import AdvancedEventMesh
from diagrams.sap.runtimes import CloudFoundryRuntime
from diagrams.sap.integration import IntegrationSuite
from diagrams.sap.generic import PersonPlaceholder, ItSystem, Request

# SAP BTP Solution Diagrams and Icons guidelines colours
L0_BLUE_COLOUR = "#0070F2"
L0_FILLED_COLOUR = "#EBF8FF"
L1_BLUE_COLOUR = "#0040B0"
L1_FILLED_COLOUR = "#EBF8FF"
L1_BLUE_COLOUR = "#002A86"
SUCCESS_GREEN_COLOUR = "#188918"
SUCCESS_FILLED_COLOUR = "#F5FAE5"

FIX_GREY_COLOUR = "#7F7F7F"
NON_SAP_AREA_COLOUR = "#595959"

PRODUCER_COLOUR = "#07838F"
CONSUMER_COLOUR = "#5D36FF"

with Diagram(filename="codejam_eventing", show=False, graph_attr={"pad": "0.2"}, edge_attr={"fontsize": "15"}):

    s4_hana_cloud = SAPS4HANACloud(width="3")

    person = PersonPlaceholder("Music fan")

    webhook_site = ItSystem(
        "webhook.site")

    third_party = Request("3rd party\nDocument Signature\nSaaS")

    with Cluster("SAP Business Technology Platform", graph_attr={"bgcolor": L0_FILLED_COLOUR, "pencolor": L0_BLUE_COLOUR, "margin": "20,20"}):
        with Cluster("Subaccount", graph_attr={"bgcolor": "white", "pencolor": L1_BLUE_COLOUR}):
            ticket_website = CloudFoundryRuntime("Ticket website")

            event_mesh = AdvancedEventMesh("Advanced Event Mesh")
            cloud_integration = IntegrationSuite("Cloud Integration")

            # vip_srvc = CloudFoundryRuntime("VIP Processing srvc")
            mail_delivery_srvc = CloudFoundryRuntime(
                "Mail Delivery srvc\n(CAP Project)")

            person >> Edge(color=FIX_GREY_COLOUR,
                           label="Purchases ticket(s)") >> ticket_website

            s4_hana_cloud >> Edge(color=PRODUCER_COLOUR, penwidth="2.0", headlabel="Performers managed as BusinessPartners in ERP\n📣    sap.s4.beh.businesspartner.v1.BusinessPartner.Created.v1",
                                  labelfloat="true", labeldistance="33", labelangle="5.0") >> event_mesh

            ticket_website >> Edge(
                color=PRODUCER_COLOUR, penwidth="2.0", headlabel="New ticket(s) purchased\n📣    itelo.tms.ticket.v1.Ticket.Purchased.v1", minlen="2" ,labeldistance="17", labelangle="-8") >> event_mesh

            event_mesh >> Edge(color=CONSUMER_COLOUR, penwidth="2.0", style="dashed",
                               headlabel="Performer contract signature\nConsumes: sap.s4.beh.businesspartner.v1.BusinessPartner.Created.v1", labeldistance="25", labelangle="-5", minlen="9") >> cloud_integration

            event_mesh >> Edge(color=CONSUMER_COLOUR, penwidth="2.0", reverse=True,
                               headlabel="Enrich message from SAP S/4HANA Cloud\nConsumes: itelo.tms.ticket.v1.Ticket.Purchased.v1", labeldistance="25", labelangle="-5", minlen="9") >> cloud_integration

            cloud_integration >> Edge(
                color=FIX_GREY_COLOUR, minlen="3", style="dashed") >> third_party

            # event_mesh >> Edge(color=CONSUMER_COLOUR, penwidth="2.0", reverse=True,
            #                   headlabel="VIP Package delivery\nConsumes: itelo.tms.ticket.v1.Ticket.Purchased.v1", labeldistance="25", labelangle="-5", minlen="9") >> vip_srvc

            event_mesh >> Edge(color=CONSUMER_COLOUR, penwidth="2.0", reverse=True,
                               headlabel="Physical delivery of ticket\nConsumes: itelo.tms.ticket.v1.Ticket.Purchased.v1", labeldistance="25", labelangle="-5", minlen="9") >> mail_delivery_srvc

            event_mesh >> Edge(
                color=CONSUMER_COLOUR, penwidth="2.0", headlabel="Webhook - Performer requirement checks\nConsumes: sap.s4.beh.businesspartner.v1.BusinessPartner.Created.v1", labeldistance="25", labelangle="-5", minlen="9") >> webhook_site
