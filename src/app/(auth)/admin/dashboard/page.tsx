"use client";
import AdminAction from "@/components/AdminDashboard/action";
import AdminOverView from "@/components/AdminDashboard/overview";
import fetchGet from "@/modules/fetchGet";
import Config from "@/resources/config";
import { BoundingBox, Cursor } from "@phosphor-icons/react/dist/ssr";
import { deleteCookie, getCookie } from "cookies-next";
import React, { useState } from "react";

function DashboardAdmin() {
  const [option, setoption] = useState(0);

  function logout() {
    fetchGet("admin/logout", true).then((data) => {
      if (data.status) {
        deleteCookie("SYNU");
        localStorage.clear();
        window.location.reload();
      } else {
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
          <div
            onClick={() => setoption(0)}
            className="flex flex-row gap-2 items-center justify-center cursor-pointer rounded bg-synblue text-synblack py-3 transition-all hover:scale-105"
          >
            <BoundingBox size={32} weight="bold" />
            <label htmlFor="">Overview</label>
          </div>
          <div
            onClick={() => setoption(1)}
            className="flex flex-row gap-2 items-center justify-center cursor-pointer rounded bg-synblue text-synblack py-3 transition-all hover:scale-105"
          >
            <Cursor size={32} weight="bold" />
            <label htmlFor="">Actions</label>
          </div>
        </div>
      </div>
      <div className="h-screen flex flex-grow  flex-col gap-2">
        <div className="w-full h-[100px] bg-zinc-900 flex flex-row gap-1 justify-end items-center px-4">
          <button onClick={logout}>Log Out</button>
        </div>
        <div className="w-full flex-grow bg-zinc-900 p-7">
          {option === 0 && <AdminOverView />}
          {option === 1 && <AdminAction />}
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
