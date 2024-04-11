import {
  EnvelopeSimple,
  EnvelopeSimpleOpen,
  X,
} from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingDots from "@/components/Animations/LoadingDots/page";

function NewMiniCompo({
  headline,
  content,
  date,
  markread,
  setmarkread,
  removemessage,
}: {
  headline: string;
  content: string;
  date: Date;
  markread: boolean;
  setmarkread: () => void;
  removemessage: () => Promise<void>;
}) {
  const [expand, setexpand] = useState(false);
  const [markread1, setmarkread1] = useState(false);
  const [isremoving, setisremoving] = useState(false);

  useEffect(() => {
    setmarkread1(markread);
  }, [markread]);

  return (
    <div
      onClick={() => setexpand((prev) => (prev ? false : true))}
      className={`bg-synwhite drop-shadow-md w-full rounded flex flex-col justify-center items-center p-2 py-4 ${
        !expand && "hover:bg-synblue"
      } transition-all`}
    >
      <div className="w-full text-synblack flex flex-row justify-between gap-1 items-center cursor-pointer">
        <div className="flex flex-row gap-1 items-center">
          <label
            htmlFor=""
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setmarkread();
              setmarkread1((prev) => (prev ? false : true));
            }}
          >
            {markread1 ? (
              <EnvelopeSimpleOpen size={32} weight="bold" />
            ) : (
              <EnvelopeSimple size={32} weight="bold" />
            )}
          </label>
          <h4 className="cursor-pointer flex flex-row gap-1 items-center mx-2">
            <span>{headline}</span>
            <span className="bg-synblue text-white text-sm font-normal rounded py-[0.4px] px-1">
              {new Date(date).toISOString().split("T")[0].replace(/-/g, ".")}
            </span>
          </h4>
        </div>
        <label
          htmlFor=""
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            removemessage().then((e) => {
              setisremoving(false);
            });
            setisremoving(true);
          }}
        >
          {isremoving ? (
            <LoadingDots width={16} fill="black" />
          ) : (
            <X size={18} weight="bold" />
          )}
        </label>
      </div>
      {expand && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: "backInOut",
          }}
          className="w-full text-synblack max-w-[800px] mt-4 min-h-[130px]"
        >
          <label htmlFor="" className="opacity-70">
            {content}
          </label>
        </motion.div>
      )}
    </div>
  );
}

export default NewMiniCompo;
