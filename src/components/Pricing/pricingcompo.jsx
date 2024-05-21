"use client";
import { CheckSquare, XSquare } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";
import PageLoader from "@/components/Loader/page";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useGlobalPopup } from "../SingleWrappers/MessageWrapper";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import Config from "@/resources/config";
import fetchGet from "@/modules/fetchGet";
import fetchPost from "@/modules/fetchPost";
import VerifyLogin from "@/utils/verifylogin";
import { motion } from "framer-motion";
import { IconRocket } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";
import Tooltip from "../SingleWrappers/Tooltip";

function PricingSection({ extid }) {
  const [session, setsession] = useState(null);
  const [pgperiod, setpgPeriod] = useState(0);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const { openpopup } = useGlobalPopup();
  const [isloading, setisloading] = useState(false);
  const [selected, setselected] = useState("");

  useEffect(() => {
    const session = VerifyLogin();
    setsession(session);
  }, []);

  /* const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(""); */

  /* useEffect(() => {
    fetch("http://localhost:8000/stripe/config")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setStripePromise(loadStripe(data.publish));
        }
      });
  }, []); */

  useEffect(() => {
    fetchGet(`web/pricing/${extid}`, true).then((data) => {
      setLoading(false);
      if (data.status) {
        setData(data.data);
      }
    });
  }, [extid]);

  async function purchase(identifier) {
    if (isloading) return;

    if (!session) {
      openpopup("You need to login to subscribe", false);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      push("/member/login");

      return;
    }

    setselected(identifier);

    setisloading(true);
    if (identifier) {
      fetchPost(
        "stripe/initpayment",
        { extid: extid, packageid: identifier },
        true
      ).then((data) => {
        setisloading(false);
        if (data.status) {
          window.open(data.execute_url, "_blank");
        } else {
          openpopup(data.response, false);
        }
      });
    } else {
      setisloading(false);
      push("/member/dashboard/extensions");
    }
  }

  return (
    <>
      {loading ? (
        <>
          <PageLoader />
        </>
      ) : Object.keys(data).length === 0 ? (
        <>
          <div className="flex flex-col gap-2 items-center justify-center bg-zinc-900 rounded mb-10 pb-20 flex-grow">
            <div className="text-center">
              <h3>Oops! Something went wrong</h3>
              <h1 className="text-synblue">404</h1>
              <label htmlFor="">
                We couldn&apos;t find the page you were looking for
              </label>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full flex flex-col gap-2 items-center justify-center bg-zinc-900 rounded mb-10  pb-20">
          <div className="text-center">
            <h3>{data.metadata[0]}</h3>
            <h1 className="text-synblue">{data.metadata[1]}</h1>
            <label htmlFor="">{data.metadata[2]}</label>
          </div>
          <div className="relative flex flex-row gap-2 justify-center items-center border-[2px] border-dashed border-zinc-700 drop-shadow-md text-synblack p-1 rounded mt-4 mx-2">
            {data.periods.map((item, index) => {
              return (
                <label
                  key={index}
                  htmlFor=""
                  className={`relative rounded  py-3 px-10 md:px-24 cursor-pointer font-bold hover:bg-synblue-600   transition-all duration-300 ease-in-out ${
                    pgperiod === index
                      ? "bg-synblue text-synwhite hover:bg-blue-600"
                      : "bg-zinc-700 text-zinc-500"
                  }`}
                  onClick={() => !isloading && setpgPeriod(index)}
                >
                  {data.discounts[index] !== 0 && (
                    <span className=" bg-amber-300 rounded p-[3px] px-3 font-semibold text-amber-950 absolute right-[-10px] top-[-10px] text-[12px]">
                      {`${data.discounts[index]}% Off`}
                    </span>
                  )}
                  {item}
                </label>
              );
            })}
          </div>
          <div className="flex flex-row gap-3 flex-wrap mt-10 w-full justify-center ">
            {data.packages.map((item, index) => {
              return (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 * index,
                    ease: "backInOut",
                  }}
                  key={index}
                  className={`w-[460px] border-2 border-solid relative flex-grow md:flex-grow-0  flex flex-col ${
                    item.popular
                      ? "border-blue-400 bg-gradient-to-tr from-blue-800 to-blue-600"
                      : "border-zinc-600"
                  } rounded p-4`}
                >
                  {item.popular && (
                    <span className="absolute bg-synwhite text-synblack top-[-10px] left-0 px-3 rounded translate-x-1/2 translate-y-0">
                      Most Popular
                    </span>
                  )}
                  <div className="flex justify-between">
                    <h2 className="m-0 p-0">{item.name}</h2>
                    {item.popular && (
                      <span class="relative flex h-4 w-4 justify-center items-center">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-200 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-500 drop-shadow"></span>
                      </span>
                    )}
                  </div>
                  <h4 className="m-0 p-0 font-normal mb-4">{item.tagline}</h4>
                  <label htmlFor="" className="block">
                    <span>$ </span>
                    <span className="text-5xl ">
                      {item.pricing[pgperiod].value.toFixed(2)}
                    </span>
                  </label>
                  <h4 className="mt-4">{item.additional}</h4>
                  {item.pricing[pgperiod].value === 0 && data.subscribed ? (
                    <button className="w-full mt-4 h-[60px] mb-9 bg-zinc-700 text-zinc-500 hover:bg-zinc-700 hover:text-zinc-500 cursor-default">
                      Subscribed
                    </button>
                  ) : data.premium &&
                    data.planid === item.pricing[pgperiod].identifier ? (
                    <button className="w-full mt-4 h-[60px] mb-9 bg-zinc-700 text-zinc-500 hover:bg-zinc-700 hover:text-zinc-500 cursor-default">
                      Subscribed
                    </button>
                  ) : (
                    <div className="mt-4 mb-9">
                      <Tooltip
                        text={item.popular ? "Go Ahead! Unlock the Best!" : ""}
                      >
                        <button
                          onClick={() =>
                            purchase(item.pricing[pgperiod].identifier)
                          }
                          className={twMerge(
                            "w-full  h-[60px] hover:scale-[1.02] flex flex-row gap-2 items-center justify-center",
                            item.popular &&
                              "hover:bg-gradient-to-tr hover:from-blue-500 hover:to-blue-400 hover:text-white"
                          )}
                        >
                          {isloading &&
                          item.pricing[pgperiod].identifier === selected ? (
                            <>
                              Processing{" "}
                              <LoadingDots width={22} fill="var(--synblack)" />
                            </>
                          ) : (
                            <>
                              <span>Subscribe Now</span>
                              {item.popular && (
                                <span>
                                  <IconRocket size={25} />
                                </span>
                              )}
                            </>
                          )}
                        </button>
                      </Tooltip>
                    </div>
                  )}
                  <label htmlFor="">
                    {item.limited
                      ? "Comes With Limited Features"
                      : "Comes With All Features Unlocked"}
                  </label>
                  <div className="flex flex-col mt-5 gap-3">
                    {data.features.map((feature, index) => {
                      return (
                        <label
                          key={index}
                          htmlFor=""
                          className={`flex flex-row gap-2 ${
                            !feature.access.includes(item.identifier)
                              ? "opacity-50"
                              : ""
                          }`}
                        >
                          <span>
                            {feature.access.includes(item.identifier) ? (
                              <CheckSquare size={22} weight="fill" />
                            ) : (
                              <XSquare size={22} weight="fill" />
                            )}
                          </span>
                          <span>{feature.name}</span>
                          {feature.limited.includes(item.identifier) && (
                            <span className="bg-amber-200 text-amber-900 rounded p-[1px] h-fit">
                              Limited
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.2 * data.packages.length,
                ease: "backInOut",
              }}
              className="flex flex-row gap-2 "
            >
              <div
                className={`w-[460px] border-2 border-solid relative flex-grow h-[100%] flex flex-col border-zinc-600  rounded p-4`}
              >
                <h2 className="m-0 p-0">For Teams</h2>
                <h4 className="m-0 p-0 font-normal mb-4">
                  For teams who want to succeed together
                </h4>
                <h4 className="m-0 p-0 font-normal mb-4 opacity-50">
                  For inquiries to get access to our team subscription, contact
                  sales team. Our team subscription requires a minimum of five
                  members for enrollment.
                </h4>
                {/* <label htmlFor="" className="block">
                <span>$ </span>
                <span className="text-5xl ">
                  {item.pricing[pgperiod].value.toFixed(2)}
                </span>
              </label>
              <h4 className="mt-4">{item.additional}</h4> */}
                <div className="mt-4 mb-9">
                  <Tooltip text={"Go Ahead! Unlock the Best With Your Team!"}>
                    <button
                      onClick={() => push(`/sales/${extid}`)}
                      className="w-full  h-[60px]  hover:scale-[1.02] flex flex-row gap-2 items-center justify-center"
                    >
                      Contact Sales
                    </button>
                  </Tooltip>
                </div>
                <label htmlFor="">Comes With All Features Unlocked</label>
                <div className="flex flex-col mt-5 gap-3">
                  <label htmlFor="" className={`flex flex-row gap-2 `}>
                    <span>
                      <CheckSquare size={22} weight="fill" />
                    </span>
                    <span>All Pro Features</span>
                  </label>
                  <label htmlFor="" className={`flex flex-row gap-2 `}>
                    <span>
                      <CheckSquare size={22} weight="fill" />
                    </span>
                    <span>Priority Support</span>
                  </label>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}

export default PricingSection;
