"use client";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import "./css/feature_container.css";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

const variants = {
  open: { opacity: 0, scale: 0 },
  closed: { opacity: 1, scale: 1 },
  slideopen: { opacity: 0, y: -10 },
  slideclosed: { opacity: 1, y: 0 },
};
const ease_ = (delay: number, duration: number) => ({
  duration: duration,
  ease: "backInOut",
  delay: delay,
});
const delaysequence = [0, 0.1, 0.2];

function FeatureContainer({
  features,
}: {
  features: {
    img: string;
    title: string;
    description: string;
    functions: string[];
  }[];
}) {
  const [activecard, setactivecard] = useState<number>(0);
  const [active, setactive] = useState(false);

  useEffect(() => {
    if (!active) {
      const timer_ = setInterval(() => {
        let active_ = activecard + 1;
        if (active_ === features.length) {
          active_ = 0;
        }
        setactivecard(active_);
      }, 3000);

      return () => clearInterval(timer_);
    }
  }, [active, activecard]);

  return (
    <>
      <div className="mt-5 flex flex-row gap-1 flex-wrap w-full max-w-[1400px] justify-center items-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`text-sm md:text-base py-4 px-2 flex-grow cursor-pointer  border-solid md:py-6 md:px-6 rounded  transition-all ${
              index === activecard
                ? "bg-synblue text-white border-synblue"
                : "bg-zinc-900 border-[1px] border-zinc-400 hover:bg-zinc-700 hover:text-white hover:border-zinc-700 hover:scale-[1.01] "
            }`}
            onClick={() => {
              setactivecard(index);
              setactive(true);
              const timeout_ = setTimeout(() => {
                setactive(false);
              }, 10000);
              return () => clearTimeout(timeout_);
            }}
          >
            {feature.title}
          </div>
        ))}
      </div>
      <div
        key={activecard}
        className="w-full flex-wrap lg:flex-nowrap flex flex-row gap-4 justify-center drop-shadow a  bg-gradient-to-r from-zinc-800 to-transparent max-w-[1400px] min-w-[300px] rounded mt-6 "
      >
        <div className="p-6 w-full">
          <div className="flex flex-row gap-2 ">
            <motion.div
              initial={"open"}
              animate={"closed"}
              transition={ease_(delaysequence[0], 0.8)}
              variants={variants}
              className="text-sm md:text-base bg-gradient-to-r from-zinc-400 to-zinc-100 px-3 py-1 rounded drop-shadow text-zinc-800"
            >
              Premium
            </motion.div>
            <motion.div
              initial={"open"}
              animate={"closed"}
              transition={ease_(delaysequence[1], 0.8)}
              variants={variants}
              className="text-sm md:text-base bg-gradient-to-r from-zinc-400 to-zinc-100 px-3 py-1 rounded drop-shadow text-zinc-800"
            >
              Free
            </motion.div>
          </div>
          <motion.h2
            initial={"slideopen"}
            animate={"slideclosed"}
            transition={ease_(delaysequence[1], 0.8)}
            variants={variants}
          >
            {features[activecard].title}
          </motion.h2>
          <motion.p
            initial={"slideopen"}
            animate={"slideclosed"}
            transition={ease_(delaysequence[1], 0.8)}
            variants={variants}
            className=""
          >
            {features[activecard].description}
          </motion.p>
          <div className="flex flex-row gap-3 items-center flex-wrap mt-6">
            {features[activecard].functions.map((itm, index) => (
              <>
                <motion.label
                  initial={"open"}
                  animate={"closed"}
                  transition={ease_(delaysequence[2] + 0.1 * index, 0.3)}
                  variants={variants}
                  htmlFor=""
                  className="flex flex-row gap-1 items-center text-zinc-400"
                >
                  <CheckCircle size={28} weight="bold" className="" />
                  <span>{itm.charAt(0).toUpperCase() + itm.slice(1)}</span>
                </motion.label>
                {index !== features[activecard].functions.length - 1 && (
                  <motion.div
                    initial={"open"}
                    animate={"closed"}
                    transition={ease_(delaysequence[2] + 0.1 * index, 0.3)}
                    variants={variants}
                    className="w-[2px] h-[20px] bg-zinc-500"
                  ></motion.div>
                )}
              </>
            ))}
          </div>
        </div>
        <div className=" w-full relative rounded min-h-[400px] flex justify-center items-center overflow-hidden">
          {/* <CldVideoPlayer
            src="https://res.cloudinary.com/ds2kpgq2e/video/upload/v1715462991/Fiverr%20Mate%20Features%20Videos/0512_1_ayipge.mp4"
            width={700}
            height={200}
            muted={true}
            autoplay={true}
            preload="auto"
            controls={false}
            onEnded={() => {
              console.log("hi");
              let active_ = activecard + 1;
              if (active_ === features.length) {
                active_ = 0;
              }
              setactivecard(active_);
            }}
          /> */}

          <Image
            className="gradient-background"
            src={features[activecard].img}
            alt={features[activecard].title.replaceAll(" ", "-")}
            layout="fill"
            objectFit="contain"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}

export default FeatureContainer;
