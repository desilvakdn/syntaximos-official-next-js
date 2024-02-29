import React from "react";
import PricingSection from "../Pricing/pricingcompo";

function PricingSectionExtPage() {
  return (
    <div className="flex flex-col gap-2  w-full min-h-[30vw] justify-center items-center">
      <h1>Pricing</h1>
      <PricingSection extid={"fiverr_mate"} />
    </div>
  );
}

export default PricingSectionExtPage;
