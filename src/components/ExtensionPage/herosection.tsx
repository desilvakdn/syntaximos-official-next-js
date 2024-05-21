"use client";
import { BackgroundBeams } from "@/ui/BackgroundBeams";
import {
  DownloadSimple,
  Pause,
  Star,
  StarHalf,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import "./css/hero_section.css";
import { Play } from "@phosphor-icons/react";
import Link from "next/link";

interface Extension {
  rating: number;
  title: string;
  tagline: string;
  version: string;
  description: string;
  users: number;
  compatible: string[];
  link: string;
  heroimg: string;
  identifier: string;
  videos: {
    featured: string;
  };
}

function HeroExtensionSection({ data }: { data: Extension }) {
  const { push } = useRouter();
  let rating = data.rating;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [launchvideo, setlaunchvideo] = useState(false);
  const [isplay, setisplay] = useState(true);
  const [iswallvisible, setiswallvisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setlaunchvideo(true);
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  function playvideo() {
    if (videoRef.current) {
      videoRef.current.play();
      setisplay(true);
    }
  }
  function pausevideo() {
    if (videoRef.current) {
      videoRef.current.pause();
      setisplay(false);
    }
  }

  return (
    <div className="relative w-full  p-2 py-12 pb-20 flex justify-center items-center overflow-hidden min-h-[700px]">
      <motion.div
        initial={{ left: -6000, opacity: 0 }}
        animate={{ left: -1900, opacity: 1 }}
        transition={{ duration: 2, ease: "backInOut" }}
        className="bg-zinc-800 bg-opacity-30 w-[3000px] h-[3000px] absolute rounded-full"
      ></motion.div>
      <div className="relative z-[2] flex flex-col xl:flex-row gap-5 justify-between items-center w-full max-w-[1700px]">
        <motion.div layout className="flex flex-col gap-1 flex-grow w-full">
          <motion.label
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: "backInOut" }}
            htmlFor=""
          >
            Syntaximos
          </motion.label>
          <div className="relative w-fit">
            <motion.h1
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "backInOut" }}
              className="text-[35px] sm:text-[50px] m-0 p-0 transition-all"
            >
              {data.title}
            </motion.h1>
            <motion.h3
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "backInOut" }}
              className="m-0 p-0 text-synblue text-base sm:text-lg transition-all"
            >
              {data.tagline}
            </motion.h3>
            <motion.label
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "backInOut" }}
              htmlFor=""
              className="absolute top-[-15px] right-[10px] text-[12px] bg-synblue py-1 px-3 rounded"
            >
              {data.version}
            </motion.label>
          </div>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "backInOut" }}
            className="max-w-[700px] opacity-55 text-justify pr-10"
          >
            {data.description}
          </motion.p>
          <div className="mt-5 mb-5 w-full flex flex-row gap-10">
            <motion.label
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5, ease: "backInOut" }}
              htmlFor=""
              className="flex flex-row gap-0"
            >
              {[...Array(Math.floor(rating))].map((item, index) => (
                <Star size={21} weight="fill" key={index} />
              ))}
              {rating % 1 !== 0 && <StarHalf size={21} weight="fill" />}
              {[...Array(5 - Math.ceil(rating))].map((item, index) => (
                <Star size={21} weight="bold" key={index} />
              ))}
              <span className="ml-4">{data.rating}</span>
            </motion.label>
            <motion.label
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6, ease: "backInOut" }}
              htmlFor=""
            >
              |
            </motion.label>
            <motion.label
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7, ease: "backInOut" }}
              htmlFor=""
              className="flex flex-row gap-2"
            >
              <DownloadSimple size={21} weight="fill" />
              <span>{`${data.users}+`}</span>
            </motion.label>
          </div>
          <div className="mt-5 mb-7 flex flex-row gap-1 items-center">
            <motion.label
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: "backInOut" }}
              htmlFor=""
              className="opacity-55"
            >
              Compatible With :
            </motion.label>
            <div className="flex flex-row gap-1 ml-3">
              {data.compatible.map((item, index) => {
                return (
                  <motion.label
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.9 + 0.1 * index,
                      ease: "backInOut",
                    }}
                    htmlFor=""
                  >
                    <Image
                      src={`/browser_icons/${item}.png`}
                      alt={`${item}_logo`}
                      width={40}
                      height={40}
                      key={index}
                    />
                  </motion.label>
                );
              })}
            </div>
          </div>
          <div className="flex flex-row gap-2 mt-4 h-[50px]">
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.9, ease: "backInOut" }}
              className="bg-synblue text-synwhite p-2 px-4 rounded hover:bg-blue-800"
              onClick={() => window.open(data.link, "_blank")}
            >
              Install Now
            </motion.button>
            <Link href={"#pricingsectionmiddle"}>
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 1, ease: "backInOut" }}
                className="bg-amber-200 h-full text-amber-900 p-2 px-4 rounded hover:bg-amber-300 hover:text-amber-950"
              >
                Get Premium
              </motion.button>
            </Link>
          </div>
        </motion.div>
        {launchvideo && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "backInOut" }}
            className="hidden sm:flex pt-10 lg:pt-0 flex-grow w-full justify-center relative drop-shadow-md"
          >
            <div
              onMouseOver={() => setiswallvisible(true)}
              onMouseLeave={() => setiswallvisible(false)}
              className="floating p-2 border-[2px] border-dashed border-zinc-500 rounded-md relative"
            >
              {iswallvisible && (
                <AnimatePresence>
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "backInOut" }}
                    onClick={() => (isplay ? pausevideo() : playvideo())}
                    className="absolute top-0 left-0 bottom-0 right-0 bg-zinc-900 bg-opacity-90 flex justify-center items-center hover:cursor-pointer z-[1]"
                  >
                    {!isplay && (
                      <Play size={32} weight="bold" className="text-zinc-200" />
                    )}
                    {isplay && (
                      <Pause
                        size={32}
                        weight="bold"
                        className="text-zinc-200"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
              <video
                ref={videoRef}
                className=" rounded-md"
                width="100%"
                height="200"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
              >
                <source src={data.videos.featured} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
            {/* <CldVideoPlayer
            src="/Extensions/fiverrmate/fiverr_mate_promo.mp4"
            width={700}
            height={200}
            muted={true}
            autoplay={true}
            loop={true}
            preload="auto"
            controls={false}
          /> */}
          </motion.div>
        )}
        {/* <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "backInOut" }}
          className="flex-grow w-full flex justify-center"
        >
          <Image
            className="floating ml-0  mt-2 "
            src={data.heroimg}
            alt={`${data.title}_workflow`}
            width={800}
            height={600}
            quality={100}
            loading="lazy"
          />
        </motion.div> */}
      </div>
      <BackgroundBeams className="opacity-55" />
    </div>
  );
}

export default HeroExtensionSection;
