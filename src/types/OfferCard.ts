export interface OfferCardTypes {
  extensionid: String;
  packageidentifier: String;
  offer: {
    name: String;
    amount: String;
    percent_off: Number;
    amount_off: Number;
    message: String;
    expire_duration: Number;
    max_redemptions: {
      type: Number;
      default: 1;
    };
    duration: {
      type: String;
      default: "once";
    };
  };
  eligibility: {
    minspend: Number;
    minagedays: Number;
    ispremium: Boolean;
  };
}
