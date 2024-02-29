import React from "react";
import { cn } from "@/utils/cn";
import { Spotlight } from "@/ui/Spotlight";
import ProductShowcase from "../Products/mom";

function SpotlightProductWrapper() {
  return (
    <div
      className=" w-full flex items-center justify-center  bg-transparent antialiased  relative overflow-hidden"
      id="productshowcase"
    >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <ProductShowcase />
    </div>
  );
}

export default SpotlightProductWrapper;
