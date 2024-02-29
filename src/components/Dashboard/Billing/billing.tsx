"use client";
import {
  DotsThreeOutline,
  PlusCircle,
  X,
} from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";
import SinglePaymentCard from "./singlecard";
import { getCookie } from "cookies-next";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CardForm from "./cardform";
import Config from "@/resources/config";

function Billing() {
  const [pms, setPms] = useState([]);
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setclientSecret] = useState("");

  useEffect(() => {
    let accesstoken = getCookie("syn_a");
    fetch(`${Config().api}/stripe/config`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    })
      .then((e) => e.json())
      .then((data) => {
        if (data.refresh) {
          window.location.reload();
        } else if (data.status) {
          setStripePromise(loadStripe(data.publish));
        }
      });
  }, []);

  useEffect(() => {
    let accesstoken = getCookie("syn_a");
    fetch(`${Config().api}/stripe/addpm`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    })
      .then((e) => e.json())
      .then((data) => {
        if (data.refresh) {
          window.location.reload();
        } else if (data.status) {
          console.log(data);
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
    let accesstoken = getCookie("syn_a");
    fetch(`${Config().api}/stripe/getpm`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.refresh) {
          window.location.reload();
        } else if (data.status) {
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
