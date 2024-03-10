"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

function VideoHolder({ data }: { data: String[] }) {
  const [activehover, setactivehover] = useState(-1);
  return (
    <div className="grid grid-cols-3 gap-3 mt-6 mb-10">
      {data.map((itm, index) => {
        return (
          <motion.div
            initial={{
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0 + 0.1 * index,
              ease: "backInOut",
            }}
            whileHover={{
              scale: 1.03,
            }}
            key={index}
            className={`w-[550px] h-[310px] rounded flex justify-center items-center ${
              index != activehover && activehover > -1
                ? "brightness-75 transition-all"
                : ""
            }`}
            onMouseOver={() => setactivehover(index)}
            onMouseLeave={() => setactivehover(-1)}
          >
            <div className="overflow-hidden w-full aspect-w-16 aspect-h-9">
              <iframe
                src={itm + "?rel=0"}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default VideoHolder;
