# diagram.py
from diagrams import Cluster, Diagram, Edge
from diagrams.sap.erp import SAPS4HANACloud
from diagrams.sap.integration import AdvancedEventMesh_Circled
from diagrams.sap.runtimes import CloudFoundryRuntime_Circled
from diagrams.sap.processautomation import SAPBuildProcessAutomation_Circled
from diagrams.sap.integration import IntegrationSuite_Circled
from diagrams.sap.generic import Iphone, Laptop, PersonPlaceholder
from diagrams.sap.other import PlaceholderNewServices

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

with Diagram(filename="final-diagram", show=False, graph_attr={"pad": "0.2"}, edge_attr={"fontsize": "15"}):

    s4_hana_cloud = SAPS4HANACloud(width="3")

    person = PersonPlaceholder("Music fan")

    third_party = PlaceholderNewServices("3rd party\nDocument Signature\nSaaS")

    with Cluster("SAP Business Technology Platform", graph_attr={"bgcolor": L0_FILLED_COLOUR, "pencolor": L0_BLUE_COLOUR, "margin": "20,20"}):
        with Cluster("Subaccount", graph_attr={"bgcolor": "white", "pencolor": L1_BLUE_COLOUR}):
            ticket_website = CloudFoundryRuntime_Circled("Ticket website")

            event_mesh = AdvancedEventMesh_Circled("Advanced Event Mesh")
            cloud_integration = IntegrationSuite_Circled("Cloud Integration")
            
            vip_srvc = CloudFoundryRuntime_Circled("VIP Processing srvc")
            mail_delivery_srvc = CloudFoundryRuntime_Circled(
                "Mail Delivery srvc")

            sbpa = SAPBuildProcessAutomation_Circled(
                "SAP Build\nProcess Automation")

            person >> Edge(color=FIX_GREY_COLOUR,
                           label="Purchases ticket(s)") >> ticket_website
            
            s4_hana_cloud >> Edge(color=PRODUCER_COLOUR, penwidth="2.0", headlabel="Performers managed as BusinessPartners in ERP\n📣    sap.s4.beh.businesspartner.v1.BusinessPartner.Created.v1"
                                 , labelfloat="true", labeldistance="30", labelangle="5.0") >> event_mesh
            

            ticket_website >> Edge(
                color=PRODUCER_COLOUR, penwidth="2.0", headlabel="New ticket(s) purchased\n📣    itelo.tms.ticket.v1.Ticket.Bought.v1", minlen="2",labeldistance="17", labelangle="-8") >> event_mesh

            
            event_mesh >> Edge(color=CONSUMER_COLOUR, penwidth="2.0", reverse=True,
                               headlabel="Performer contract signature\nConsumes: sap.s4.beh.businesspartner.v1.BusinessPartner.Created.v1", labeldistance="25", labelangle="-5", minlen="9") >> cloud_integration
            
            event_mesh >> Edge(color=CONSUMER_COLOUR, penwidth="2.0", reverse=True,  style="dashed",
                               headlabel="Create Sales Order in SAP S/4HANA Cloud\nConsumes: itelo.tms.ticket.v1.Ticket.Bought.v1", labeldistance="25", labelangle="-5", minlen="9") >> cloud_integration

            cloud_integration >> Edge(
                color=FIX_GREY_COLOUR, minlen="3") >> third_party
            
            
            event_mesh >> Edge(color=CONSUMER_COLOUR, penwidth="2.0", reverse=True,
                               headlabel="VIP Package delivery\nConsumes: itelo.tms.ticket.v1.Ticket.Bought.v1", labeldistance="25", labelangle="-5", minlen="9") >> vip_srvc
            event_mesh >> Edge(color=CONSUMER_COLOUR, penwidth="2.0", reverse=True,
                               headlabel="Physical delivery of ticket\nConsumes: itelo.tms.ticket.v1.Ticket.Bought.v1", labeldistance="25", labelangle="-5", minlen="9") >> mail_delivery_srvc
            
            event_mesh >> Edge(
                color=CONSUMER_COLOUR, penwidth="2.0", headlabel="Webhook - Performer requirement checks\nConsumes: sap.s4.beh.businesspartner.v1.BusinessPartner.Created.v1", labeldistance="25", labelangle="-5", minlen="9") >> sbpa

