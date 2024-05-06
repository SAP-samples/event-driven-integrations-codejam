using {
  cuid,
  managed
} from '@sap/cds/common';

namespace com.sap.codejam.edi;

entity ConsumedMessage : cuid, managed {
  topic                 : String;
  messageId             : String;
  source                : String;
  specversion           : String;
  type                  : String;
  payload               : String;
  isValid               : Boolean default false;
  validationCriticality : Integer;
  validationMessage     : String(5000);
}

entity QRCode : cuid, managed {
  ticketId  : String;
  messageId : String;
  @UI.IsImageURL: true
  dataURL   : String(5000);
}
