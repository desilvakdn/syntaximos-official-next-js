"use client";
import { Star } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SyntaximosLogo from "@/Icons/syntaximoswordlogo";
import SyntaximosLogoOnly from "@/Icons/syntaximoslogoonly";
import Divider from "../divider";

function HomeBanner() {
  return (
    <div className="relative min-h-[600px] overflow-hidden flex flex-col justify-center items-center rounded py-20 md:min-h-[700px]">
      <motion.div
        initial={{ y: 300, rotate: -130, opacity: 0 }}
        animate={{ y: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.1, ease: "backInOut" }}
        className="absolute z-[2] top-0 left-0 right-0 bottom-0 flex justify-center items-center"
      >
        <SyntaximosLogoOnly width={290} fill="rgb(49, 49, 49,0.3)" />
      </motion.div>
      <div className="absolute min-h-96 flex flex-col justify-center items-center rounded py-20 z-[3]">
        <motion.label
          initial={{
            y: -10,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{ duration: 0.4, delay: 0.1, ease: "backInOut" }}
          htmlFor=""
        >
          <SyntaximosLogo
            width={180}
            fill="rgb(205, 205, 205)"
            logocolor={"#1288ff"}
          />
        </motion.label>
        <motion.h1
          className="drop-shadow bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent transition-all text-center text-[27px] w-[500px] sm:w-[600px] md:text-[35px] md:w-[800px] lg:w-[960px] lg:text-[40px] mt-0 pt-3"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "backInOut" }}
        >
          Supercharge Your Browser Experience with It&apos;s Amazing Extension
          Collection
        </motion.h1>

        <motion.h4
          className="transition-all text-[13px] max-w-[400px] sm:max-w-[700px] md:max-w-full md:text-lg lg:text-xl font-medium p-0 m-0 text-center "
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "backInOut" }}
        >
          We&apos;ll take care of the hard part while you surf the web smarter,
          not harder
        </motion.h4>
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "backInOut" }}
          className="flex flex-row gap-2 mt-4"
        >
          <div className="flex flex-row">
            {Array(5)
              .fill(1)
              .map((item, index) => (
                <motion.label
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.4 + 0.1 * index,
                    ease: "backInOut",
                  }}
                >
                  <Star key={index} size={25} color="#ecc950" weight="fill" />
                </motion.label>
              ))}
          </div>
          <motion.label
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "backInOut" }}
            htmlFor=""
            className="t"
          >
            50k+ Trust Us
          </motion.label>
        </motion.div>

        <motion.button
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "backInOut" }}
          className="mt-6 p-4 bg-synblue text-synwhite hover:bg-synwhite hover:text-synblack"
          onClick={() => {
            document.querySelector("#productshowcase")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          Show Me Extensions
        </motion.button>
      </div>
      <div className="absolute bottom-0 w-[60%] items-center justify-center flex">
        <Divider />
      </div>
    </div>
  );
}

export default HomeBanner;
