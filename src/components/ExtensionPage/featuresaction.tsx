"use client";
import React, { useEffect } from "react";
import SingleFeatureSection from "./singlefeaturesection";
import { AnimatePresence, motion } from "framer-motion";

function FeaturesAction({
  features,
  extension,
}: {
  features: any[];
  extension: string;
}) {
  const [isviewall, setisviewall] = React.useState(false);
  const [featuresshuffled, setfeaturesshuffled] = React.useState([] as any[]);

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    let g = shuffleArray(features as any[]);
    setfeaturesshuffled(g as any[]);
  }, []);

  return (
    <>
      <AnimatePresence mode="popLayout">
        {isviewall ? (
          <div className="w-full flex flex-row flex-wrap gap-4 mt-7 justify-center items-center">
            {featuresshuffled.map((feature, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0 + 0.1 * index,
                    ease: "backInOut",
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <SingleFeatureSection
                    key={index}
                    data={feature}
                    extensionname={extension}
                  />
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="w-full flex flex-row flex-wrap gap-4 mt-7 justify-center items-center">
            {featuresshuffled.slice(0, 4).map((feature, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.5 + 0.1 * index,
                    ease: "backInOut",
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <SingleFeatureSection
                    key={index}
                    data={feature}
                    extensionname={extension}
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
      <motion.div
        layout
        className="w-full flex justify-center items-center mt-10"
      >
        <button className="w-fit" onClick={() => setisviewall(!isviewall)}>
          {isviewall ? "View Less Features" : "View All Features"}
        </button>
      </motion.div>
    </>
  );
}

export default FeaturesAction;
