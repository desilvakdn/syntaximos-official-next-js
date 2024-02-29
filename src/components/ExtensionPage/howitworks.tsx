import React from "react";

function HowItWorks() {
  return (
    <div className="flex flex-col gap-2  w-full min-h-[30vw] items-center justify-center my-10">
      <h1 className="text-4xl">How It&apos;s Work</h1>
      <label htmlFor="" className="opacity-55">
        We understand your curiosity about how Fiverr Mate operates and boost
        your gig rankings. So here&apos;s a brief showcase
      </label>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="rounded-2xl overflow-hidden">
          <iframe
            width="1000"
            height="600"
            src="https://www.youtube.com/embed/nIwNEopJiBI?si=sj6t4ZpeGgK4s8TE"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
