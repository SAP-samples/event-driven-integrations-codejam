sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'com.sap.codejam.edi.consumedmessages',
            componentId: 'messagesList',
            contextPath: '/messages'
        },
        CustomPageDefinitions
    );
});