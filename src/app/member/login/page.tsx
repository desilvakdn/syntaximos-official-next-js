"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import PageLoader from "@/components/Loader/page";
import AuthContext from "@/components/SingleWrappers/AuthProvider";
import isNotAuth from "@/components/SingleWrappers/AuthWrapperUnProtected";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";
import Config from "@/resources/config";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
} from "@phosphor-icons/react/dist/ssr";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

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

  async function submit() {
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
        if (data.status) {
          fetch(`${Config().api}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: properties.email,
              password: properties.password,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              setProperties({ ...properties, isloading: false });
              console.log(data);

              if (!data.status && data.setup) {
                setProperties({
                  ...properties,
                  ispassresetneed: true,
                  passresetemail: data.email,
                });
                setemailwp(data.email);
              } else if (data.status) {
                setCookie("syn_a", data.tokens.accesstoken);
                setCookie("syn_r", data.tokens.refreshtoken);
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
              console.log("Failed To Log In");
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
    if (
      properties.ispasswordresetsending ||
      !properties.passresetemail ||
      !emailwp
    ) {
      console.log("hi i'm there");
      return;
    }
    setProperties({ ...properties, ispasswordresetsending: true });

    fetch(`${Config().api}/auth/forgotpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: properties.passresetemail || emailwp,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProperties({ ...properties, ispasswordresetsending: false });
        console.log(data);
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

  function test() {}

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
        <div className="flex-grow flex justify-center items-center flex-col min-h-[300px] md:min-h-[600px]">
          <h2>Login To Syntaximos</h2>
          <p className="px-[10px] text-center">
            Enter your credentials to login to your account
          </p>
          <div className="SlideIn0 min-w-[95%] md:min-w-[600px] mt-4 flex flex-col gap-2 justify-center items-center">
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
            <button
              onClick={submit}
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

            <label
              className="transition-all cursor-pointer hover:opacity-55"
              htmlFor=""
              onClick={() =>
                setProperties({ ...properties, ispassresetneed: true })
              }
            >
              Forgot Password ?
            </label>
          </div>
        </div>
      )}
    </>
  );
}

export default isNotAuth(Login);
