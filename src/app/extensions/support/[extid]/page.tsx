import VideoHolder from "@/components/Support n Guide/videoholder";
import Config from "@/resources/config";
import { X } from "@phosphor-icons/react/dist/ssr";
import React from "react";

async function Support({ params }: { params: { extid: String } }) {
  const x = await fetch(
    `${Config().api}/web/extensions/support/videos/${params.extid}`
  );
  const y = await x.json();

  return (
    <div
      className={`bg-zinc-900 flex-grow mb-3 flex flex-col items-center min-h-[600px] ${
        y.extensionnotfound && "justify-center"
      }`}
    >
      {y.extensionnotfound ? (
        <>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span>
              <X size={40} weight="bold" />
            </span>
            <span className="text-xl">Not A Valid Extension</span>
          </div>
        </>
      ) : (
        <div className="mt-[90px] text-center">
          <label htmlFor="" className="bg-synblue px-8 py-2 rounded">
            {y.extname}
          </label>
          <h1 className="m-0  p-0 mt-3">Support</h1>
          <h4 className="opacity-45 font-medium">
            This support resources will help you to solve most of extension
            related problems
          </h4>
          {y.status ? (
            <VideoHolder data={y.data} />
          ) : (
            <>
              <div>
                Looks Like There's Not Support Videos Available For This
                Extension At The Moment
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Support;
