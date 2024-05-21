"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";
import DropDown from "@/components/dropdown";
import PopUpBasic from "@/components/popups/PopUpBasic/page";
import isStrongPassword from "@/helpers/passwordstrengthchecker";
import fetchPost from "@/modules/fetchPost";
import Config from "@/resources/config";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import SocialAuth from "../socialauth/socialauth";

function Register() {
  const { push } = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { openpopup } = useGlobalPopup();

  const [formdata, setformdata] = useState({
    firstname: "",
    lastname: "",
    username: "",
    country: { name: "", code: "" },
    email: "",
    password: "",
    confirmpassword: "",
    isvalidpass: false,
    ispassconfirmed: false,
    isvalidemail: false,
  });

  const [properties, setproperties] = useState({
    popup: false,
    header: "",
    body: "",
  });

  const [submitclicked, setsubmitclicked] = useState(false);
  const [isloading, setisloading] = useState(false);

  /*   useEffect(() => {
    fetch("http://ip-api.com/json/?fields=61439")
      .then((res) => res.json())
      .then((data) => {
        setformdata({
          ...formdata,
          country: data.country,
          countrycode: data.countryCode,
        });
      });
  }, []); */

  useEffect(() => {
    if (isStrongPassword(formdata.password)) {
      setformdata({ ...formdata, isvalidpass: true });
    } else {
      setformdata({ ...formdata, isvalidpass: false });
    }
  }, [formdata.password]);

  useEffect(() => {
    if (formdata.password === formdata.confirmpassword) {
      setformdata({ ...formdata, ispassconfirmed: true });
    } else {
      setformdata({ ...formdata, ispassconfirmed: false });
    }
  }, [formdata.confirmpassword]);

  useEffect(() => {
    let emailregx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailregx.test(formdata.email)) {
      setformdata({ ...formdata, isvalidemail: true });
    } else {
      setformdata({ ...formdata, isvalidemail: false });
    }
  }, [formdata.email]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isloading) return;

    setisloading(true);

    if (!executeRecaptcha) {
      setisloading(false);
      return;
    }

    if (
      !formdata.isvalidemail ||
      !formdata.isvalidpass ||
      !formdata.ispassconfirmed ||
      !formdata.firstname ||
      !formdata.lastname ||
      !formdata.username ||
      !formdata.country.name
    ) {
      setisloading(false);
      setsubmitclicked(true);

      if (!formdata.country.name) {
        openpopup("Select Your Country To Continue", false);
      }

      return;
    }

    const gRecaptchaToken = await executeRecaptcha("register");

    fetchPost(
      `auth/recaptcha`,
      {
        gRecaptchaToken: gRecaptchaToken,
      },
      true
    ).then((data) => {
      if (data.status) {
        fetchPost(`auth/register`, formdata, true).then((data) => {
          if (!data.status && data.user) {
            setproperties({
              popup: true,
              header: "Existing User Found",
              body: "It looks like you're already a user. Please login to continue. If not use another email or username to register",
            });
          } else if (data.status) {
            push(`/member/verify/email/${data.id_}.${data.token}`);
          } else {
            setproperties({
              popup: true,
              header: "Something Went Wrong",
              body: "It Seems Like You're A Robot. Please Try Again Later Genuinely Without Using Bots Or Automating Extensions.",
            });
          }

          setisloading(false);
        });
      } else {
        setproperties({
          popup: true,
          header: "Something Went Wrong",
          body: "It Seems Like You're A Robot. Please Try Again Later Genuinely Without Using Bots Or Automating Extensions.",
        });
        setisloading(false);
      }
    });
  }

  return (
    <>
      {properties.popup && (
        <PopUpBasic
          header={properties.header}
          body={properties.body}
          close={() => setproperties({ popup: false, header: "", body: "" })}
        />
      )}
      <div className="pt-[20px] pb-[100px] flex-grow flex justify-center items-center flex-col min-h-[300px] md:min-h-[600px]">
        <h2>Become A Syntaximos</h2>
        <p className="px-[15px] text-center">
          Fill the following form with correct details to become a syntaximos
        </p>
        <form
          onSubmit={submit}
          className="SlideIn0 min-w-[95%] md:min-w-[600px] mt-4 flex flex-col gap-2 justify-center items-center"
        >
          <div className="w-full flex flex-col md:flex-row gap-2 ">
            <input
              className={`${
                submitclicked && !formdata.firstname
                  ? "border-solid border-2 border-red-500 bg-red-300 placeholder-red-500"
                  : ""
              }`}
              onChange={(e) =>
                setformdata({ ...formdata, firstname: e.target.value })
              }
              value={formdata.firstname}
              type="text"
              name=""
              id=""
              placeholder="Enter Your First Name"
            />
            <input
              className={`${
                submitclicked && !formdata.lastname
                  ? "border-solid border-2 border-red-500 bg-red-300 placeholder-red-500"
                  : ""
              }`}
              onChange={(e) =>
                setformdata({ ...formdata, lastname: e.target.value })
              }
              value={formdata.lastname}
              type="text"
              name=""
              id=""
              placeholder="Enter Your Last Name"
            />
          </div>
          <div className="w-full flex flex-col md:flex-row gap-2">
            <input
              className={`${
                submitclicked && !formdata.username
                  ? "border-solid border-2 border-red-500 bg-red-300 placeholder-red-500"
                  : ""
              }`}
              onChange={(e) =>
                setformdata({ ...formdata, username: e.target.value })
              }
              value={formdata.username}
              type="text"
              name=""
              id=""
              placeholder="Username"
            />
            <DropDown
              value={formdata.country.name}
              placeholder="Country"
              setvalue={(itm) => setformdata({ ...formdata, country: itm })}
            />
          </div>
          {formdata.email && !formdata.isvalidemail && (
            <p className="SlideIn w-[490px] text-center opacity-50">
              Please Enter A Valid Email
            </p>
          )}
          <input
            className={`${
              submitclicked && !formdata.email && !formdata.isvalidemail
                ? "border-solid border-2 border-red-500 bg-red-300 placeholder-red-500"
                : ""
            }`}
            onChange={(e) =>
              setformdata({ ...formdata, email: e.target.value })
            }
            value={formdata.email}
            type="text"
            name=""
            id=""
            placeholder="Enter Email Here"
          />
          {formdata.password && !formdata.isvalidpass && (
            <p className="SlideIn w-[490px] text-center opacity-50">
              Need minimum of 8 Characters, Mix of Lowercase, Uppercase, Numbers
              & Special Characters
            </p>
          )}
          {formdata.password &&
            formdata.confirmpassword &&
            !formdata.ispassconfirmed && (
              <p className="SlideIn w-[490px] text-center opacity-50">
                Password Must Be Matched
              </p>
            )}
          <div className="w-full flex flex-col md:flex-row gap-2">
            <input
              className={`${
                submitclicked && !formdata.password && !formdata.isvalidpass
                  ? "border-solid border-2 border-red-500 bg-red-300 placeholder-red-500"
                  : ""
              }`}
              onChange={(e) =>
                setformdata({ ...formdata, password: e.target.value })
              }
              value={formdata.password}
              type="password"
              name=""
              id=""
              placeholder="Password"
            />
            <input
              className={`${
                submitclicked &&
                !formdata.confirmpassword &&
                !formdata.ispassconfirmed
                  ? "border-solid border-2 border-red-500 bg-red-300 placeholder-red-500"
                  : ""
              }`}
              onChange={(e) =>
                setformdata({ ...formdata, confirmpassword: e.target.value })
              }
              value={formdata.confirmpassword}
              type="password"
              name=""
              id=""
              placeholder="Confirm Password"
            />
          </div>
          <button
            type="submit"
            disabled={isloading}
            className={`w-full flex flex-row gap-2 items-center justify-center py-[15px] ${
              isloading
                ? "bg-slate-300 text-slate-600 hover:bg-slate-300 hover:text-slate-600 cursor-default"
                : "bg-synblue text-synwhite hover:bg-synwhite hover:text-synblack"
            }`}
          >
            {isloading ? (
              <>
                <span>Processing</span>
                <LoadingDots width={20} fill="var(--synwhite)" />
              </>
            ) : (
              "Register Acccount"
            )}
          </button>
        </form>
        <label htmlFor="" className="py-3">
          Or
        </label>
        <SocialAuth signup={true} signin={false} />
      </div>
    </>
  );
}

export default Register;
