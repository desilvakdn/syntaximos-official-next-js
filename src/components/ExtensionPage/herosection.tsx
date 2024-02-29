"use client";
import { BackgroundBeams } from "@/ui/BackgroundBeams";
import {
  Download,
  DownloadSimple,
  Star,
  StarHalf,
  User,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

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
}

function HeroExtensionSection({ data }: { data: Extension }) {
  const { push } = useRouter();
  let rating = data.rating;
  return (
    <div className="relative w-full min-h-[30vw]">
      <div className="absolute z-[2] top-0 bottom-0 left-0 right-0 flex flex-row gap-2 justify-between items-center w-full min-h-[30vw]">
        <motion.div layout className="flex flex-col gap-1 flex-grow">
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
              className="text-[50px] m-0 p-0"
            >
              {data.title}
            </motion.h1>
            <motion.h3
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "backInOut" }}
              className="m-0 p-0 text-synblue"
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
            className="max-w-[700px] opacity-55"
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
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 1, ease: "backInOut" }}
              className="bg-amber-200 text-amber-900 p-2 px-4 rounded hover:bg-amber-300 hover:text-amber-950"
              onClick={() => push(`/extensions/pricing/${data.identifier}`)}
            >
              Get Premium
            </motion.button>
          </div>
        </motion.div>
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "backInOut" }}
          className="flex flex-grow "
        >
          <Image
            className="floating"
            src={data.heroimg}
            alt={`${data.title}_workflow`}
            width={800}
            height={400}
            quality={100}
            loading="lazy"
          />
        </motion.div>
      </div>
      <BackgroundBeams className="opacity-55" />
    </div>
  );
}

export default HeroExtensionSection;
