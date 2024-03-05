"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";
import { Lightning } from "@phosphor-icons/react/dist/ssr";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Config from "@/resources/config";

function Contact() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { openpopup } = useGlobalPopup();
  const [details, setDetails] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [prevdetails, setprevDetails] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [lock, setLock] = React.useState(false);
  const [ispremium, setIspremium] = React.useState(false);
  const [issubmitting, setIssubmitting] = React.useState(false);

  useEffect(() => {
    const acc_token = getCookie("syn_a");
    const ref_token = getCookie("syn_r");

    if (acc_token && ref_token) {
      setLock(true);
    }

    if (acc_token && ref_token) {
      fetch(`${Config().api}/auth/userdetails`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${acc_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.refresh) {
            window.location.reload();
          } else if (data.status) {
            console.log(data.data);
            setDetails({
              ...details,
              name: data.data.name,
              email: data.data.email,
            });
            setIspremium(data.data.premium);
          }
        });
    } else {
      setIspremium(false);
    }
  }, []);

  function areEqual(obj1: any, obj2: any) {
    // Check if both are objects
    if (typeof obj1 === "object" && typeof obj2 === "object") {
      // Get the keys of both objects
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      // Check if they have the same number of keys
      if (keys1.length !== keys2.length) {
        return false;
      }

      // Check if all keys in obj1 exist in obj2 and have the same value recursively
      for (let key of keys1) {
        if (!obj2.hasOwnProperty(key) || !areEqual(obj1[key], obj2[key])) {
          return false;
        }
      }

      // If all checks pass, objects are equal
      return true;
    }

    // If they are not objects, compare them directly
    return obj1 === obj2;
  }

  async function submitdetails() {
    if (!executeRecaptcha) {
      openpopup("Recaptcha Not Ready", false);
      return;
    }

    if (issubmitting) {
      openpopup("Please Wait", false);
      return;
    }

    if (
      !details.name ||
      !details.email ||
      !details.subject ||
      !details.message
    ) {
      openpopup("Complete All Fields", false);
      return;
    }

    if (areEqual(details, prevdetails)) {
      openpopup("You Already Submitted This", false);
      return;
    }

    const gRecaptchaToken = await executeRecaptcha("contact");

    setIssubmitting(true);

    const acc_token = getCookie("syn_a");
    fetch(`${Config().api}/auth/recaptcha`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gRecaptchaToken: gRecaptchaToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status) {
          fetch(`${Config().api}/web/contact`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: acc_token ? `Bearer ${acc_token}` : "",
            },
            body: JSON.stringify({
              name: details.name,
              email: details.email,
              subject: details.subject,
              message: details.message,
            }),
          })
            .then((e) => e.json())
            .then((data) => {
              if (data.status) {
                openpopup("Submitted Successfully", true);

                setprevDetails(details);
              } else {
                openpopup(data.error, false);
              }
              setIssubmitting(false);
            });
        } else {
          openpopup("Recaptcha Failed", false);
          setIssubmitting(false);
        }
      });
  }

  return (
    <div className="relative bg-zinc-900 flex-grow mb-3 flex flex-col items-center">
      <div className="mt-[10px] md:mt-[100px] text-center flex flex-col  justify-center items-center">
        {ispremium ? (
          <label
            htmlFor=""
            className="SlideIn0 flex flex-row gap-2 items-center justify-center bg-yellow-200 text-amber-800 w-fit px-5 py-1 rounded"
          >
            <Lightning size={32} weight="fill" />{" "}
            <span>Fast Response Enabled</span>
          </label>
        ) : (
          <label
            htmlFor=""
            className="SlideIn0 flex flex-row gap-2 items-center justify-center bg-zinc-700 text-zinc-500 w-fit px-5 py-1 rounded"
          >
            <Lightning size={32} weight="fill" />{" "}
            <span>Fast Response Disabled</span>
          </label>
        )}
        <h1 className="m-0 mt-7 p-0">We&apos;re Open For You</h1>
        <h4 className="opacity-45 font-medium mx-[30px]">
          Response may be delayed but we will respond as soon as possible
        </h4>
      </div>
      <label htmlFor="" className="text-left opacity-85 text-red-400 mt-[10px]">
        Note: Don&apos;t Submit Same Inquiry More Than Once
      </label>
      <div className="SlideIn0 text-left w-[90%] max-w-[700px] md:w-[60%] flex flex-col gap-4 mt-[25px]">
        <div>
          <label htmlFor="">Your Name *</label>
          <input
            className="text-synblack"
            type="text"
            name=""
            id=""
            disabled={lock}
            value={details.name}
            onChange={(e) =>
              !lock && setDetails({ ...details, name: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="">Your Email *</label>
          <input
            className="text-synblack"
            type="text"
            name=""
            id=""
            disabled={lock}
            value={details.email}
            onChange={(e) =>
              !lock && setDetails({ ...details, email: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="">Subject *</label>
          <input
            className="text-synblack"
            type="text"
            name=""
            id=""
            value={details.subject}
            onChange={(e) =>
              setDetails({ ...details, subject: e.target.value })
            }
          />
        </div>
        <div className="w-full">
          <label htmlFor="" className="block">
            Explain In Details *
          </label>
          <textarea
            className="w-full text-synblack p-2 outline-none border-none"
            name=""
            id=""
            rows={10}
            spellCheck={false}
            value={details.message}
            onChange={(e) =>
              setDetails({ ...details, message: e.target.value })
            }
          />
          <div className="mt-4 mb-20 flex justify-center items-center">
            <button
              className="w-full md:w-fit md:px-20 py-3 flex flex-row gap-2 items-center justify-center"
              onClick={submitdetails}
            >
              {issubmitting ? (
                <>
                  <span>Submitting</span>
                  <LoadingDots width={20} fill="var(--synblack)" />
                </>
              ) : (
                "Submit Now"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
