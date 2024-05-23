"use client";
import React, { useEffect, useState } from "react";
import Confetti from "@/components/Common/confetti";
import { useWindowSize } from "react-use";
import { OfferCardTypes } from "@/types/OfferCard";
import SingleOffer from "./Sub/OfferComponent";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import fetchGet from "@/modules/fetchGet";

function MyOffers() {
  const { width, height } = useWindowSize();
  const [offers, setoffers] = useState<OfferCardTypes[]>([]);
  const [isOffersLoading, setOffersLoading] = useState(true);

  useEffect(() => {
    fetchGet("user/offer/get", true).then((data) => {
      if (data.status) {
        setoffers(data.data);
        console.log(data.data);
      }
      setOffersLoading(false);
    });
  }, []);

  return (
    <>
      {!isOffersLoading && offers.length > 0 && (
        <Confetti duration={5000} width={7000} height={3000} />
      )}

      <div className="p-8 flex flex-col flex-grow">
        <div>
          <h2>My Offers</h2>
          <label htmlFor="">
            You Can Redeem Offers Gifted By Syntaximos Here
          </label>
          {isOffersLoading && (
            <>
              <div className="mt-10 bg-zinc-800 py-2 px-3 rounded opacity-50 w-full h-full flex flex-row gap-2 justify-center items-center">
                <label htmlFor="">Checking Your Offers..</label>
                <label htmlFor="">
                  <LoadingDots width={20} fill="white" />
                </label>
              </div>
            </>
          )}
          {!isOffersLoading && offers.length === 0 && (
            <div className="mt-10 bg-zinc-800 py-2 px-3 rounded opacity-50 w-full h-full flex justify-center items-center">
              <label htmlFor="">
                Oops! You Don&apos;t Have Any Offers At The Moment. Stay In
                Touch With Us
              </label>
            </div>
          )}
        </div>

        {
          <div className="flex-wrap mt-10 flex flex-row gap-3">
            {offers.map((offer, index) => (
              <SingleOffer key={index} offer={offer} />
            ))}
          </div>
        }
      </div>
    </>
  );
}

export default MyOffers;
