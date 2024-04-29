"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import fetchPost from "@/modules/fetchPost";
import Config from "@/resources/config";
import { CheckCircle, XCircle } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function AccountVerification({
  params,
}: {
  params: { verificationtoken: string };
}) {
  const { push } = useRouter();
  const [valid, setvalid] = useState(false);
  const [ischecking, setischecking] = useState(true);
  const [isverifying, setverifying] = useState(false);
  const [btntext, setbtntext] = useState("Verify");
  const [success, setsuccess] = useState("");
  const [code, setcode] = useState("");
  const [isresending, setresending] = useState(false);
  const [resendtext, setresendtext] = useState("Resend");
  const [btnlockresend, setbtnlockresend] = useState(false);

  let user_id = params.verificationtoken.split(".")[0];
  let token_ = params.verificationtoken.replace(`${user_id}.`, "");

  useEffect(() => {
    if (!user_id || !token_) {
      push("/member/register");
    } else {
      fetchPost(
        `auth/validate/email`,
        {
          userid: user_id,
          code: token_,
        },
        true
      ).then((data) => {
        if (data.status) {
          setvalid(true);
        } else {
          push("/member/register");
        }

        setischecking(false);
      });
    }
  }, [push, token_, user_id]);

  function submit() {
    if (!code) {
      return;
    }

    setverifying(true);

    fetchPost(
      `auth/verifytoken/email`,
      {
        userid: user_id,
        code: code,
        token: token_,
      },
      true
    ).then((data) => {
      if (data.status) {
        setsuccess("valid");
        setTimeout(() => {
          push("/member/login");
        }, 3000);
      } else {
        setsuccess("invalid");
        setTimeout(() => {
          setsuccess("");
        }, 3000);
      }

      setverifying(false);
    });
  }

  function handleresend() {
    if (btnlockresend) {
      return;
    }
    setresending(true);

    fetchPost(
      `auth/resendcode/email`,
      {
        userid: user_id,
      },
      true
    ).then((data) => {
      if (data.status) {
        setresending(false);
        setresendtext("Sent");
        setbtnlockresend(true);
        setTimeout(() => {
          setbtnlockresend(false);
        }, 20000);
        setTimeout(() => {
          setresendtext("Resend");
        }, 3000);
      }
    });
  }

  return (
    <>
      {ischecking ? (
        <div className="flex-grow flex justify-center items-center flex-col min-h-[600px]">
          <div className="SlideIn0 bg-synwhite text-synblack p-6 rounded">
            <div className="flex flex-row gap-3 items-center">
              <h2>Please Wait</h2>
              <LoadingDots width={30} fill="var(--synblue)" />
            </div>
            <p className="max-w-[590px]">
              We&apos;re Checking Your Verficiation Token. If Token Is Invalid
              You Will Be Redirected To Register Page{" "}
            </p>
          </div>
        </div>
      ) : (
        <div className=" flex-grow flex justify-center items-center flex-col min-h-[600px]">
          <div className="SlideIn0 bg-synwhite min-w-[400px] min-h-[200px] rounded text-synblack flex flex-col justify-center items-center p-6">
            <h2>Account Verification</h2>
            <p className="max-w-[400px] text-center">
              We&apos;ve Sent You A Secret Code To Your Mail Inbox That Need To
              Be Put Into The Following Area and Do Verification.
            </p>
            <div className="flex flex-row gap-2 mt-5 w-full">
              <input
                onChange={(e) => setcode(e.target.value)}
                value={code}
                className="border-solid border-2 border-synblack"
                type="text"
                name=""
                id=""
                placeholder="Verification Code"
              />
              <button
                onClick={handleresend}
                className={
                  btnlockresend
                    ? "bg-slate-400 text-slate-600 cursor-not-allowed"
                    : "bg-synblack text-synwhite"
                }
              >
                {isresending ? (
                  <div className="flex flex-row gap-3 items-center">
                    <span>Sending</span>
                    <LoadingDots width={20} fill="var(--synwhite)" />
                  </div>
                ) : (
                  resendtext
                )}
              </button>
            </div>
            {!isverifying ? (
              <button
                onClick={submit}
                className="bg-synblue text-synwhite mt-4 w-full hover:bg-blue-900 flex flex-row gap-2 items-center justify-center"
              >
                {success === "" ? (
                  "Verify"
                ) : success === "valid" ? (
                  <>
                    <span>Verified</span>
                    <CheckCircle size={20} weight="bold" />
                  </>
                ) : (
                  <>
                    <span>Invalid Code</span>
                    <XCircle size={20} weight="bold" />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={submit}
                className="bg-synblue text-synwhite mt-4 w-full hover:bg-blue-900 flex flex-row gap-2 items-center justify-center"
              >
                Verifying <LoadingDots width={20} fill="var(--synwhite)" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AccountVerification;
