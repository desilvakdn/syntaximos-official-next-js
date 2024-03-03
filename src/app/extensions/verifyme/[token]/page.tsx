"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import { CheckCircle, CheckFat, X } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Config from "@/resources/config";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";
import { setCookie } from "cookies-next";

function VerifyMe({ params }: { params: { token: string } }) {
  const [inputvalue, setinputvalue] = useState("");
  const [isverifying, setisverifying] = useState(false);
  const [clickedverifyme, setclickedverifyme] = useState(false);
  const [verified, setverified] = useState(false);
  const [isinit, setisinit] = useState(true);
  const [isvalidext, setisvalidext] = useState(false);
  const [extname, setextname] = useState("");

  const { openpopup } = useGlobalPopup();
  useEffect(() => {
    fetch(`${Config().api}/web/extensions/${params.token}`)
      .then((e) => e.json())
      .then((data) => {
        if (data.status) {
          setisinit(false);
          setisvalidext(true);
          setextname(data.extension);
        } else {
          setisinit(false);
          setisvalidext(false);
        }
      });
  }, []);

  function submitkey() {
    setclickedverifyme(true);
    if (!inputvalue) return;
    if (isverifying) return;

    setisverifying(true);

    fetch(`${Config().api}/dashboard/extension/verifykey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: inputvalue,
        extid: params.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setisverifying(false);
        if (data.status) {
          setCookie(`syn_${data.eid}_uid`, data.publickey);
          setverified(true);
        } else {
          openpopup("Invalid Key Provided. Please Check And Try Again", false);
          setverified(false);
        }
      });
  }

  return (
    <div className="bg-zinc-900 flex-grow mb-3 flex flex-col items-center justify-center min-h-[600px] overflow-hidden">
      {isinit ? (
        <>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span>Checking</span>
            <span>
              <LoadingDots width={25} fill="var(--synwhite)" />
            </span>
          </div>
        </>
      ) : isvalidext ? (
        <div className="flex flex-col items-center">
          <motion.label
            initial={{ y: 800, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: "backInOut" }}
            htmlFor=""
            className="bg-synblue px-5 py-1 rounded"
          >
            {extname}
          </motion.label>
          <motion.h1
            initial={{ y: 800, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "backInOut" }}
            className="p-0 m-0"
          >
            Extension Verification
          </motion.h1>
          <motion.label
            initial={{ y: 800, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "backInOut" }}
            htmlFor=""
          >
            {verified
              ? "You're almost done. Click on the extension icon to check"
              : "You can verify the extension using the login key"}
          </motion.label>
          {verified ? (
            <>
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0, ease: "backInOut" }}
                className="flex flex-row gap-5 items-center mt-6 bg-zinc-800 w-full py-4 justify-center rounded"
              >
                <label htmlFor="" className="text-lime-600">
                  <CheckFat size={82} weight="fill" />
                </label>
                <label htmlFor="" className="text-3xl">
                  Verified
                </label>
              </motion.div>
            </>
          ) : (
            <>
              <motion.input
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: "backInOut" }}
                type="text"
                name=""
                id=""
                value={inputvalue}
                onChange={(e) => setinputvalue(e.target.value)}
                placeholder="Paste Login Key Here"
                className={`mt-3 ${
                  clickedverifyme && !inputvalue
                    ? "border-2 border-solid border-red-500"
                    : ""
                }`}
              />
              <motion.button
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: "backInOut" }}
                onClick={submitkey}
                className={`mt-3 w-full  flex flex-row gap-2 justify-center items-center ${
                  isverifying
                    ? "bg-zinc-700 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-400 cursor-default"
                    : "bg-synblue hover:bg-synwhite hover:text-synblack"
                }`}
              >
                {isverifying ? (
                  <>
                    <span>Verifying</span>
                    <span>
                      <LoadingDots width={22} fill="var(--synblack)" />
                    </span>
                  </>
                ) : (
                  "Verify Me"
                )}
              </motion.button>
              <motion.label
                initial={{ y: 800, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "backInOut" }}
                htmlFor=""
                className="mt-5 hover:underline transition-all cursor-pointer hover:opacity-70"
              >
                How To Get My Login Key?
              </motion.label>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-row gap-2 items-center justify-center">
          <span>
            <X size={40} weight="bold" />
          </span>
          <span className="text-xl">Not A Valid Extension</span>
        </div>
      )}
    </div>
  );
}

export default VerifyMe;
