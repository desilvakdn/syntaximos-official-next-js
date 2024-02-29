"use client";
import { BackgroundBeams } from "@/ui/BackgroundBeams";
import { Star } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function HomeBanner() {
  return (
    <div
      className="relative gradientanimation min-h-96 overflow-hidden flex flex-col justify-center items-center rounded py-20"
      style={{
        minHeight: "600px",
      }}
    >
      <motion.label
        initial={{ y: 300, rotate: -180, opacity: 0 }}
        animate={{ y: 0, rotate: -30, opacity: 1 }}
        transition={{ duration: 1, delay: 0.1, ease: "backInOut" }}
        htmlFor=""
        className="absolute -rotate-[30deg] text-[380px] text-synblack opacity-35"
      >
        {"{"}
      </motion.label>
      <div className="absolute min-h-96 flex flex-col justify-center items-center rounded py-20 z-[3]">
        <motion.h1
          className="text-center w-[400px] md:w-[600px]"
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: "backInOut" }}
        >
          Make Your Browser More Powerful With Our Extensions
        </motion.h1>
        <motion.h4
          className="text-xl"
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "backInOut" }}
        >
          Surf Smarter, Not Harder
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
                  <Star
                    key={index}
                    size={20}
                    color="var(--syngold)"
                    weight="fill"
                  />
                </motion.label>
              ))}
          </div>
          <motion.label
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "backInOut" }}
            htmlFor=""
          >
            50k+ Trust Us
          </motion.label>
        </motion.div>

        <Link href={"#productshowcase"}>
          <motion.button
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "backInOut" }}
            className="mt-6 p-4 bg-synblue text-synwhite hover:bg-synwhite hover:text-synblack"
          >
            Show Me Extensions
          </motion.button>
        </Link>
      </div>
      <BackgroundBeams />
    </div>
  );
}

export default HomeBanner;
