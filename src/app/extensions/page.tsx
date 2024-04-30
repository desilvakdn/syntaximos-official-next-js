import ExtensionCollection from "@/components/Dashboard/Extensions/extensioncollection";
import Config from "@/resources/config";
import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browser Extensions",
  other: {
    extensions: ["Fiverr Mate"],
  },
};

interface ExtDetailsResponse {
  status: boolean;
  data: any[]; // Change `any` to a more specific type if possible
}

async function Extensions() {
  let extdetails = await fetch(`${Config().api}/web/extensions`);

  const extdetailsdata: ExtDetailsResponse = await extdetails.json();

  return <ExtensionCollection extdetailsdata={extdetailsdata} />;
}

export default Extensions;
