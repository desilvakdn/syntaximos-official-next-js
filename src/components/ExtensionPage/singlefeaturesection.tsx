import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface Extension {
  img: string;
  title: string;
  description: string;
}

function SingleFeatureSection({
  data,
  extensionname,
}: {
  data: Extension;
  extensionname: string;
}) {
  return (
    <motion.div
      whileHover={"hover"}
      variants={{
        hover: {
          scale: 1.02,
          transition: {
            duration: 0.3,
          },
        },
      }}
      className="SlideIn0 overflow-hidden flex-grow relative  bg-zinc-800 flex flex-col gap-4 rounded-xl max-w-[400px] min-h-[370px]"
    >
      <div className="blackgradient absolute z-[1] top-0 bottom-0 left-0 right-0"></div>
      <motion.div
        variants={{
          hover: {
            scale: 1.08,
            transition: {
              duration: 0.3,
            },
          },
        }}
        className="bg-synwhite w-full flex-grow relative "
      >
        <Image
          src={data.img}
          width={800}
          height={500}
          alt={`${extensionname}_features`}
        />
      </motion.div>
      <div className="absolute z-[2] bottom-2 left-3">
        <div className="flex flex-row gap-2 items-center">
          <h3 className="bg-synblue px-3 rounded font-semibold">
            {data.title}
          </h3>
          {/*  <label
            htmlFor=""
            className="bg-synblue px-3 rounded hover:scale-[1.01] hover:bg-blue-500 transition-all cursor-pointer"
          >
            Learn More
          </label> */}
        </div>
        <label htmlFor="" className="font-normal">
          {data.description}
        </label>
      </div>
    </motion.div>
  );
}

export default SingleFeatureSection;
