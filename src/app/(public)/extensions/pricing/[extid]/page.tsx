import React from "react";
import PricingSection from "@/components/Pricing/pricingcompo";
import fetchGet from "@/modules/fetchGet";

export async function generateStaticParams() {
  const djson = await fetchGet(`web/extensions`, true);
  return djson.data.map((itm: { identifier: string }) => itm.identifier);
}

function ExtPricing({ params }: { params: { extid: string } }) {
  return <PricingSection extid={params.extid} />;
}

export default ExtPricing;
