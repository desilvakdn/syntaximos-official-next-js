"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import useTimer from "@/components/Common/Timer";
import Timer from "@/components/Common/Timer";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";
import React, { useEffect, useState } from "react";

function SingleOffer() {
  const { openpopup } = useGlobalPopup();
  const [offerexpired, setofferexpired] = useState(false);
  const [isredeeming, setisredeeming] = useState(false);
  const { timeLeft, isTimeUp } = useTimer({
    startdate: new Date().toString(),
    enddate: "2024-05-04",
    targettime: 100000,
  });

  useEffect(() => {
    isTimeUp ? setofferexpired(true) : setofferexpired(false);
  }, [isTimeUp]);

  function redeemoffer() {
    if (isredeeming) {
      openpopup("Please Wait !", false);
      return;
    }
    if (offerexpired) {
      openpopup("Offer Has Been Expired !", false);
      return;
    }

    setisredeeming(true);
    setTimeout(() => {
      setisredeeming(false);
    }, 10000);
  }

  return (
    <div className="text-synblack bg-white w-fit p-6 px-10 rounded max-w-[650px] relative">
      <div className="w-full flex justify-end items-center flex-row gap-3">
        {!isTimeUp && (
          <>
            <label htmlFor="">Expires In</label>
            <div className="transition-all flex flex-row gap-1 items-center">
              <label
                htmlFor=""
                className="bg-synblue px-1 py-1 rounded text-synwhite"
              >
                {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
              </label>
              <label htmlFor="">:</label>
              <label
                htmlFor=""
                className="bg-synblue px-1 py-1 rounded text-synwhite"
              >
                {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
              </label>
              <label htmlFor="">:</label>
              <label
                htmlFor=""
                className="bg-synblue px-1 py-1 rounded text-synwhite"
              >
                {timeLeft.minutes < 10
                  ? `0${timeLeft.minutes}`
                  : timeLeft.minutes}
              </label>
              <label htmlFor="">:</label>
              <label
                htmlFor=""
                className="bg-synblue px-1 py-1 rounded text-synwhite"
              >
                {timeLeft.seconds < 10
                  ? `0${timeLeft.seconds}`
                  : timeLeft.seconds}
              </label>
            </div>
          </>
        )}
        {isTimeUp && <label htmlFor="">Offer Expired</label>}
      </div>
      <div className="flex flex-row justify-between gap-4 items-center">
        <div className="flex flex-row gap-2 items-center">
          <div className="w-[97px] h-[97px] rounded-full bg-slate-200"></div>
          <div>
            <h3 className="p-0 m-0">Fiverr Mate Pro</h3>
            <label htmlFor="">Get Yearly Membership For</label>
            <h1 className="p-0 m-0">50% Off</h1>
          </div>
        </div>
        <div>
          <button
            onClick={redeemoffer}
            className={
              offerexpired
                ? "flex flex-row gap-2 items-center bg-zinc-200 text-zinc-400 !font-semibold px-9 py-3 cursor-not-allowed hover:bg-zinc-200 hover:text-zinc-400"
                : "flex flex-row gap-2 items-center bg-[#FFD770] hover:bg-[#ffd25f] hover:!text-[#713717] !text-[#713717] !font-semibold px-9 py-3"
            }
          >
            {!isredeeming && <span>Get Offer</span>}
            {isredeeming && (
              <>
                <span>Processing</span>
                <span>
                  <LoadingDots width={20} fill="#713717" />
                </span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-justify opacity-60">
          Special Offer Just Only for You! Don&apos;t Miss Out. Hurry Up Before
          it&apos;s Gone. With Fiverr Mate, Boost Your Gig&apos;s SEO, Beat the
          Competition and Rank 1st On Fiverr. Find Hidden Keywords and Stats to
          Shine Among 1000+ and Lot&apos;s More Features. We Get You Want to
          Rank Your Fiverr Gig, and Here&apos;s the Deal: Pay for Your
          Subscription with Just One Fiverr Order. Grab This Opportunity Now!
        </p>
      </div>
    </div>
  );
}

export default SingleOffer;
