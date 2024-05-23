"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import useTimer from "@/components/Common/Timer";
import Timer from "@/components/Common/Timer";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";
import fetchPost from "@/modules/fetchPost";
import { OfferCardTypes } from "@/types/OfferCard";
import { IconCrown } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

function SingleOffer({ offer }: { offer: OfferCardTypes }) {
  const { openpopup } = useGlobalPopup();
  const [offerexpired, setofferexpired] = useState(false);
  const [isloading, setisloading] = useState(true);
  const [isredeeming, setisredeeming] = useState(false);

  const {
    timeLeft,
    isTimeUp,
    isRedTime,
    setstartdate,
    settargettime,
    setnowdate,
  } = useTimer();

  useEffect(() => {
    if (!offer.observed) {
      fetchPost(
        "user/offer/observed",
        {
          offername: offer.offer.name,
        },
        true
      ).then((e) => {
        console.log(e);
        if (e.status) {
          setstartdate(e.data.offerstarted);
          settargettime(offer.offer.expire_duration);
          setnowdate(e.data.timenow);
        }
        setisloading(false);
      });
    } else {
      setstartdate(offer.offerstarted);
      settargettime(offer.offer.expire_duration);
      setnowdate(offer.timenow);
      setisloading(false);
    }
  }, []);

  useEffect(() => {
    isTimeUp ? setofferexpired(true) : setofferexpired(false);

    if (isTimeUp) {
      fetchPost(
        "user/offer/setexpire",
        {
          offername: offer.offer.name,
        },
        true
      ).then((e) => {});
    }
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

    fetchPost(
      "stripe/coupon/new",
      {
        offername: offer.offer.name,
      },
      true
    ).then((e) => {
      if (e.status) {
        fetchPost(
          "stripe/initpayment",
          {
            extid: offer.extensionid,
            packageid: offer.packageidentifier,
            coupon: e.coupon,
          },
          true
        ).then((resp) => {
          setisredeeming(false);
          if (resp.status) {
            window.open(resp.execute_url, "_blank");
          } else {
            openpopup(
              "Something Went Wrong Redeeming Offer. Please Contact Support",
              false
            );
          }
        });
      } else {
        setisredeeming(false);

        openpopup(
          "Something Went Wrong Redeeming Offer. Please Contact Support",
          false
        );
      }
    });
  }

  return (
    <>
      {isloading && (
        <div className="w-[200px] h-[100px] rounded bg-zinc-800 flex flex-row gap-2 text-white justify-center items-center">
          <label htmlFor="">Processing..</label>
          <label htmlFor="">
            <LoadingDots width={20} fill="white" />
          </label>
        </div>
      )}
      {!isloading && (
        <div className="text-synblack bg-white w-fit p-6 px-10 rounded max-w-[690px] relative overflow-hidden">
          <>
            <div className="w-full flex justify-end items-center flex-row gap-3">
              {!isTimeUp && (
                <>
                  <label htmlFor="">Expires In</label>
                  <div className="transition-all flex flex-row gap-1 items-center">
                    <label
                      htmlFor=""
                      className={twMerge(
                        "bg-synblue px-1 py-1 rounded text-synwhite",
                        isRedTime && "bg-red-600"
                      )}
                    >
                      {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
                    </label>
                    <label htmlFor="">:</label>
                    <label
                      htmlFor=""
                      className={twMerge(
                        "bg-synblue px-1 py-1 rounded text-synwhite",
                        isRedTime && "bg-red-600"
                      )}
                    >
                      {timeLeft.hours < 10
                        ? `0${timeLeft.hours}`
                        : timeLeft.hours}
                    </label>
                    <label htmlFor="">:</label>
                    <label
                      htmlFor=""
                      className={twMerge(
                        "bg-synblue px-1 py-1 rounded text-synwhite",
                        isRedTime && "bg-red-600"
                      )}
                    >
                      {timeLeft.minutes < 10
                        ? `0${timeLeft.minutes}`
                        : timeLeft.minutes}
                    </label>
                    <label htmlFor="">:</label>
                    <label
                      htmlFor=""
                      className={twMerge(
                        "bg-synblue px-1 py-1 rounded text-synwhite",
                        isRedTime && "bg-red-600"
                      )}
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

            <label
              htmlFor=""
              className="bg-synblue text-white px-2 py-[4px] rounded-r drop-shadow-sm absolute left-0 top-1"
            >
              {offer.packagename}
            </label>
            <div className="flex flex-row justify-between gap-4 items-center">
              <div className="flex flex-row gap-2 items-center">
                <div className="w-[97px] h-[97px] rounded-full bg-slate-200 relative">
                  <Image
                    src={offer.extensionicon}
                    alt={offer.extensionid}
                    layout="fill"
                    objectFit="contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h2 className="p-0 m-0">{offer.extensionname}</h2>
                  <label htmlFor="">Offer : {offer.offer.name}</label>
                  <h1 className="p-0 m-0 animate-pulse">
                    {offer.offer.amount}
                  </h1>
                </div>
              </div>
              <div>
                <button
                  onClick={redeemoffer}
                  className={twMerge(
                    "drop-shadow-sm flex flex-row gap-2 items-center bg-[#FFD770] hover:bg-[#ffd25f] hover:!text-[#713717] !text-[#713717] !font-semibold px-9 py-3 relative overflow-hidden",
                    offerexpired &&
                      "flex flex-row gap-2 items-center bg-zinc-200 text-zinc-400 !font-semibold px-9 py-3 cursor-not-allowed hover:bg-zinc-200 hover:text-zinc-400"
                  )}
                >
                  {!isredeeming && (
                    <>
                      <motion.div
                        animate={{ left: 400 }}
                        transition={{
                          from: -100,
                          repeat: Infinity,
                          repeatDelay: 3,
                          duration: 2,
                        }}
                        className="absolute   rotate-[-35deg] flex flex-row gap-2 items-center justify-center"
                      >
                        <div className="w-[10px] h-[300px] bg-white bg-opacity-30"></div>
                        <div className="w-[30px] h-[300px] bg-white bg-opacity-30"></div>
                        <div className="w-[18px] h-[300px] bg-white bg-opacity-30"></div>
                      </motion.div>
                      <span>Get Offer</span>
                      <span
                        className={twMerge(!offerexpired && "animate-bounce")}
                      >
                        <IconCrown size={25} />
                      </span>
                    </>
                  )}
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
              <p className="text-justify opacity-60">{offer.offer.message}</p>
            </div>
          </>
        </div>
      )}
    </>
  );
}

export default SingleOffer;
