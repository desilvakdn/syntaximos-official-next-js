"use client";
import AdminOverView from "@/components/AdminDashboard/overview";
import isAuth from "@/components/SingleWrappers/AuthWrapperProtected";
import Config from "@/resources/config";
import { BoundingBox } from "@phosphor-icons/react/dist/ssr";
import { deleteCookie, getCookie } from "cookies-next";
import React, { useEffect } from "react";

function DashboardAdmin() {
  function logout() {
    const token = getCookie("syn_admin");
    fetch(`${Config().api}/admin/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          deleteCookie("syn_admin");
          window.location.reload();
        } else {
          console.log("Unexpected data:", data);
        }
      });
  }
  return (
    <div className="w-full h-screen flex flex-row justify-center items-center gap-2">
      <div className="w-[350px] h-screen bg-zinc-900 flex flex-col gap-2">
        <div className="w-full h-[100px] flex justify-center items-center">
          <label htmlFor="" className="text-2xl font-bold">
            Syntaximos
          </label>
        </div>
        <div className="flex-grow px-4 flex-col flex gap-2">
          <div className="flex flex-row gap-2 items-center justify-center cursor-pointer rounded bg-synblue text-synblack py-3 transition-all hover:scale-105">
            <BoundingBox size={32} weight="bold" />
            <label htmlFor="">Overview</label>
          </div>
        </div>
      </div>
      <div className="h-screen flex flex-grow  flex-col gap-2">
        <div className="w-full h-[100px] bg-zinc-900 flex flex-row gap-1 justify-end items-center px-4">
          <button onClick={logout}>Log Out</button>
        </div>
        <div className="w-full flex-grow bg-zinc-900 p-7">
          <AdminOverView />
        </div>
      </div>
    </div>
  );
}

export default isAuth(DashboardAdmin);
