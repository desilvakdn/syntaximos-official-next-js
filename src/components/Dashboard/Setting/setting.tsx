"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";
import isStrongPassword from "@/helpers/passwordstrengthchecker";
import Config from "@/resources/config";
import { deleteCookie, getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

function Setting() {
  const { openpopup } = useGlobalPopup();
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
    let accesstoken = getCookie("syn_a");
    fetch(`${Config().api}/dashboard/userinfo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.refresh) {
          window.location.reload();
        } else if (data.status) {
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
    const accesstoken = getCookie("syn_a");
    try {
      const response = await fetch(`${Config().api}/auth/logout`, {
        method: "POST", // or any other method
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      const data = await response.json();

      console.log(data);
      if (data.status) {
        deleteCookie("syn_a");
        deleteCookie("syn_r");
        window.location.reload();
      } else {
        window.location.reload();
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
    let accesstoken = getCookie("syn_a");
    fetch(`${Config().api}/dashboard/setting`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
      body: JSON.stringify(userobject),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.refresh) {
          window.location.reload();
        } else if (data.status) {
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
        console.log(e);
        openpopup("Something Went Wrong", false);
        setprocessloading(false);
      });
  }

  return (
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
              Need minimum of 8 Characters, Mix of Lowercase, Uppercase, Numbers
              & Special Characters
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
  );
}

export default Setting;
