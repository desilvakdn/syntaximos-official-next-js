"use client";
import { ArrowUp } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

interface Counting {
  title: string;
  count: number;
  suffix: string;
  delay: number;
  active: boolean;
}

function Countable({ title, count, suffix, delay = 0, active }: Counting) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: delay, ease: "backInOut" }}
      className={`transition-all w-full flex-grow lg:flex-grow-0 sm:w-fit flex flex-col border-[2px] border-dashed ${
        active ? "border-synblue " : "border-zinc-500 "
      } py-1 px-5 rounded hover:bg-zinc-800 cursor-pointer drop-shadow`}
    >
      <label htmlFor="" className="opacity-60">
        {title}
      </label>
      <div
        className={`transition-all ${
          active ? "scale-105" : "scale-100"
        } flex flex-row gap-1 items-center ${active ? "text-synblue" : ""}`}
      >
        <h1 className="p-0 m-0 text-[50px] md:text-[70px]">
          <CountUp end={count} className="p-0 m-0" /> <span>{suffix}</span>
        </h1>
        <ArrowUp size={32} weight="bold" />
      </div>
    </motion.div>
  );
}

export default Countable;
