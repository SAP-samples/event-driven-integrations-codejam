using com.sap.codejam.edi as edic from '../db/data-model';


service CloudEventService {
  entity messages @readonly as projection on edic.ConsumedMessage{
    key ID,
    topic,
    messageId,
    source,
    specversion,
    type,
    payload,
    isValid,
    validationMessage,
    validationCriticality,
    createdAt
  };
  entity qrcodes @readonly as projection on edic.QRCode{
    key messageId,
    ticketId,
    dataURL,
    createdAt
  }
}

@protocol: 'none'
service InternalService {
  entity messages as projection on edic.ConsumedMessage;
  entity qrcodes as projection on edic.QRCode;
}