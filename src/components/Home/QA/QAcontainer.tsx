"use client";

import React, { useEffect, useState } from "react";
import QAHolder from "./QAHolder";
import { motion } from "framer-motion";

interface QADetails {
  status: boolean;
  data: any[]; // Change `any` to a more specific type if possible
}

function QAcontainer({ qacontainer }: { qacontainer: QADetails }) {
  const [selected, setselected] = useState(false);
  const [qa, setqa] = useState(qacontainer.data);

  useEffect(() => {
    if (!selected) {
      setqa(qacontainer.data.slice(0, 4));
    } else {
      setqa(qacontainer.data);
    }
  }, [selected, qacontainer.data]);

  return (
    <div className="mt-10 grid grid-cols-1 gap-3 w-full justify-center items-center">
      <div className="w-full flex justify-center flex-col gap-3 items-center">
        {qa.map((item, index) => (
          <QAHolder key={index} question={item.question} answer={item.answer} />
        ))}
        <div>
          {selected ? (
            <motion.button
              layout
              className="w-fit px-10"
              onClick={() => setselected(false)}
            >
              <label htmlFor="">View Less</label>
            </motion.button>
          ) : (
            <motion.button
              layout
              className="w-fit px-10"
              onClick={() => setselected(true)}
            >
              <label htmlFor="">View All</label>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QAcontainer;
