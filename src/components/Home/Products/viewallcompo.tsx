"use client";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import React from "react";

function ViewAllCompo() {
  const { push } = useRouter();
  return (
    <button
      onClick={() => push("/extensions")}
      className="flex flex-row gap-3 justify-center items-center bg-transparent text-synwhite rounded border-solid border-synwhite border-2 mt-4 px-5 hover:border-0"
    >
      <span>View All</span>
      <ArrowRight size={32} />
    </button>
  );
}

export default ViewAllCompo;
