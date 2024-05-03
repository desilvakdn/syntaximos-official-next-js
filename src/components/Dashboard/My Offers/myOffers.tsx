"use client";
import React from "react";
import SingleOffer from "./Sub/OfferComponent";
import Confetti from "@/components/Common/confetti";
import { useWindowSize } from "react-use";

function MyOffers() {
  const { width, height } = useWindowSize();
  return (
    <>
      {false && <Confetti duration={5000} width={7000} height={3000} />}
      <div className="p-8 flex flex-col flex-grow">
        <div>
          <h2>My Offers</h2>
          <label htmlFor="">
            You Can Redeem Offers Gifted By Syntaximos Here
          </label>
          {true && (
            <div className="mt-10 bg-zinc-800 py-2 px-3 rounded opacity-50 w-full h-full flex justify-center items-center">
              <label htmlFor="">
                Oops! You Don&apos;t Have Any Offers At The Moment. Stay In
                Touch With Us
              </label>
            </div>
          )}
        </div>

        <div className="flex-wrap mt-10 flex flex-row gap-3">
          {/* <SingleOffer />
          <SingleOffer />
          <SingleOffer />
          <SingleOffer />
          <SingleOffer />
          <SingleOffer />
          <SingleOffer /> */}
        </div>
      </div>
    </>
  );
}

export default MyOffers;
