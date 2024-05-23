export interface OfferCardTypes {
  extensionid: string;
  extensionname: string;
  extensionicon: string;
  packageidentifier: string;
  packagename: string;
  observed: boolean;
  offerstarted: string;
  timenow: string;
  offer: {
    name: string;
    amount: string;
    percent_off: number;
    amount_off: number;
    message: string;
    expire_duration: number;
    max_redemptions: {
      type: number;
      default: 1;
    };
    duration: {
      type: string;
      default: "once";
    };
  };
  eligibility: {
    minspend: number;
    minagedays: number;
    ispremium: Boolean;
  };
}
