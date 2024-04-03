sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ticketqrcodes/test/integration/FirstJourney',
		'ticketqrcodes/test/integration/pages/qrcodesList',
		'ticketqrcodes/test/integration/pages/qrcodesObjectPage'
    ],
    function(JourneyRunner, opaJourney, qrcodesList, qrcodesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ticketqrcodes') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheqrcodesList: qrcodesList,
					onTheqrcodesObjectPage: qrcodesObjectPage
                }
            },
            opaJourney.run
        );
    }
);