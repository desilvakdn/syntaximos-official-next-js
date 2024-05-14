"use client";
import React, { useEffect, useRef, useState } from "react";
import Countable from "./growthstats/counting";
import { motion, useInView } from "framer-motion";

interface GrowthStats {
  name: string;
  value: number;
  suffix: string;
}

function GrowthStats({ growth_stats }: { growth_stats: GrowthStats[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });
  const [active, setactive] = useState(-1);

  useEffect(() => {
    const r = setInterval(() => {
      let active_ = active + 1;
      if (active_ >= growth_stats.length) {
        active_ = 0;
      }
      setactive(active_);
    }, 3000);
    return () => clearInterval(r);
  }, [active]);

  return (
    <div className="flex flex-col gap-2  w-full min-h-[25vw] items-center justify-center my-10">
      <h1 className="text-4xl">It&apos;s Not A Fake</h1>
      <label htmlFor="" className="opacity-55 max-w-[1100px] text-center">
        Over the past several years, we have been able to build up our trusted
        score to what we have now with the help of our valuable community
      </label>
      <div ref={ref}>
        {isInView && (
          <div className="flex flex-row gap-2 flex-wrap mt-10 justify-center items-center">
            {growth_stats.map((itm, index) => (
              <Countable
                key={index}
                active={active === index}
                delay={0.2 * index}
                title={itm.name}
                count={itm.value}
                suffix={itm.suffix}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GrowthStats;
