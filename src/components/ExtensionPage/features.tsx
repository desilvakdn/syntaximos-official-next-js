import React from "react";
import FeaturesAction from "./featuresaction";
import FeatureContainer from "./feature_container";

function FeaturesSection({
  extension,
  features,
  headline,
}: {
  extension: string;
  features: {
    img: string;
    title: string;
    description: string;
    functions: string[];
  }[];
  headline: string;
}) {
  return (
    <div className="flex flex-col gap-2  w-full min-h-[30vw] justify-center items-center overflow-hidden">
      <h1 className="text-4xl">Features</h1>
      <label htmlFor="" className="opacity-55">
        {headline}
      </label>
      <FeatureContainer features={features} />
      {/* <FeaturesAction features={features} extension={extension} /> */}
    </div>
  );
}

export default FeaturesSection;
