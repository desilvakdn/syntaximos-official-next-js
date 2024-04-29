"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import SingleExtension from "./singleextension";
import Image from "next/image";
import { Check, X } from "@phosphor-icons/react/dist/ssr";
import Config from "@/resources/config";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";
import fetchGet from "@/modules/fetchGet";
import VerifyLogin from "@/utils/verifylogin";

interface Extension {
  added: boolean;
  icon: string;
  identifier: string;
  name: string;
  premium: boolean;
  rating: number;
  tagline: string;
  users: number;
  description: string;
  version: string;
}

function ExtensionsDashboard() {
  const { openpopup } = useGlobalPopup();
  const [ext, setExt] = useState<Extension[]>([]);
  const [loading, setLoading] = useState(true);
  const [popupinstall, setPopupinstall] = useState(false);
  const [extlink, setExtlink] = useState("");
  const [copied, setCopied] = useState(false);

  const [requestkeypopup, setrequestkeypopup] = useState(false);
  const [activeextension, setactiveextension] = useState("");
  const [activeextensionid, setactiveextensionid] = useState("");
  const [secretkey, setsecretkey] = useState("");
  const [secretkeyloading, setsecretkeyloading] = useState(false);
  const [requestedkey, setrequestedkey] = useState(false);
  const [keyschecker, setkeyschecker] = useState(true);

  useEffect(() => {
    if (!VerifyLogin()) {
      setLoading(false);
      return;
    }
    fetchGet("dashboard/extensions", true).then((data) => {
      if (data.status) {
        setExt(data.data);
      }
      setLoading(false);
    });
  }, []);

  function copyToClipboard(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  }

  return (
    <>
      {popupinstall && (
        <div className="fixed bg-synblack bg-opacity-45 top-0 left-0 bottom-0 right-0 z-50">
          <div className="SlideInMiddle absolute z-50 bg-synwhite top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] min-w-[500px] rounded text-synblack p-5">
            <label
              htmlFor=""
              className="cursor-pointer absolute right-2 top-3"
              onClick={() => setPopupinstall(false)}
            >
              <X width={30} weight="bold" />
            </label>
            <h2>Install Extension</h2>
            <div className="w-[450px]">
              <label htmlFor="">
                Well, You added the extension. Now you need to install it in any
                browser compatible listed below
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-zinc-200 min-h-[80px] rounded mt-3 mb-3 p-3">
                <label htmlFor="">Compatible Browsers:</label>
                <div className="flex flex-row gap-2 mt-3">
                  <Image
                    src={"/browser_icons/chrome.png"}
                    width={60}
                    height={60}
                    alt="chrome"
                  />
                  <Image
                    src={"/browser_icons/brave.png"}
                    width={60}
                    height={60}
                    alt="chrome"
                  />
                  <Image
                    src={"/browser_icons/edge.png"}
                    width={60}
                    height={60}
                    alt="chrome"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center w-full">
                <button
                  className="bg-synblue flex-grow"
                  onClick={() => window.open(extlink, "_blank")}
                >
                  Install Now
                </button>
                <label
                  htmlFor=""
                  className="border-2 border-solid border-synblack py-[6px] px-5 rounded cursor-pointer hover:bg-synblack hover:text-synwhite transition-all flex flex-row gap-2 justify-center items-center"
                  onClick={() => copyToClipboard(extlink)}
                >
                  {copied ? (
                    <>
                      <Check size={22} weight="bold" /> <span>Copied</span>
                    </>
                  ) : (
                    "Copy Link"
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="p-8 flex flex-col flex-grow">
        <div>
          <h2>Extensions</h2>
          <label htmlFor="">
            To Use Extensions Add Extensions To Your Collection
          </label>
        </div>
        {loading ? (
          <div className="w-full flex-grow flex justify-center items-center">
            <LoadingDots width={30} fill="var(--synwhite)" />
          </div>
        ) : (
          <div className="mt-5">
            {ext.map((item, index) => {
              return (
                <SingleExtension
                  key={index}
                  item={item}
                  setpopupinstall={() => setPopupinstall(true)}
                  setexturl={setExtlink}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default ExtensionsDashboard;
