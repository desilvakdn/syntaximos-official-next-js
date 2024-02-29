import ExtensionCollection from "@/components/Dashboard/Extensions/extensioncollection";
import ProductShowcase from "@/components/Home/Products/mom";
import Products from "@/components/Home/Products/page";
import Config from "@/resources/config";
import React from "react";

interface ExtDetailsResponse {
  status: boolean;
  data: any[]; // Change `any` to a more specific type if possible
}

async function Extensions() {
  let extdetails = await fetch(`${Config().api}/web/extensions`, {
    cache: "no-store",
  });

  const extdetailsdata: ExtDetailsResponse = await extdetails.json();

  return <ExtensionCollection extdetailsdata={extdetailsdata} />;
}

export default Extensions;
