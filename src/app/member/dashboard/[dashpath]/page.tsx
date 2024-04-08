"use client";
import Billing from "@/components/Dashboard/Billing/billing";
import ExtensionsDashboard from "@/components/Dashboard/Extensions/extensions";
import Myaddons from "@/components/Dashboard/My Addons/myaddons";
import Setting from "@/components/Dashboard/Setting/setting";
import isAuth from "@/components/SingleWrappers/AuthWrapperProtected";
import SyntaximosLogo from "@/Icons/syntaximoswordlogo";
import Config from "@/resources/config";
import {
  BoundingBox,
  CurrencyCircleDollar,
  Gear,
  Plus,
  SignOut,
} from "@phosphor-icons/react/dist/ssr";
import { deleteCookie, getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function DashboardItems({ params }: { params: { dashpath: "" } }) {
  const { push } = useRouter();
  const [ispremium, setIspremium] = useState(false);
  const path = usePathname();
  const menuitems = [
    {
      name: "Extensions",
      icon: <BoundingBox size={24} weight="bold" />,
      url: "/member/dashboard/extensions",
      identifier: "extensions",
    },
    {
      name: "My Addons",
      icon: <Plus size={24} weight="bold" />,
      url: "/member/dashboard/myaddons",
      identifier: "myaddons",
    },
    {
      name: "Billing",
      icon: <CurrencyCircleDollar size={24} weight="bold" />,
      url: "/member/dashboard/billing",
      identifier: "billing",
    },
    {
      name: "Setting",
      icon: <Gear size={24} weight="bold" />,
      url: "/member/dashboard/setting",
      identifier: "setting",
    },
  ];

  let navlabel = {
    extensions: "Extensions",
    myaddons: "My Addons",
    billing: "Billing",
    setting: "Setting",
  };

  const [properties, setProperties] = useState({
    activetab: 0,
  });

  const [firstname, setFirstname] = useState("");

  let class_ = `flex flex-row gap-2 items-center pl-7 cursor-pointer transition-all bg-zinc-800 p-3 hover:bg-synblue hover:p-3 rounded`;
  let selectedclass_ = `flex flex-row gap-2 items-center justify-center transition-all bg-synblue p-3 rounded`;

  useEffect(() => {
    let accesstoken = getCookie("syn_a");
    fetch(`${Config().api}/dashboard/firstname`, {
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
          setFirstname(data.data);
        }
      });
  }, []);

  useEffect(() => {
    const acc_token = getCookie("syn_a");
    const ref_token = getCookie("syn_r");

    if (acc_token && ref_token) {
      fetch(`${Config().api}/auth/userdetails`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${acc_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.refresh) {
            window.location.reload();
          } else if (data.status) {
            setIspremium(data.data.premium);
          }
        });
    } else {
      setIspremium(false);
    }
  }, []);

  async function logout() {
    setProperties({ activetab: 4 });

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

  return (
    <div className="fixed top-3 left-3 right-3 bottom-3 flex flex-row gap-3 ">
      <div className="w-96 max-w-72 flex flex-col bg-zinc-900 rounded p-2 gap-4">
        <div
          onClick={() => push("/")}
          className="text-center w-full flex justify-center items-center py-4 cursor-pointer transition-all hover:scale-[1.04]"
        >
          <SyntaximosLogo width={150} logocolor="#2d5bff" />
          {/* <h2
            onClick={() => push("/")}
            className="transition-all hover:cursor-pointer hover:scale-[1.01]"
          >
            Syntaximos
          </h2> */}
        </div>
        <div className="flex-grow  rounded flex flex-col gap-2 ">
          {menuitems.slice(0, -1).map((item, index) => {
            return (
              <label
                key={index}
                onClick={() => push(item.url)}
                htmlFor=""
                className={
                  path.includes(item.identifier) ? selectedclass_ : class_
                }
              >
                {item.icon} {item.name}
              </label>
            );
          })}
        </div>
        <div className="flex flex-col gap-2 text-center  rounded">
          <label
            onClick={() => push(menuitems[menuitems.length - 1].url)}
            htmlFor=""
            className={
              path.includes(menuitems[menuitems.length - 1].identifier)
                ? selectedclass_
                : class_
            }
          >
            <Gear size={24} weight="bold" /> Setting
          </label>
          <label onClick={logout} htmlFor="" className={class_}>
            <SignOut size={24} weight="bold" /> Logout
          </label>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3 rounded">
        <div className="h-20 bg-zinc-900  rounded flex flex-row items-center p-4 justify-between">
          <label htmlFor="" className="bg-synblue px-3 py-2 rounded">
            {navlabel[params.dashpath as keyof typeof navlabel]}
          </label>
          <div className="flex flex-row gap-4 items-center">
            <label htmlFor="">{`Hi ${firstname}`}</label>
            {ispremium && (
              <button
                onClick={() =>
                  window.open(
                    "https://join.skype.com/invite/vPQfjOHbv1M3",
                    "_blank"
                  )
                }
              >
                Contact Us On Skype
              </button>
            )}
          </div>
        </div>
        <div className="w-full h-full flex-grow-1 bg-zinc-900  rounded flex flex-col gap-3">
          {
            {
              extensions: <ExtensionsDashboard />,
              myaddons: <Myaddons />,
              billing: <Billing />,
              setting: <Setting />,
            }[params.dashpath as keyof typeof navlabel]
          }
        </div>
      </div>
    </div>
  );
}

export default isAuth(DashboardItems);
