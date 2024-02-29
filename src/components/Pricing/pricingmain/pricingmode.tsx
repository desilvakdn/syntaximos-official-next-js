"use client";
import React from "react";

function PricingMode({
  selected,
  setSelected,
}: {
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <label
        htmlFor=""
        className="flex-grow py-5 rounded border-2 border-solid border-zinc-600 hover:bg-zinc-800 cursor-pointer"
      >
        Individual Pricing
      </label>
      <label
        htmlFor=""
        className="flex-grow py-5 rounded border-2 border-solid border-zinc-600 hover:bg-zinc-800 cursor-pointer"
      >
        Combo Pricing
      </label>
    </>
  );
}

export default PricingMode;
