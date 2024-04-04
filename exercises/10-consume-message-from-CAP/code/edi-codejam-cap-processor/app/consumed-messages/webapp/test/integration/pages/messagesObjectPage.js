sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'com.sap.codejam.edi.consumedmessages',
            componentId: 'messagesObjectPage',
            contextPath: '/messages'
        },
        CustomPageDefinitions
    );
});