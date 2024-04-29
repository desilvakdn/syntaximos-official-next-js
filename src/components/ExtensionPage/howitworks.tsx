import React from "react";

function HowItWorks({ ytlink }: { ytlink: string }) {
  return (
    <div className="flex flex-col gap-2  w-full min-h-[30vw] items-center justify-center my-10">
      <h1 className="text-4xl">How It&apos;s Work</h1>
      <label htmlFor="" className="opacity-55">
        We understand your curiosity about how Fiverr Mate operates and boost
        your gig rankings. So here&apos;s a brief showcase
      </label>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full lg:w-[80%] lg:max-w-[1300px]">
          <div className="mt-9 rounded-2xl overflow-hidden w-full aspect-w-16 aspect-h-9 relative">
            <iframe
              src={ytlink}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
