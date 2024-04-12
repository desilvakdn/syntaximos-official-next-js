"use client";
import React, { useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
}

function AnimationProvider({ children, width = "100%" }: Props) {
  const ref = React.useRef(null);
  const isinView = useInView(ref, { once: true });
  useEffect(() => {
    if (isinView) {
    } else {
    }
  }, [isinView]);
  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 1,
          delay: 0.25,
          ease: "backInOut",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default AnimationProvider;
