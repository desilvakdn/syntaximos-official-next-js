"use client";
import Image from "next/image";
import React, { useState } from "react";

interface Identifier {
  name: string;
  identifier: string;
  logo: string;
}

function SearchExt({ identifiers }: { identifiers: Identifier[] }) {
  const [search, setsearch] = useState("");
  return (
    <>
      <input
        type="text"
        name=""
        id=""
        placeholder="Type Extension Name Here"
        onChange={(e) => setsearch(e.target.value)}
        value={search}
      />
      {search && (
        <div className="mt-2 rounded flex flex-col gap-2">
          {identifiers.map((item, index) => {
            if (item.name.toLowerCase().includes(search.toLowerCase())) {
              return (
                <div
                  key={index}
                  className="SlideIn0 bg-zinc-700 text-zinc-200 rounded min-h-[70px] flex flex-row gap-2 items-center px-5 hover:scale-[1.01] hover:bg-synblue cursor-pointer transition-all"
                >
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={50}
                    height={50}
                  />
                  <label
                    htmlFor=""
                    key={index}
                    className="text-xl font-bold cursor-pointer"
                  >
                    {item.name}
                  </label>
                </div>
              );
            }
          })}
          {search &&
            identifiers.every(
              (item) => !item.name.toLowerCase().includes(search.toLowerCase())
            ) && (
              <div className="SlideIn0 bg-zinc-700 text-zinc-500 rounded min-h-[70px] flex flex-row gap-2 items-center px-5 ">
                <label htmlFor="" className="text-xl font-bold">
                  No Extension Found
                </label>
              </div>
            )}
        </div>
      )}
    </>
  );
}

export default SearchExt;
