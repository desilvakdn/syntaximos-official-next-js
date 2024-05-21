"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
} from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { motion } from "framer-motion";
import fetchPost from "@/modules/fetchPost";
import SocialAuth from "../socialauth/socialauth";

function Login() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { openpopup } = useGlobalPopup();
  const { push } = useRouter();

  const [properties, setProperties] = useState({
    isloading: false,
    ispasswordresetsending: false,
    ispassresetneed: false,
    issubmitclicked: false,
    ispassresetclicked: false,
    issuccesslogin: "",
    issuccesspassreset: "",
    email: "",
    password: "",
    passresetemail: "",
  });
  const [emailwp, setemailwp] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setProperties({ ...properties, issubmitclicked: true });

    if (!executeRecaptcha) {
      openpopup("Recaptcha Not Ready", false);
      return;
    }

    if (!properties.email || !properties.password) {
      return;
    }
    setProperties({ ...properties, isloading: true });

    const gRecaptchaToken = await executeRecaptcha("login");

    fetchPost(
      `auth/recaptcha`,
      {
        gRecaptchaToken: gRecaptchaToken,
      },
      true
    ).then((data) => {
      if (data.status) {
        fetchPost(
          `auth/login`,
          {
            email: properties.email,
            password: properties.password,
          },
          true
        )
          .then((data) => {
            setProperties({ ...properties, isloading: false });

            if (!data.status && data.nonverified) {
              openpopup(
                "You're Not Verified. Please Verify Your Email First",
                false
              );
              push(`/member/verify/email/${data.id_}.${data.token}`);
            } else if (!data.status && data.setup) {
              setProperties({
                ...properties,
                ispassresetneed: true,
                passresetemail: data.email,
              });
              setemailwp(data.email);
            } else if (data.status) {
              openpopup(
                "Login Is Successfull. You Will be Redirected To Dashboard",
                true
              );
              setProperties({ ...properties, issuccesslogin: "valid" });
              setTimeout(() => {
                setProperties({ ...properties, issuccesslogin: "" });
                window.location.reload();
              }, 2000);
            } else {
              setProperties({ ...properties, issuccesslogin: "invalid" });
              setTimeout(() => {
                setProperties({ ...properties, issuccesslogin: "" });
              }, 3000);
            }
          })
          .catch((e) => {
            setProperties({ ...properties, isloading: false });
            setProperties({ ...properties, issuccesslogin: "invalid" });
            setTimeout(() => {
              setProperties({ ...properties, issuccesslogin: "" });
            }, 3000);
          });
      } else {
        openpopup("Recaptcha Failed", false);
        setProperties({ ...properties, isloading: false });
      }
    });
  }

  function sendpasswordreset() {
    setProperties({ ...properties, ispassresetclicked: true });
    if (properties.ispasswordresetsending || !properties.passresetemail) {
      return;
    }
    console.log("hi");
    setProperties({ ...properties, ispasswordresetsending: true });

    fetchPost(
      "auth/forgotpassword",
      {
        email: properties.passresetemail,
      },
      true
    ).then((data) => {
      setProperties({ ...properties, ispasswordresetsending: false });
      if (data.status) {
        push(`/member/verify/password/${data.id_}.${data.token}`);
      } else {
        setProperties({ ...properties, issuccesspassreset: "invalid" });
        setTimeout(() => {
          setProperties({ ...properties, issuccesspassreset: "" });
        }, 3000);
      }
    });
  }

  return (
    <>
      {properties.ispassresetneed ? (
        <div className="flex-grow flex justify-center items-center flex-col min-h-[300px] md:min-h-[600px]">
          <label
            onClick={() =>
              !properties.ispasswordresetsending &&
              setProperties({ ...properties, ispassresetneed: false })
            }
            htmlFor=""
            className="flex flex-row gap-2 justify-center items-center hover:opacity-55 transition-all cursor-pointer"
          >
            <ArrowLeft size={20} weight="bold" />
            <span>Back To Login</span>
          </label>
          <h2>Syntaximos Password Reset</h2>
          <p className="px-[40px] md:px-0 md:max-w-[600px] text-center">
            Enter your following credentials to reset password in your account.
            You will receive an email if your account is available in our system
          </p>
          <div className="SlideIn0 min-w-[95%] md:min-w-[600px] mt-4 flex flex-col gap-2 justify-center items-center">
            {emailwp ? (
              <input
                className={`${
                  properties.ispassresetclicked && !emailwp
                    ? "border-solid border-2 border-red-500 bg-red-300 placeholder-red-500"
                    : ""
                }`}
                disabled={true}
                type="text"
                name=""
                id=""
                value={emailwp}
              />
            ) : (
              <input
                className={`${
                  properties.ispassresetclicked && !properties.passresetemail
                    ? "border-solid border-2 border-red-500 bg-red-300 placeholder-red-500"
                    : ""
                }`}
                onChange={(e) =>
                  setProperties({
                    ...properties,
                    passresetemail: e.target.value,
                  })
                }
                type="text"
                name=""
                id=""
                placeholder="Enter Your Email"
                value={properties.passresetemail}
              />
            )}
            <button
              onClick={sendpasswordreset}
              className={`w-full flex flex-row gap-2 items-center justify-center py-[15px] ${
                properties.ispasswordresetsending
                  ? "bg-slate-300 text-slate-500 hover:bg-slate-300 hover:text-slate-500 cursor-default"
                  : "bg-synblue hover:bg-blue-700 hover:text-synwhite"
              }`}
            >
              {properties.ispasswordresetsending ? (
                <>
                  <span>Processing</span>
                  <LoadingDots width={20} fill="var(--synblack)" />
                </>
              ) : properties.issuccesspassreset === "" ? (
                "Send Password Reset"
              ) : properties.issuccesspassreset === "invalid" ? (
                <>
                  <span>Something Went Wrong</span>
                  <XCircle size={20} weight="bold" />
                </>
              ) : (
                <>
                  <span>Reset Sent</span>
                  <CheckCircle size={20} weight="bold" />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex justify-center items-center flex-col min-h-[300px] md:min-h-[600px] pt-10 pb-[100px]">
          <h2>Login To Syntaximos</h2>
          <div className="w-fit min-w-[95%] md:min-w-[600px] flex justify-center items-center flex-col bg-zinc-800 px-5 py-10 rounded drop-shadow-md">
            <p className="px-[10px] text-center">
              Enter your credentials to login to your account
            </p>
            <form
              className="SlideIn0 w-full  mt-4 flex flex-col gap-2 justify-center items-center"
              onSubmit={submit}
            >
              <input
                className={`${
                  properties.issubmitclicked && !properties.email
                    ? "border-solid border-2 border-red-500 bg-red-300 placeholder-red-500"
                    : ""
                }`}
                onChange={(e) =>
                  setProperties({ ...properties, email: e.target.value })
                }
                type="text"
                name=""
                id=""
                placeholder="Enter Your Email"
                value={properties.email}
              />
              <input
                className={`${
                  properties.issubmitclicked && !properties.password
                    ? "border-solid border-2 border-red-500 bg-red-300 placeholder-red-500"
                    : ""
                }`}
                onChange={(e) =>
                  setProperties({ ...properties, password: e.target.value })
                }
                value={properties.password}
                type="password"
                name=""
                id=""
                placeholder="Enter Your Password"
              />
              <label
                className="transition-all cursor-pointer hover:opacity-55"
                htmlFor=""
                onClick={() =>
                  setProperties({ ...properties, ispassresetneed: true })
                }
              >
                Forgot Password ?
              </label>
              <button
                type="submit"
                disabled={properties.isloading}
                className="w-full flex flex-row gap-2 items-center justify-center bg-synblue text-synwhite hover:bg-blue-950 hover:text-synwhite py-[15px]"
              >
                {properties.isloading ? (
                  <>
                    <span>Processing</span>
                    <LoadingDots width={20} fill="var(--synwhite)" />
                  </>
                ) : properties.issuccesslogin === "" ? (
                  "Log In"
                ) : properties.issuccesslogin === "valid" ? (
                  <>
                    <span>Login Success</span>
                    <CheckCircle size={20} weight="bold" />
                  </>
                ) : (
                  <>
                    <span>Provided Data Is Wrong</span>
                    <XCircle size={20} weight="bold" />
                  </>
                )}
              </button>
            </form>
          </div>
          <label htmlFor="" className="py-3">
            Or
          </label>
          <SocialAuth signup={false} signin={true} />
        </div>
      )}
    </>
  );
}

export default Login;
