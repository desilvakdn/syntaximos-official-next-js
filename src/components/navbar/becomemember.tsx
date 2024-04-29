"use client";
import Link from "next/link";
import React from "react";

function BecomeMember({ session }: { session: any }) {
  return (
    <>
      {session && (
        <Link href={"/member/dashboard"}>
          <button>{"Dashboard"}</button>
        </Link>
      )}
      {!session && (
        <Link href={"/member"}>
          <button>{"Become a Member"}</button>
        </Link>
      )}
    </>
  );
}

export default BecomeMember;
