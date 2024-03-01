"use client";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";
import { motion } from "framer-motion";

function QAHolder({ question, answer }: { question: string; answer: string }) {
  const [clicked, setclicked] = useState(false);
  return (
    <motion.div
      layout
      className="w-full lg:max-w-[970px] lg:min-w-[900px] bg-zinc-800 p-4 rounded cursor-pointer transition-all hover:brightness-125"
      onClick={() => (clicked === false ? setclicked(true) : setclicked(false))}
    >
      <div className="flex flex-row justify-between items-center">
        <h3 className="p-0 m-0 mb-5 mt-4 text-base md:text-lg">{question}</h3>
        <label
          htmlFor=""
          className={`transition-all mr-5 ${clicked ? "rotate-45" : ""}`}
        >
          <Plus size={32} weight="bold" />
        </label>
      </div>
      {clicked && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "backInOut" }}
          className=" bg-synwhite text-synblack rounded p-5 text-left"
        >
          {answer}
        </motion.p>
      )}
    </motion.div>
  );
}

export default QAHolder;
