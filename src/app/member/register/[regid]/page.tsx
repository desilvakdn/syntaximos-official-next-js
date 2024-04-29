"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import DropDown from "@/components/dropdown";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";
import fetchGet from "@/modules/fetchGet";
import fetchPost from "@/modules/fetchPost";
import Config from "@/resources/config";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function RegThroughSocial({ params }: { params: { regid: String } }) {
  const { openpopup } = useGlobalPopup();
  const [ischecking, setchecking] = useState(true);
  const [country, setcountry] = useState({
    name: "",
    code: "",
  });
  const [isloading, setisloading] = useState(false);
  const [username, setusername] = useState("");
  const [disableregister, setdisableregister] = useState(false);

  const { push } = useRouter();

  useEffect(() => {
    if (params.regid.length < 15) {
      push("/member/login");
    } else {
      fetchGet(`auth/register/social/${params.regid}`, true).then((data) => {
        if (data.status) {
          setchecking(false);
        } else {
          push("/member/login");
        }
      });
    }
  }, []);

  function submit() {
    if (disableregister) return;
    if (isloading) {
      openpopup("Please Wait...", false);
      return;
    }

    if (!country.name || !username) {
      openpopup("Please Fill All The Fields Available", false);
      return;
    }

    const data = {
      country,
      username,
      id: params.regid,
    };

    setisloading(true);
    fetchPost(`auth/register/social/done`, data, true).then((data) => {
      if (data.status) {
        setdisableregister(true);
        openpopup(data.message, true);
        setTimeout(() => {
          push("/member/dashboard");
        }, 2000);
      } else {
        openpopup(data.message, false);
      }
      setisloading(false);
    });
  }

  return (
    <>
      <div className="w-full flex-grow flex justify-center items-center">
        {ischecking ? (
          <div className="flex flex-row gap-2 items-center">
            <h3> Verifying Request</h3>
            <LoadingDots width={30} fill="white" />
          </div>
        ) : (
          <div className="mx-4 my-20">
            <h1>Account Registration</h1>
            <label htmlFor="">
              Please give your account a username and choose your country
            </label>
            <div className="w-full flex flex-col gap-2 mt-5">
              <input
                onChange={(e) => setusername(e.target.value)}
                value={username}
                type="text"
                name=""
                id=""
                placeholder="Username"
              />
              <DropDown
                value={country.name}
                placeholder="Country"
                setvalue={(itm) => setcountry(itm)}
              />
              <button
                onClick={submit}
                className={`w-full flex flex-row gap-2 items-center justify-center py-[15px] ${
                  isloading || disableregister
                    ? "bg-slate-300 text-slate-600 hover:bg-slate-300 hover:text-slate-600 cursor-default"
                    : "bg-synblue text-synwhite hover:bg-synwhite hover:text-synblack"
                }`}
              >
                {isloading ? (
                  <>
                    <span>Processing</span>
                    <LoadingDots width={20} fill="var(--synwhite)" />
                  </>
                ) : disableregister ? (
                  "Registered"
                ) : (
                  "Register Acccount"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default RegThroughSocial;
