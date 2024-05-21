import React from "react";
import PricingSection from "../Pricing/pricingcompo";

function PricingSectionExtPage({ extid }) {
  return (
    <div className="flex flex-col gap-2  w-full min-h-[30vw] justify-center items-center">
      <h1 id="pricingsectionmiddle">Pricing</h1>
      <PricingSection extid={extid} />
    </div>
  );
}

export default PricingSectionExtPage;
