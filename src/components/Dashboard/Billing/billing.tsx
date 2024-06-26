"use client";
import { Money, PlusCircle, X } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";
import SinglePaymentCard from "./singlecard";
import { getCookie } from "cookies-next";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CardForm from "./cardform";
import Config from "@/resources/config";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";
import fetchPost from "@/modules/fetchPost";
import fetchGet from "@/modules/fetchGet";

function Billing() {
  const [pms, setPms] = useState([]);
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setclientSecret] = useState("");
  const [isfetchingbilling, setisfetchingbilling] = useState(false);
  const { openpopup } = useGlobalPopup();

  useEffect(() => {
    fetchGet("stripe/config", true).then((data) => {
      if (data.status) {
        setStripePromise(loadStripe(data.publish));
      }
    });
  }, []);

  useEffect(() => {
    fetchGet("stripe/addpm", true).then((data) => {
      if (data.status) {
        setclientSecret(data.clientsecret);
        //setintentid(data.id);
      }
    });
  }, []);

  const [props, setprops] = useState({
    isfetchingpms: true,
    addpmclicked: false,
  });
  const [addpmclicked, setaddpmclicked] = useState(false);

  useEffect(() => {
    fetchGet("stripe/getpm", true).then((data) => {
      if (data.status) {
        const arranged_: any[] = [];
        const primary_ = data.data.find((e: any) => e.primary);
        if (primary_) {
          arranged_.push(primary_);
        }

        data.data.forEach((e: any) => {
          if (!e.primary) {
            arranged_.push(e);
          }
        });

        setPms(arranged_ as never[]);
      }
      setprops({ ...props, isfetchingpms: false });
    });
  }, []);

  function managebillingaccount() {
    if (isfetchingbilling) return;

    setisfetchingbilling(true);

    fetchPost("stripe/managebilling", {}, true).then((data) => {
      setisfetchingbilling(false);
      if (data.nocustomer) {
        openpopup(
          "Sorry. You Don't Have A Billing Account. Purchase Premium Subscription",
          false
        );
      } else if (data.status) {
        window.open(data.url, "_blank");
      } else {
        openpopup("Something Went Wrong", false);
      }
    });
  }

  return (
    <>
      {addpmclicked && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-synblack z-50 flex items-center justify-center">
          <div className="bg-synwhite w-[600px] min-h-[300px] max-h-[500px] rounded text-synblack p-10 flex justify-center relative flex-col gap-3">
            <label
              htmlFor=""
              className="absolute right-3 top-3 opacity-50 hover:opacity-100 cursor-pointer"
              onClick={() => setaddpmclicked(false)}
            >
              <X size={22} weight="bold" />
            </label>
            <h2>Add Your Payment Method</h2>

            {!stripePromise || !clientSecret ? (
              <LoadingDots fill="var(--synblack)" width={22} />
            ) : (
              stripePromise &&
              clientSecret && (
                <Elements
                  stripe={stripePromise}
                  options={{ clientSecret: clientSecret }}
                >
                  <CardForm clientSecret={clientSecret} />
                </Elements>
              )
            )}
          </div>
        </div>
      )}
      <div className="p-8 flex flex-col flex-grow">
        <div>
          <h2>Billing</h2>
          <label htmlFor="">
            You can your billing details here. If you need any assistant please
            contact us{" "}
          </label>
        </div>
        <div className="mt-4">
          <h3>Manage Your Billing Account</h3>
          <button
            onClick={managebillingaccount}
            className="flex flex-row gap-2 items-center mt-6 mb-6 cursor-pointer py-3 px-5"
          >
            {isfetchingbilling ? (
              <>
                <LoadingDots width={22} fill="var(--synblack)" />
                Please Wait..
              </>
            ) : (
              <>
                <Money size={32} weight="bold" />
                Manage Billing Account
              </>
            )}
          </button>
        </div>
        <div className="mt-1">
          <h3>Your Payment Methods</h3>
          <button
            onClick={() => setaddpmclicked(true)}
            className="flex flex-row gap-2 items-center mt-6 mb-6 cursor-pointer"
          >
            <PlusCircle size={22} weight="bold" />
            Add Your Payment Method
          </button>
          {props.isfetchingpms ? (
            <div className="flex flex-row gap-2 items-center">
              <label htmlFor="">Loading Payment Methods</label>
              <LoadingDots fill="var(--synwhite)" width={22} />
            </div>
          ) : (
            <div className="SlideIn0 flex flex-row gap-2 flex-wrap">
              {pms.length > 0 ? (
                pms.map((pm, index) => (
                  <SinglePaymentCard key={index} data={pm} />
                ))
              ) : (
                <label className="text-zinc-700" htmlFor="">
                  No Payment Methods Found
                </label>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Billing;
