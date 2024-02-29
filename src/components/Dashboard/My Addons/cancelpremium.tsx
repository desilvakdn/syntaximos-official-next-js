"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";

function CancelPremium({
  identifier,
  name,
  back,
}: {
  identifier: string;
  name: string;
  back: () => void;
}) {
  const { openpopup } = useGlobalPopup();

  const [props, setProps] = useState({
    reason: "",
    suggestion: "",
    canceloption: 6,
  });
  const [isloadingcancel, setIsloadingcancel] = useState(false);
  const [isconfirmcancel, setIsconfirmcancel] = useState(false);
  const [isbtnselected, setIsbtnselected] = useState(false);

  function cancelsubscription() {
    if (isloadingcancel) {
      return;
    }
    setIsbtnselected(true);
    if (!isconfirmcancel) {
      return;
    }
    if (
      props.reason === "" ||
      props.suggestion === "" ||
      props.canceloption === 6
    ) {
      return;
    }

    setIsloadingcancel(true);

    setTimeout(() => {
      openpopup("Error Cancelled", false);
      setIsloadingcancel(false);
    }, 5000);
  }

  return (
    <>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex flex-col gap-2">
          <label
            onClick={back}
            htmlFor=""
            className="flex flex-row gap-2 items-center justify-center bg-zinc-800 w-fit px-6 py-2 rounded cursor-pointer hover:text-synblue transition-all"
          >
            <ArrowLeft size={22} weight="bold" />
            Back
          </label>
          <div className="flex flex-row gap-2 items-center">
            <h2>Cancel Subscription</h2>
            <label htmlFor="" className="bg-synblue p-2 rounded ml-5">
              {name}
            </label>
          </div>
          <label htmlFor="">
            We&apos;re So Sad To See You Go, But If You Really Need Give A
            Reason and Cancel.
          </label>
          <label htmlFor="" className="text-red-400">
            Note: This Action Will Cancel Your Subscription That Cannot Be
            Undone
          </label>
        </div>
        <div className="flex flex-col gap-2 mt-7">
          <label htmlFor="">Reason</label>
          <textarea
            onChange={(e) => setProps({ ...props, reason: e.target.value })}
            value={props.reason}
            className={`text-synblack outline-none p-5 rounded   ${
              isbtnselected && props.reason === ""
                ? "border-2 border-solid border-red-500 bg-red-200 placeholder:text-red-700"
                : "bg-synwhite border border-synblack"
            }`}
            name=""
            id=""
            cols={30}
            rows={3}
            placeholder="Please Tell Us Why You Are Cancelling So We Can Work On Improvements"
          ></textarea>
        </div>
        <div className="flex flex-col gap-2 mt-10">
          <label htmlFor="">Suggestion For Improvements</label>
          <textarea
            onChange={(e) => setProps({ ...props, suggestion: e.target.value })}
            value={props.suggestion}
            className={`text-synblack outline-none p-5 rounded   ${
              isbtnselected && props.suggestion === ""
                ? "border-2 border-solid border-red-500 bg-red-200 placeholder:text-red-700"
                : "bg-synwhite border border-synblack"
            }`}
            name=""
            id=""
            cols={30}
            rows={3}
            placeholder="We Would Love To Hear Your Suggestions For Improvements"
          ></textarea>
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <label htmlFor="">Cancel Option</label>
          <div className="flex flex-row gap-2 h-16">
            <button
              onClick={() => setProps({ ...props, canceloption: 1 })}
              className={
                isbtnselected && props.canceloption === 6
                  ? "border-2 border-solid border-red-500"
                  : props.canceloption === 1
                  ? "bg-synblue text-synwhite"
                  : ""
              }
            >
              Cancel Immediately
            </button>
            <button
              onClick={() => setProps({ ...props, canceloption: 2 })}
              className={
                isbtnselected && props.canceloption === 6
                  ? "border-2 border-solid border-red-500"
                  : props.canceloption === 2
                  ? "bg-synblue text-synwhite"
                  : ""
              }
            >
              Cancel At The End Of Billing Period
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-2 mt-7">
          <input
            onChange={(e) => setIsconfirmcancel(e.target.checked)}
            checked={isconfirmcancel}
            type="checkbox"
            name=""
            id="confirmcancel"
            className={`w-fit scale-150 ${
              !isconfirmcancel
                ? "border-2 border-solid border-red-500 bg-red-500"
                : ""
            }`}
          />
          <label htmlFor="confirmcancel">
            I agree that cancelling subscription cannot be undone
          </label>
        </div>
        <button
          onClick={cancelsubscription}
          className="mt-5 px-9 py-4 w-fit flex flex-row gap-2"
        >
          {isloadingcancel ? (
            <>
              Cancelling <LoadingDots width={20} fill="var(--synblack)" />
            </>
          ) : (
            "Cancel Subscription"
          )}
        </button>
      </div>
    </>
  );
}

export default CancelPremium;
