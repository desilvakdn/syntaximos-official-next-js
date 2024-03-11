"use client";
import Config from "@/resources/config";
import { UsersThree } from "@phosphor-icons/react/dist/ssr";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import LoadingDots from "../Animations/LoadingDots/page";

function AdminOverView() {
  const [isloading, setloading] = useState(true);
  const [data, setdata] = useState([
    {
      label: "Total Users",
      count: 39000,
    },
    {
      label: "Users Today",
      count: 200,
    },
    {
      label: "Today Orders",
      count: 200,
    },
  ]);

  useEffect(() => {
    const token = getCookie("syn_admin");
    fetch(`${Config().api}/admin/overview`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: { status: Boolean; data: any[] }) => {
        setloading(false);
        if (data.status) {
          setdata(data.data);
        } else {
          console.log("Unexpected data:", data);
        }
      });
  }, []);

  return (
    <>
      <div>
        <h2 className="p-0 m-0">Overview</h2>
        <label htmlFor="" className="opacity-55">
          Quick Overview Of The Business
        </label>
      </div>
      {!isloading ? (
        <div className="grid grid-cols-4 gap-2 mt-[30px]">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="p-2 flex flex-col bg-zinc-800 h-[100px] rounded cursor-pointer hover:bg-zinc-700 transition-all justify-start items-start"
              >
                <label className="opacity-55">{item.label}</label>
                <label htmlFor="" className="text-3xl text-center w-full">
                  {item.count}
                </label>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className="flex flex-row gap-2 items-center mt-[30px]">
            <LoadingDots width={22} fill="var(--synwhite)" />
            <label htmlFor="">Loading</label>
          </div>
        </>
      )}
    </>
  );
}

export default AdminOverView;
