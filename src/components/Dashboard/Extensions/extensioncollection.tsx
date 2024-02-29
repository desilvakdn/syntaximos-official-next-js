"use client";
import Products from "@/components/Home/Products/page";
import React from "react";
import { motion } from "framer-motion";

function ExtensionCollection({
  extdetailsdata,
}: {
  extdetailsdata: { data: any[] };
}) {
  return (
    <div className="bg-zinc-900 flex-grow mb-3 flex flex-col items-center overflow-hidden">
      <div className="mt-[100px] text-center">
        <motion.h1
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: "backInOut" }}
          className="m-0  p-0"
        >
          Browser Extension Collection
        </motion.h1>
        <motion.h4
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 20, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "backInOut" }}
          className="opacity-45 font-medium px-[20px]"
        >
          You Can Try Them Free Forever But Need To Be A Member Of Syntaximos
        </motion.h4>
      </div>
      <div className="m-10 mt-20 mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div></div>
        {extdetailsdata.data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.3 + 0.1 * index,
              ease: "backInOut",
            }}
          >
            <Products key={index} data={item} />
          </motion.div>
        ))}
        <div></div>
        {/* {mainfeatures.map((feature, index) => {
  return (
    <div className="transition-all cursor-pointer py-4 px-6 flex flex-col justify-center items-center max-w-96 bg-synwhite text-synblack rounded hover:bg-synblue hover:text-synwhite">
      <div className="p-0 w-full flex flex-row justify-start items-center gap-4">
        {feature.icon}
        <h3>{feature.title}</h3>
      </div>
      <p className="p-0 m-0 text-left">{feature.description}</p>
    </div>
  );
})} */}
      </div>
    </div>
  );
}

export default ExtensionCollection;
