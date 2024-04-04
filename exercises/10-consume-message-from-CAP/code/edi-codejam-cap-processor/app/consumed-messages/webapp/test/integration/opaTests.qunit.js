sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'consumedmessages/test/integration/FirstJourney',
		'consumedmessages/test/integration/pages/messagesList',
		'consumedmessages/test/integration/pages/messagesObjectPage'
    ],
    function(JourneyRunner, opaJourney, messagesList, messagesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('consumedmessages') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThemessagesList: messagesList,
					onThemessagesObjectPage: messagesObjectPage
                }
            },
            opaJourney.run
        );
    }
);