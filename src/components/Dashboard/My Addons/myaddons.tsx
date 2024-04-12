import LoadingDots from "@/components/Animations/LoadingDots/page";
import React, { useEffect, useState } from "react";
import SingleExtension from "../Extensions/singleextension";
import SingleAddon from "./singleaddon";
import CancelPremium from "./cancelpremium";
import { getCookie } from "cookies-next";
import Config from "@/resources/config";
import { Check, X } from "@phosphor-icons/react/dist/ssr";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";

interface Extension {
  icon: string;
  identifier: string;
  name: string;
  premium: boolean;
  tagline: string;
  description: string;
  version: string;
}

function Myaddons() {
  const { openpopup } = useGlobalPopup();
  const [cancelprop, setcancelprop] = useState({
    iscancel: false,
    identifier: "",
    name: "",
  });
  const [ext, setExt] = useState<Extension[]>([
    {
      icon: "",
      identifier: "",
      name: "",
      premium: false,
      tagline: "",
      description: "",
      version: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [requestkeypopup, setrequestkeypopup] = useState(false);
  const [activeextension, setactiveextension] = useState("");
  const [activeextensionid, setactiveextensionid] = useState("");
  const [secretkey, setsecretkey] = useState("");
  const [secretkeyloading, setsecretkeyloading] = useState(false);
  const [requestedkey, setrequestedkey] = useState(false);
  const [keyschecker, setkeyschecker] = useState(true);

  useEffect(() => {
    setLoading(true);
    let accesstoken = getCookie("syn_a");
    if (!accesstoken) {
      setLoading(false);
      return;
    }
    fetch(`${Config().api}/dashboard/myaddons`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.refresh) {
          window.location.reload();
        } else if (data.status) {
          setExt(data.data);
        }
        setLoading(false);
      });
  }, []);

  function requestkey() {
    if (secretkeyloading || requestedkey) return;
    setsecretkeyloading(true);

    let accesstoken = getCookie("syn_a");
    fetch(`${Config().api}/dashboard/key/${activeextensionid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setsecretkeyloading(false);
        if (data.refresh) {
          window.location.reload();
        } else if (data.status) {
          setsecretkey(data.key);
          setrequestedkey(true);
          setTimeout(() => {
            setrequestedkey(false);
            /* setsecretkey(
              `${Array(secretkey.length - 4)
                .fill("*")
                .join("")}${secretkey.slice(
                secretkey.length - 4,
                secretkey.length
              )}`
            ); */
          }, 30000);
        } else {
          openpopup("Something Went Wrong", false);
        }
      });
  }

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
      {requestkeypopup && (
        <div className="fixed bg-synblack bg-opacity-45 top-0 left-0 bottom-0 right-0 z-50">
          <div className="SlideInMiddle absolute z-50 bg-synwhite top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] max-w-[570px] rounded text-synblack p-5">
            <label
              htmlFor=""
              className="cursor-pointer absolute right-2 top-3"
              onClick={() => setrequestkeypopup(false)}
            >
              <X width={30} weight="bold" />
            </label>
            <h2 className="p-0 m-0 mb-3">Request Login Key</h2>
            <label>
              <span>Key Is Only Valid For : </span>
              <span className="bg-synblue px-1 py-1 rounded text-synwhite">
                {activeextension}
              </span>
            </label>
            <div className="w-[450px] mt-4">
              <label htmlFor="">
                Do not share the key with anyone else. Ensure that you only
                store the key for the extension and do not save it anywhere
                else.
              </label>
            </div>
            <div className="flex flex-col gap-2">
              {requestedkey && (
                <div className="mt-4 flex flex-row gap-2">
                  <label htmlFor="">
                    Request new key after 30 seconds later
                  </label>
                </div>
              )}
              {secretkey && (
                <label
                  htmlFor=""
                  className="bg-zinc-300 py-3 px-5 rounded mb-4 mt-4 overflow-x-scroll"
                >
                  {secretkey}
                </label>
              )}
              <div className="flex flex-row gap-2 items-center w-full mt-4">
                <button
                  className={`${
                    secretkeyloading || requestedkey || keyschecker
                      ? "bg-zinc-400 cursor-default hover:bg-zinc-400 hover:text-synblack"
                      : "bg-synblue cursor-pointer"
                  } flex-grow flex flex-row gap-2 items-center justify-center`}
                  onClick={requestkey}
                >
                  {keyschecker ? (
                    <>
                      <span>Loading</span>
                      <LoadingDots width={22} fill="var(--synblack)" />
                    </>
                  ) : requestedkey ? (
                    "Requested"
                  ) : secretkeyloading ? (
                    <>
                      <span>Requesting</span>
                      <span>
                        <LoadingDots width={22} fill="var(--synblack)" />
                      </span>
                    </>
                  ) : secretkey ? (
                    "Request New Key"
                  ) : (
                    "Request Key"
                  )}
                </button>
                {secretkeyloading ? (
                  <label
                    htmlFor=""
                    className="bg-zinc-300 text-zinc-600 py-[6px] px-5 rounded"
                  >
                    Copy Key
                  </label>
                ) : (
                  <label
                    htmlFor=""
                    className="border-2 border-solid border-synblack py-[6px] px-5 rounded cursor-pointer hover:bg-synblack hover:text-synwhite transition-all flex flex-row gap-2 justify-center items-center"
                    onClick={() => copyToClipboard(secretkey)}
                  >
                    {copied ? (
                      <>
                        <Check size={22} weight="bold" /> <span>Copied</span>
                      </>
                    ) : (
                      "Copy Key"
                    )}
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {cancelprop.iscancel ? (
        <CancelPremium
          identifier={cancelprop.identifier}
          name={cancelprop.name}
          back={() =>
            setcancelprop({
              iscancel: false,
              identifier: "",
              name: "",
            })
          }
        />
      ) : (
        <div className="p-8 flex flex-col flex-grow">
          <div>
            <h2>My Addons</h2>
            <label htmlFor="">
              You Can Manage Your Addons And Subscriptions
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
                  <SingleAddon
                    key={index}
                    item={item}
                    cancelsub={() =>
                      setcancelprop({
                        iscancel: true,
                        identifier: item.identifier,
                        name: item.name,
                      })
                    }
                    setrequestkeypopup={() => setrequestkeypopup(true)}
                    setactiveextension={setactiveextension}
                    setactiveextensionid={setactiveextensionid}
                    setkeyschecker={() => setkeyschecker(false)}
                    setsecretkey={setsecretkey}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Myaddons;
