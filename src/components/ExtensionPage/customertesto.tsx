import React from "react";
import TestomonialAction from "./testomonialaction";

function CustomerFeedbackSection({
  extensionreviewurl,
  reviews,
}: {
  extensionreviewurl: string;
  reviews: {
    image_url: string;
    name: string;
    comment: string;
  }[];
}) {
  return (
    <div className="flex flex-col gap-2  w-full min-h-[30vw]">
      <h1 className="text-4xl">Here&apos;s What Our Members Say</h1>
      <label htmlFor="" className="text-justify">
        Our members are the most important part of our community. Here&apos;s
        what they have to say about Fiverr Mate
      </label>
      <TestomonialAction
        reviews={reviews}
        extensionreviewurl={extensionreviewurl}
      />
    </div>
  );
}

export default CustomerFeedbackSection;
