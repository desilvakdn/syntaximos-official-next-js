import React from "react";
import FeaturesAction from "./featuresaction";

function FeaturesSection({
  extension,
  features,
}: {
  extension: string;
  features: {
    img: string;
    title: string;
    description: string;
  }[];
}) {
  return (
    <div className="flex flex-col gap-2  w-full min-h-[30vw] justify-center items-center overflow-hidden">
      <h1 className="text-4xl">Features</h1>
      <label htmlFor="" className="opacity-55">
        Fiverr Mate Comes With Following Useful Features That Will Increase Your
        Gig SEO, Productivity and Save A Lot Time
      </label>
      <FeaturesAction features={features} extension={extension} />
    </div>
  );
}

export default FeaturesSection;
