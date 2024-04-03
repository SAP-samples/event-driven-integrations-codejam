using CloudEventService as service from '../../srv/service';

annotate service.messages with {
  ID     @title: 'ID';
  topic  @title: 'Topic';
  messageId @title: 'Message ID';
  source  @title: 'Source';
  specversion  @title: 'Spec Version';
  type  @title: 'Type';
  payload  @title: 'Payload';
  isValid  @title: 'Is Valid';
  validationMessage  @title: 'Validation';
  validationCriticality  @title: 'Criticality';
  createdAt  @title: 'Received At';
}

annotate service.messages with @(UI: {
    HeaderInfo                     : {
        TypeName      : 'CloudEvent',
        TypeNamePlural: 'CloudEvents',
        Title          : { Value: type },
        Description   : {Value: messageId}
    },
    SelectionFields                : [isValid],
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
    LineItem                       : [
        {
            $Type : 'UI.DataField',
            Label : 'Received At',
            Value : createdAt,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Topic',
            Value : topic,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Payload',
            Value : payload,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Is Valid',
            Value : isValid,
            Criticality : validationCriticality,
            CriticalityRepresentation : #WithIcon,
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Validation',
            Value : validationMessage,
        },
    ],
    FieldGroup #FilterGroup        : {
        $Type: 'UI.FieldGroupType',
        Data : [],
    },
    FieldGroup #GeneralInfoGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'Created At',
                Value: createdAt,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Topic',
                Value: topic,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Is Valid',
                Value: isValid,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Validation',
                Value: validationMessage,
            }
        ],
    },
    FieldGroup #CloudEventGroup    : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'Message ID',
                Value: messageId,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Source',
                Value: source,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Spec Version',
                Value: specversion,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Type',
                Value: type,
            }
        ],
    },
    FieldGroup #AdditionalInfoGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'Payload',
                Value: payload,
            },
        ],
    },
    Facets                         : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'GeneralInfoFacet',
            Label : 'General Information',
            Target: '@UI.FieldGroup#GeneralInfoGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'CloudEventFacet',
            Label : 'CloudEvent Information',
            Target: '@UI.FieldGroup#CloudEventGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'AdditionalInfoFacet',
            Label : 'Additional Information',
            Target: '@UI.FieldGroup#AdditionalInfoGroup',
        },
    ]
});
