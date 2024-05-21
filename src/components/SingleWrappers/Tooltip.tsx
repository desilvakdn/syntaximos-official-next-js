import useWindowDimensions from "@/Hooks/useWindowDimensions";
import { AnimatePresence, motion } from "framer-motion";
import React, { FC, ReactNode, useEffect, useRef, useState } from "react";

interface Tooltip {
  children: ReactNode;
  text?: string;
}

const Tooltip: FC<Tooltip> = ({ children, text }): JSX.Element => {
  const toolTipRef = useRef<HTMLSpanElement>(null);
  const divContainer = useRef<HTMLDivElement>(null);
  const [ishovered, sethovered] = useState(false);
  const [tooltipvisible, settooltipvisible] = useState(true);
  const { height, width } = useWindowDimensions();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (ishovered) {
      settooltipvisible(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        sethovered(false);
        settooltipvisible(false);
      }, 3000);
    } else {
      settooltipvisible(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [ishovered]);

  return (
    <div
      ref={divContainer}
      onMouseMove={({ clientX, clientY }) => {
        if (!toolTipRef.current || !divContainer) return;
        const x = divContainer.current?.getBoundingClientRect();
        const xtip = toolTipRef.current?.getBoundingClientRect();
        const isoverflow = clientX + xtip.width + 30 > width;
        const safety_ = x?.left ? x?.left : 0;
        const safetytop_ = x?.top ? x?.top : 0;
        if (isoverflow) {
          toolTipRef.current.style.left = clientX - safety_ - xtip.width + "px";
        } else {
          toolTipRef.current.style.left = clientX - safety_ + "px";
        }
        toolTipRef.current.style.top = clientY - safetytop_ + "px";
      }}
      onMouseEnter={() => {
        sethovered(true);
        settooltipvisible(true);
      }}
      onMouseLeave={() => {
        sethovered(false);
        settooltipvisible(false);
      }}
      className="group relative"
    >
      {children}

      {text && tooltipvisible && ishovered && width > 800 && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, ease: "easeInOut", duration: 0.3 }}
          ref={toolTipRef}
          className="absolute z-[100] transition mt-4 bg-white text-black px-3 py-1 whitespace-nowrap w-fit rounded drop-shadow"
        >
          {text}
        </motion.span>
      )}
    </div>
  );
};

export default Tooltip;
