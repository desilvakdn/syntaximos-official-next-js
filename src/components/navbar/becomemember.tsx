"use client";
import Link from "next/link";
import React, { useContext } from "react";
import AuthContext from "../SingleWrappers/AuthProvider";

function BecomeMember() {
  const { isloggedin, userid } = useContext(AuthContext);

  return (
    <>
      <Link href={isloggedin ? "/member/dashboard" : "/member"}>
        <button>{isloggedin ? "Dashboard" : "Become a Member"}</button>
      </Link>
    </>
  );
}

export default BecomeMember;
