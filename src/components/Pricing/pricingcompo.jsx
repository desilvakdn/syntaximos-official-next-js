"use client";
import { CheckSquare, XSquare } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";
import PageLoader from "@/components/Loader/page";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useGlobalPopup } from "../SingleWrappers/MessageWrapper";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import Config from "@/resources/config";

function PricingSection({ extid }) {
  const [pgperiod, setpgPeriod] = useState(0);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const { openpopup } = useGlobalPopup();
  const [isloading, setisloading] = useState(false);
  const [selected, setselected] = useState("");

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
    const accesstoken = getCookie("syn_a");
    fetch(`${Config().api}/web/pricing/${extid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken ? accesstoken : ""}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.status) {
          setData(data.data);
        }
      });
  }, [extid]);

  function purchase(identifier) {
    if (isloading) return;
    const acc_token = getCookie("syn_a");
    const ref_token = getCookie("syn_r");

    if (!acc_token || !ref_token) {
      openpopup("You need to login to subscribe", false);
      setTimeout(() => {
        push("/member/login");
      }, 1500);
    }

    setselected(identifier);

    setisloading(true);
    if (identifier) {
      fetch(`${Config().api}/stripe/initpayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${acc_token}`,
        },
        body: JSON.stringify({ extid: extid, packageid: identifier }),
      })
        .then((res) => res.json())
        .then((data) => {
          setisloading(false);
          if (data.refresh) {
            openpopup("Your session has expired. Refreshing...", false);
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else if (data.status) {
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
        <div className="flex flex-col gap-2 items-center justify-center bg-zinc-900 rounded mb-10  pb-20">
          <div className="text-center">
            <h3>{data.metadata[0]}</h3>
            <h1 className="text-synblue">{data.metadata[1]}</h1>
            <label htmlFor="">{data.metadata[2]}</label>
          </div>
          <div className="flex flex-row gap-2 justify-center items-center bg-neutral-100 text-synblack p-1 rounded mt-4 mx-2">
            {data.periods.map((item, index) => {
              return (
                <label
                  key={index}
                  htmlFor=""
                  className={`relative rounded  py-3 px-10 md:px-24 cursor-pointer font-bold hover:bg-synblue-600   transition-all duration-300 ease-in-out ${
                    pgperiod === index
                      ? "bg-synblue text-synwhite"
                      : "bg-zinc-300 hover:bg-zinc-600 hover:text-synwhite"
                  }`}
                  onClick={() => !isloading && setpgPeriod(index)}
                >
                  {data.discounts[index] !== 0 && (
                    <span className="bg-syngold rounded p-[3px] text-synblack absolute right-1 top-1 text-[10px]">
                      {`${data.discounts[index]}% Off`}
                    </span>
                  )}
                  {item}
                </label>
              );
            })}
          </div>
          <div className="mt-10 flex flex-row gap-2 flex-wrap justify-center items-start">
            {data.packages.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`w-[460px] border-2 border-solid relative flex-grow h-[100%] flex flex-col ${
                    item.popular
                      ? "border-synblue bg-blue-800"
                      : "border-zinc-600"
                  } rounded p-4`}
                >
                  {item.popular && (
                    <span className="absolute bg-synwhite text-synblack top-[-10px] left-0 px-3 rounded translate-x-1/2 translate-y-0">
                      Most Popular
                    </span>
                  )}
                  <h2 className="m-0 p-0">{item.name}</h2>
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
                    <button
                      onClick={() =>
                        purchase(item.pricing[pgperiod].identifier)
                      }
                      className="w-full mt-4 h-[60px] mb-9 hover:scale-[1.02] flex flex-row gap-2 items-center justify-center"
                    >
                      {isloading &&
                      item.pricing[pgperiod].identifier === selected ? (
                        <>
                          Processing{" "}
                          <LoadingDots width={22} fill="var(--synblack)" />
                        </>
                      ) : (
                        "Subscribe Now"
                      )}
                    </button>
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
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default PricingSection;
