"use client";
import React from "react";
import { motion } from "framer-motion";

function Divider() {
  return (
    <motion.div
      initial={{ width: "0", opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeIn" }}
      className="transition-all relative flex flex-row gap-0"
    >
      <div className="w-full bg-gradient-to-r from-transparent to-white bg-opacity-70 h-[2px]"></div>
      <div className="w-full bg-gradient-to-l from-transparent to-white bg-opacity-70 h-[2px]"></div>
    </motion.div>
  );
}

export default Divider;
