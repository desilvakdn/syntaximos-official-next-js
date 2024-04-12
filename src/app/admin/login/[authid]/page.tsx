"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import isNotAuthAdmin from "@/components/SingleWrappers/AuthWrapperUnProtectedAdmin";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";
import Config from "@/resources/config";
import { CheckCircle, X, XCircle } from "@phosphor-icons/react/dist/ssr";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

function Admin({
  params,
}: {
  params: {
    authid: String;
  };
}) {
  const [verified, setverified] = useState(false);
  const [loading, setloading] = useState(true);
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
    username: "",
    password: "",
    passresetemail: "",
  });

  useEffect(() => {
    fetch(`${Config().api}/admin/authcheck/${params.authid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setloading(false);
        if (data.status) {
          setverified(true);
        } else {
          setverified(false);
        }
      });
  }, []);

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
          fetch(`${Config().api}/admin/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: properties.email,
              username: properties.username,
              password: properties.password,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              setProperties({ ...properties, isloading: false });

              if (data.status) {
                setCookie("syn_admin", data.tokens.accesstoken);
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

  return (
    <div className="relative bg-zinc-900 flex-grow mb-3 flex flex-col items-center">
      {loading ? (
        <>
          <div className="flex flex-row gap-2 items-center justify-center min-h-[500px]">
            <LoadingDots width={22} fill="var(--synwhite)" />
            <label htmlFor="">Please Wait...</label>
          </div>
        </>
      ) : verified ? (
        <div className="flex-grow flex justify-center items-center flex-col min-h-[300px] md:min-h-[600px]">
          <h2>Login To Syntaximos Admin</h2>
          <p className="px-[10px] text-center">
            Enter your credentials to login to your account
          </p>
          <div className="SlideIn0 min-w-[95%] md:min-w-[600px] mt-4 flex flex-col gap-2 justify-center items-center">
            <input
              className={`${
                properties.issubmitclicked && !properties.username
                  ? "border-solid border-2 border-red-500 bg-red-300 placeholder-red-500"
                  : ""
              }`}
              onChange={(e) =>
                setProperties({ ...properties, username: e.target.value })
              }
              type="text"
              name=""
              id=""
              placeholder="Enter Your Username"
              value={properties.username}
            />
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
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-2 items-center justify-center min-h-[500px]">
          <X width={22} weight="bold" />
          <label htmlFor="">Failed</label>
        </div>
      )}
    </div>
  );
}

export default isNotAuthAdmin(Admin);
