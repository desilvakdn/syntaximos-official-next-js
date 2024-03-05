"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import PricingSection from "@/components/Pricing/pricingcompo";
import Config from "@/resources/config";
import { GoogleChromeLogo, X } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";

function WelcomeExtId({ params }: { params: { extid: String } }) {
  const [isinit, setisinit] = useState(true);
  const [isvalidext, setisvalidext] = useState(false);
  const [extname, setextname] = useState("");
  const [extdetails, setextdetails] = useState({
    youtubeurl: "",
    reviewurl: "",
  });

  useEffect(() => {
    fetch(`${Config().api}/web/extensions/${params.extid}`)
      .then((e) => e.json())
      .then((data) => {
        if (data.status) {
          setisinit(false);
          setisvalidext(true);
          setextname(data.extension);
        } else {
          setisinit(false);
          setisvalidext(false);
        }
      });
  }, []);
  return (
    <div className="bg-zinc-900 flex-grow mb-3 flex flex-col items-center justify-center min-h-[600px] overflow-hidden">
      {isinit ? (
        <>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span>Checking</span>
            <span>
              <LoadingDots width={25} fill="var(--synwhite)" />
            </span>
          </div>
        </>
      ) : isvalidext ? (
        <div className="flex flex-col justify-center items-center py-10">
          <h3 className="opacity-95 m-0 p-0">Thanks For Installing</h3>
          <h1 className="p-0 m-0 text-5xl text-synblue mb-5">{extname}</h1>
          <label htmlFor="">{`You Should Watch The Following Video To Setup ${extname} Properly`}</label>
          <div className="min-w-[1000px] min-h-[600px] bg-zinc-700 mt-10 rounded"></div>
          <div className="mt-10 flex flex-col justify-center items-center">
            <PricingSection extid={params.extid} />
            <div className="bg-zinc-800 border-2 border-solid border-zinc-600 w-[1000px] rounded p-5 py-10 flex flex-col justify-center items-center">
              <h2 className="opacity-55 p-0 m-0">Need Premium Free?</h2>
              <h1 className="p-0 m-0 mb-0">
                Use {extname} and Post a Honest Review
              </h1>
              <label htmlFor="">
                Each Month We&apos;re Giving 1 Month {extname} Premium for 10
                Users
              </label>
              <button
                className="flex flex-row gap-2 items-center justify-center py-5 px-5 text-xl font-bold mt-5"
                onClick={() => window.open(extdetails.reviewurl, "_blank")}
              >
                <span>Leave Your Review Here</span>
                <span>
                  <GoogleChromeLogo width={42} height={42} weight="bold" />
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-2 items-center justify-center">
          <span>
            <X size={40} weight="bold" />
          </span>
          <span className="text-xl">Not A Valid Extension</span>
        </div>
      )}
    </div>
  );
}

export default WelcomeExtId;
