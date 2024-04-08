import React from "react";
import QAcontainer from "./QAcontainer";
import Config from "@/resources/config";

interface QADetails {
  status: boolean;
  data: any[]; // Change `any` to a more specific type if possible
}

async function QA() {
  let qaholder = await fetch(`${Config().api}/web/qa`);
  const qacontainer: QADetails = await qaholder.json();

  return (
    <div className="pb-14 align-mddle text-center flex flex-col justify-center items-center">
      <h2 className="text-center">Answers to Your Burning Questions</h2>
      <p className="text-center opacity-50 w-[450px] md:w-[650px]">
        The following are the questions users were asked, you may have too.
        Contact us for more clarification.
      </p>
      <QAcontainer qacontainer={qacontainer} />
    </div>
  );
}

export default QA;
