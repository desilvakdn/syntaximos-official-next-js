"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";
import isStrongPassword from "@/helpers/passwordstrengthchecker";
import fetchGet from "@/modules/fetchGet";
import fetchPost from "@/modules/fetchPost";
import Config from "@/resources/config";
import { X } from "@phosphor-icons/react/dist/ssr";
import { deleteCookie, getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

function Setting() {
  const close_key_ = process.env.NEXT_PUBLIC_ACCOUNT_CLOSE_KEY;
  const { openpopup } = useGlobalPopup();
  const [closeaccpop, setcloseaccpop] = useState(false);
  const [isloadingclosing, setisloadingclosing] = useState(false);
  const [enablebutton, setenablebutton] = useState(false);
  const [userold, setuserold] = useState({
    firstname: "",
    secondname: "",
    username: "",
    country: "",
    email: "",
  });
  const [user, setuser] = useState({
    firstname: "",
    secondname: "",
    username: "",
    country: "",
    email: "",
    currentpass: "",
    newpassword: "",
    confirmpass: "",
  });

  const [props, setprops] = useState({
    isvalidpass: false,
    isconfirmpass: false,
  });

  const [changedsetting, setchangesetting] = useState(false);
  const [allowed, setallowed] = useState(true);

  useEffect(() => {
    if (user.newpassword) {
      if (user.currentpass && user.newpassword === user.confirmpass) {
        setallowed(true);
      } else {
        setallowed(false);
      }
    } else {
      setallowed(true);
    }

    let useroldkeys = Object.keys(userold) as (keyof typeof userold)[];
    useroldkeys.forEach((item) => {
      if (user[item] && userold[item] !== user[item]) {
        setchangesetting(true);
      }
    });

    if (user.newpassword) {
      setchangesetting(true);
    }
  }, [user, userold]);

  const [loading, setloading] = useState(true);
  const [processloading, setprocessloading] = useState(false);

  useEffect(() => {
    fetchGet("dashboard/userinfo", true).then((data) => {
      if (data.status) {
        setuserold(data.data);
      }
      setloading(false);
    });
  }, []);

  useEffect(() => {
    if (isStrongPassword(user.newpassword)) {
      setprops({ ...props, isvalidpass: true });
    } else {
      setprops({ ...props, isvalidpass: false });
    }
  }, [user.newpassword]);

  useEffect(() => {
    if (user.newpassword === user.confirmpass) {
      setprops({ ...props, isconfirmpass: true });
    } else {
      setprops({ ...props, isconfirmpass: false });
    }
  }, [user.confirmpass]);

  async function logout() {
    try {
      const data = await fetchPost("auth/logout", {}, true);

      if (data.status) {
        deleteCookie("SYNU");
        localStorage.clear();
        window.location.reload();
      } else {
        openpopup("Something Wen Wrong. Try Again Later", false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function SubmitDetails() {
    if (processloading) {
      return;
    }

    if (!changedsetting) {
      openpopup("Change Settings To Continue", false);
      return;
    }

    if (!allowed) {
      openpopup("Please Check & Fill Details Required", false);
      return;
    }

    const userobject = {
      firstname: "",
      lastname: "",
      username: userold.username,
      country: userold.country,
      email: userold.email,
      password: "",
      currentpass: user.currentpass,
    };
    if (user.firstname) {
      userobject.firstname = user.firstname;
    } else {
      userobject.firstname = userold.firstname;
    }

    if (user.secondname) {
      userobject.lastname = user.secondname;
    } else {
      userobject.lastname = userold.secondname;
    }

    if (user.newpassword) {
      userobject.password = user.newpassword;
    }

    setprocessloading(true);
    fetchPost("dashboard/setting", userobject, true)
      .then((data) => {
        if (data.status) {
          openpopup("Successfully Changed", true);
          setTimeout(() => {
            window.location.reload();
          }, 3000);

          if (data.passwordchanged) {
            logout();
          }
        } else {
          if (data.passwordwrong) {
            openpopup("Current Password Wrong", false);
          } else {
            openpopup("Something Went Wrong", false);
          }
        }
        setprocessloading(false);
      })
      .catch((e) => {
        openpopup("Something Went Wrong", false);
        setprocessloading(false);
      });
  }

  function closeaccount() {
    if (!enablebutton || isloadingclosing) return;

    setisloadingclosing(true);

    fetchPost("auth/account/delete", {}, true).then((response) => {
      setisloadingclosing(false);
      if (response.status) {
        deleteCookie("SYNU");
        localStorage.clear();
        openpopup(response.message, true);
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      } else {
        openpopup(response.message, false);
      }
    });
  }

  return (
    <>
      {closeaccpop && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 z-10 flex justify-center items-center">
          <div className="bg-white text-synblack min-w-[600px] min-h-[300px] rounded p-5 relative">
            {!isloadingclosing && (
              <label
                onClick={() => setcloseaccpop(false)}
                htmlFor=""
                className="absolute right-4 top-4 cursor-pointer"
              >
                <X size={22} weight="bold" />
              </label>
            )}
            <h2>Close Syntaximos Account</h2>
            <div className="max-w-[500px]">
              <label htmlFor="">
                Closing your Syntaximos account will remove all of your data and
                access to Syntaximos extensions. This action cannot be undone,
                so the decision is up to you.
              </label>
            </div>
            <div className="bg-zinc-200 mt-3 py-3 px-3">
              <span>{`Type This Below :  ${close_key_}`}</span>
              <div className="flex flex-col gap-1 items-start">
                <input
                  type="text"
                  className="mt-3"
                  onChange={(e) => {
                    if (e.target.value === close_key_) {
                      setenablebutton(true);
                    } else {
                      setenablebutton(false);
                    }
                  }}
                />
                <button
                  onClick={closeaccount}
                  className={`mt-2 flex flex-row gap-1 items-center ${
                    enablebutton
                      ? "bg-red-700 hover:bg-red-500 text-white"
                      : "bg-zinc-300 cursor-not-allowed hover:bg-zinc-300 hover:text-zinc-500 text-zinc-500"
                  }`}
                >
                  {isloadingclosing ? (
                    <>
                      <span>Please Wait</span>
                      <span>
                        <LoadingDots width={20} fill="white" />
                      </span>
                    </>
                  ) : (
                    <span>Close My Account</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="p-8 flex flex-col flex-grow">
        <div>
          <h2>Setting</h2>
          <label htmlFor="">
            You can change accounts settings here. But limited
          </label>
        </div>
        {loading ? (
          <div className="w-full flex-grow flex justify-center items-center">
            <LoadingDots width={30} fill="var(--synwhite)" />
          </div>
        ) : (
          <div className="SlideIn0 mt-6 w-[900px] flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center justify-center">
              <div className="w-full">
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="First Name Here"
                  value={user.firstname ? user.firstname : userold.firstname}
                  onChange={(e) =>
                    setuser({ ...user, firstname: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label htmlFor="">Second Name</label>

                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Second Name Here"
                  value={user.secondname ? user.secondname : userold.secondname}
                  onChange={(e) =>
                    setuser({ ...user, secondname: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center">
              <div className="w-full">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Username Here"
                  disabled
                  className="bg-gray-400 text-gray-600"
                  value={userold.username}
                />
              </div>
              <div className="w-full">
                <label htmlFor="">Country Code</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Country Here"
                  disabled
                  className="bg-gray-400 text-gray-600"
                  value={userold.country}
                />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="">Email</label>
              <input
                className="bg-gray-400 text-gray-600"
                type="text"
                name=""
                id=""
                placeholder="Email Here"
                value={userold.email}
              />
            </div>
            {user.newpassword && !props.isvalidpass && (
              <p className="SlideIn w-full text-center opacity-50">
                Need minimum of 8 Characters, Mix of Lowercase, Uppercase,
                Numbers & Special Characters
              </p>
            )}
            {user.newpassword && user.confirmpass && !props.isconfirmpass && (
              <p className="SlideIn w-full text-center opacity-50">
                Password Must Be Matched
              </p>
            )}
            <div className="flex flex-row gap-2 items-center justify-center">
              <div className="w-full">
                <label htmlFor="">Current Password</label>
                <input
                  type="password"
                  name=""
                  id=""
                  placeholder="Current Password"
                  value={user.currentpass}
                  onChange={(e) =>
                    setuser({ ...user, currentpass: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label htmlFor="">New Password</label>
                <input
                  type="password"
                  name=""
                  id=""
                  placeholder="Password Here"
                  value={user.newpassword}
                  onChange={(e) =>
                    setuser({ ...user, newpassword: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label htmlFor="">Confirm Password</label>
                <input
                  type="password"
                  name=""
                  id=""
                  placeholder="Confirm Password Here"
                  value={user.confirmpass}
                  onChange={(e) =>
                    setuser({ ...user, confirmpass: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              onClick={SubmitDetails}
              className="bg-synblue hover:bg-synwhite hover:text-synblack flex fkex-row gap-2 justify-center items-center"
            >
              {processloading ? (
                <>
                  Processing <LoadingDots width={22} fill="var(--synblack)" />
                </>
              ) : (
                "Update Details"
              )}
            </button>
          </div>
        )}
      </div>
      <div className="bg-red-900 rounded m-1 border-2 border-solid border-red-600 p-1 px-5 flex flex-row justify-between items-center">
        <h2>Danger Zone</h2>
        <button
          className="h-fit hover:bg-red-950"
          onClick={() => setcloseaccpop(true)}
        >
          Close My Account
        </button>
      </div>
    </>
  );
}

export default Setting;
