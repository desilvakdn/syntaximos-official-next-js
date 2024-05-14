import CustomerFeedbackSection from "@/components/ExtensionPage/customertesto";
import FeaturesSection from "@/components/ExtensionPage/features";
import GrowthStats from "@/components/ExtensionPage/growthstats";
import HeroExtensionSection from "@/components/ExtensionPage/herosection";
import HowItWorks from "@/components/ExtensionPage/howitworks";
import PricingSectionExtPage from "@/components/ExtensionPage/pricing";
import QASection from "@/components/ExtensionPage/qanda";
import fetchGet from "@/modules/fetchGet";
import Config from "@/resources/config";
import { X } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";
import React from "react";

export async function generateStaticParams() {
  const djson = await fetchGet(`web/extensions`, true);
  return djson.data.map((itm: { identifier: string }) => itm.identifier);
}

export async function generateMetadata({
  params,
}: {
  params: {
    eid: String;
  };
}): Promise<Metadata> {
  const djson = await fetchGet(`web/extensions/details/${params.eid}`, true);
  return {
    title: djson.data.title,
    description: djson.data.description_detail,
    //keywords also needed
  };
}

type ExtensionData = typeof extensiondata;
const extensiondata = {
  rating: 0,
  title: "",
  identifier: "",
  tagline: "",
  version: "",
  description: "",
  users: 0,
  compatible: ["", "", ""],
  link: "",
  heroimg: "",
  features: [
    {
      img: "",
      title: "",
      description: "",
    },
  ],
  videos: {
    howitworks: "",
  },
  reviews: [
    {
      image_url: "",
      name: "",
      comment: "",
    },
  ],
  qa: [
    {
      question: "",
      answer: "",
    },
  ],
};

async function ExtensionPage({
  params,
}: {
  params: {
    eid: String;
  };
}) {
  const djson = await fetchGet(`web/extensions/details/${params.eid}`, true);
  //const data = djson.data;
  return (
    <>
      {djson.status ? (
        <div className="bg-zinc-900 p-10 flex justify-center items-center mb-4 flex-grow flex-col gap-[20px]">
          <HeroExtensionSection data={djson.data} />
          <FeaturesSection
            extension={djson.data.title}
            features={djson.data.features}
            headline={djson?.data?.feature_headline}
          />
          {djson?.data?.growth_stats && (
            <GrowthStats growth_stats={djson?.data?.growth_stats} />
          )}
          <HowItWorks ytlink={djson.data.videos.howitworks} />
          {djson?.data?.reviews && (
            <CustomerFeedbackSection
              extensionreviewurl={djson.data.link}
              reviews={djson.data.reviews}
            />
          )}
          <PricingSectionExtPage extid={djson.data.identifier} />
          <QASection
            data={{
              status: true,
              data: djson.data.qa,
            }}
          />
        </div>
      ) : (
        <div className="bg-zinc-900 flex-grow mb-3 flex flex-col items-center justify-center min-h-[600px] overflow-hidden">
          <div className="flex flex-row gap-2 items-center justify-center">
            <span>
              <X size={40} weight="bold" />
            </span>
            <span className="text-xl">Not A Valid Extension</span>
          </div>
        </div>
      )}
    </>
  );
}

export default ExtensionPage;
