import React from "react";
import { Spotlight } from "@/ui/Spotlight";
import ProductShowcase from "../Products/mom";
import Divider from "../divider";

function SpotlightProductWrapper() {
  return (
    <div
      className=" w-full flex flex-col items-center justify-center  bg-transparent antialiased  relative overflow-hidden"
      id="productshowcase"
    >
      <div className="absolute top-0 w-[60%] items-center justify-center flex">
        <Divider />
      </div>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <ProductShowcase />
    </div>
  );
}

export default SpotlightProductWrapper;
