"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";
import { Lightning } from "@phosphor-icons/react/dist/ssr";
import { getCookie } from "cookies-next";
import React, { useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Config from "@/resources/config";
import fetchGet from "@/modules/fetchGet";
import fetchPost from "@/modules/fetchPost";
import VerifyLogin from "@/utils/verifylogin";
import PageLoader from "@/components/Loader/page";

function Contact({ params }: { params: { extid: string } }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { openpopup } = useGlobalPopup();
  const [details, setDetails] = React.useState({
    name: "",
    email: "",
    subject: "Request Team Subscription",
    business: "",
    message: "",
    teamcount: 5,
    product: "",
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
  const [Loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<{ extension: string }>();
  const [dataH, setDataH] = React.useState<{ extension: string }>();

  useEffect(() => {
    fetchGet(`web/pricing/${params.extid}`, true).then((data) => {
      setLoading(false);
      console.log(data);
      if (data.status) {
        setData(data.data);
        setDataH(data.data);
      }
    });
  }, [params.extid]);

  useEffect(() => {
    let usersession = VerifyLogin();

    if (usersession) {
      setLock(true);
      fetchGet("auth/userdetails", true).then((data) => {
        if (data.status) {
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
      !details.business ||
      !details.teamcount
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

    fetchPost(
      "auth/recaptcha",
      {
        gRecaptchaToken: gRecaptchaToken,
      },
      true
    ).then((data) => {
      if (data.status) {
        fetchPost(
          "web/sales/contact",
          { ...details, product: dataH && dataH.extension },
          true
        ).then((data) => {
          if (data.status) {
            openpopup("Submitted Successfully", true);

            setprevDetails(details);

            setTimeout(() => {
              window.location.reload();
            }, 1500);
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
    <>
      {Loading ? (
        <>
          <PageLoader />
        </>
      ) : !data || !data.extension ? (
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
        <div className="relative bg-zinc-900 flex-grow mb-3 flex flex-col items-center">
          <div className="mt-[10px] md:mt-[100px] text-center flex flex-col  justify-center items-center">
            <h1 className="m-0 mt-7 p-0">Request Team Plan</h1>
            <h4 className="opacity-45 font-medium mx-[30px]">
              Response may be delayed but we will respond as soon as possible
            </h4>
          </div>
          <label
            htmlFor=""
            className="text-left opacity-85 text-red-400 mt-[10px]"
          >
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
              <label htmlFor="">Business/Organization Name (optional)</label>
              <input
                className="text-synblack"
                type="text"
                name=""
                id=""
                value={details.business}
                onChange={(e) =>
                  !lock && setDetails({ ...details, business: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block" htmlFor="">
                Team Members Count *
              </label>
              {details.teamcount < 5 && (
                <span className="text-red-400">
                  Minimum Team Members Should Be 5
                </span>
              )}
              <input
                className="text-synblack"
                type="number"
                name=""
                id=""
                min={5}
                value={details.teamcount}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    teamcount: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="">Product *</label>
              <input
                className="text-zinc-300 bg-zinc-700 cursor-not-allowed"
                type="text"
                name=""
                id=""
                value={data && data.extension}
                onChange={(e) =>
                  !lock && setDetails({ ...details, business: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="">Subject *</label>
              <input
                className="text-zinc-300 bg-zinc-700 cursor-not-allowed"
                type="text"
                name=""
                id=""
                disabled
                value={details.subject}
              />
            </div>

            <div className="w-full">
              <label htmlFor="" className="block">
                Additional Details (optional)
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
      )}
    </>
  );
}

export default Contact;
