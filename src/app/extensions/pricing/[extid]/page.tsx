import React from "react";
import PricingSection from "@/components/Pricing/pricingcompo";

function ExtPricing({ params }: { params: { extid: string } }) {
  return <PricingSection extid={params.extid} />;
}

export default ExtPricing;
