using CloudEventService as service from '../../srv/service';

annotate service.qrcodes with {
  ticketId  @title: 'Ticket';
  messageId @title: 'Message ID';
  dataURL @title: 'QRCode';
  createdAt  @title: 'Processed at';
}

annotate service.qrcodes with @(UI: {
    HeaderInfo                     : {
        TypeName      : 'Ticket QRCode',
        TypeNamePlural: 'Tickets QRCode',
        Title          : { Value: ticketId },
        Description   : {Value: messageId}
    },
    SelectionFields                : [ticketId],
    FilterFacets                   : [{
        $Type : 'UI.ReferenceFacet',
        Target: '@UI.FieldGroup#FilterGroup'
    }],
    PresentationVariant            : {
        Visualizations: ['@UI.LineItem'],
        SortOrder     : [{
            Property  : createdAt,
            Descending: true
        }]
    },
    LineItem : [
        {
            $Type: 'UI.DataField',
            Value: createdAt,
        },
        {
            $Type : 'UI.DataField',
            Value : messageId,
        },
        {
            $Type : 'UI.DataField',
            Value : ticketId,
        },
        {
            $Type : 'UI.DataField',
            Value : dataURL,
        },
    ],
    FieldGroup #FilterGroup        : {
        $Type: 'UI.FieldGroupType',
        Data : [{
            $Type: 'UI.DataField',
            Label: 'Ticket',
            Value: ticketId,
        }],
    },
});
annotate service.qrcodes with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Message ID',
                Value : messageId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Ticket',
                Value : ticketId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'QRCode',
                Value : dataURL,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
