"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import isStrongPassword from "@/helpers/passwordstrengthchecker";
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
  const [passresetform, setpassresetform] = useState(false);
  const [pass, setpass] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const [validpass, setvalidpass] = useState(false);
  const [validconfirmpass, setvalidconfirmpass] = useState(false);
  const [ischangingpass, setischangingpass] = useState(false);
  const [issuccesschange, setissuccesschange] = useState("");

  let user_id = params.verificationtoken.split(".")[0];
  let token_ = params.verificationtoken.replace(`${user_id}.`, "");

  useEffect(() => {
    if (isStrongPassword(pass)) {
      setvalidpass(true);
    } else {
      setvalidpass(false);
    }
  }, [pass]);

  useEffect(() => {
    if (pass === confirmpass) {
      setvalidconfirmpass(true);
    } else {
      setvalidconfirmpass(false);
    }
  }, [confirmpass, pass]);

  useEffect(() => {
    if (!user_id || !token_) {
      push("/member/register");
    } else {
      fetchPost(
        "auth/validate/pass",
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
      "auth/verifytoken/pass",
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
          setpassresetform(true);
        }, 1000);
        /* setTimeout(() => {
            push("/member/login");
          }, 3000); */
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
      "auth/resendcode/pass",
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

  function changepass() {
    if (!pass || !validpass || !confirmpass || !validconfirmpass) {
      return;
    }

    setischangingpass(true);

    fetchPost(
      "auth/passworddone",
      {
        userid: user_id,
        password: pass,
        token: token_,
      },
      true
    )
      .then((data) => {
        setischangingpass(false);
        if (data.status) {
          setissuccesschange("valid");
          setTimeout(() => {
            push("/member/login");
          }, 2000);
        } else {
          setissuccesschange("invalid");
          setTimeout(() => {
            setissuccesschange("");
          }, 3000);
        }
      })
      .catch((e) => {
        setissuccesschange("invalid");
        setTimeout(() => {
          setissuccesschange("");
        }, 3000);
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
      ) : !passresetform ? (
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
      ) : (
        <div className="flex-grow flex justify-center items-center flex-col min-h-[600px]">
          <div className="SlideIn0 bg-synwhite min-w-[400px] min-h-[200px] rounded text-synblack flex flex-col justify-center items-center p-6">
            <h2>Create New Password</h2>
            <p className="max-w-[400px] text-center">
              Create A Strong Password At Least 8 Characters Long, Mix with
              Upper Case ,Lower Case Letters, Numbers and Special Characters.
            </p>
            <div className="flex flex-col gap-2 mt-5 w-full">
              {pass && !validpass && (
                <p className="SlideIn w-[490px] text-center opacity-50">
                  Need minimum of 8 Characters, Mix of Lowercase, Uppercase,
                  Numbers & Special Characters
                </p>
              )}
              <input
                onChange={(e) => setpass(e.target.value)}
                value={pass}
                className="border-solid border-2 border-synblack"
                type="password"
                name=""
                id=""
                placeholder="New Password"
              />
              {pass && confirmpass && !validconfirmpass && (
                <p className="SlideIn w-[490px] text-center opacity-50">
                  Password Must Be Matched
                </p>
              )}
              <input
                onChange={(e) => setconfirmpass(e.target.value)}
                value={confirmpass}
                className="border-solid border-2 border-synblack"
                type="password"
                name=""
                id=""
                placeholder="Confirm Password"
              />
              <button
                onClick={changepass}
                className="bg-synblue flex flex-row gap-2 justify-center items-center"
              >
                {ischangingpass ? (
                  <>
                    <span>Processing</span>
                    <LoadingDots width={20} fill="var(--synwhite)" />
                  </>
                ) : issuccesschange === "" ? (
                  "Change Password"
                ) : success === "valid" ? (
                  <>
                    <span>Password Changed</span>
                    <CheckCircle size={20} weight="bold" />
                  </>
                ) : (
                  <>
                    <span>Something Went Wrong</span>
                    <XCircle size={20} weight="bold" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AccountVerification;
