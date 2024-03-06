import React from "react";
import QAcontainer from "../Home/QA/QAcontainer";

interface QADetails {
  status: boolean;
  data: {
    question: string;
    answer: string;
  }[]; // Change `any` to a more specific type if possible
}

function QASection({ data }: { data: QADetails }) {
  return (
    <div className="flex flex-col gap-2  w-full min-h-[30vw] justify-center items-center">
      <h1 className="text-4xl">We Have Answers</h1>
      <label htmlFor="" className="text-justify">
        Here are the most user&apos;s asked q and a regarding to this extension.
        Please read them carefully and understand limitations, drawbacks and
        it&apos;s capabilities.
      </label>
      <div className="flex justify-center items-center w-full">
        <QAcontainer qacontainer={data} />
      </div>
    </div>
  );
}

export default QASection;
