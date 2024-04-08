"use client";
import PricingSection from "@/components/Pricing/pricingcompo";
import Config from "@/resources/config";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Identifier {
  name: string;
  identifier: string;
  logo: string;
}

function ExtensionPricings() {
  const [pricingmode, setPricingMode] = React.useState(0);
  const [search, setsearch] = useState("");
  const [selectedextid, setSelectedextid] = useState("");
  const [selectedextname, setSelectedextname] = useState("");
  const [onclickmenu, setOnclickmenu] = useState(false);

  const [extidentifiers, setExtidentifiers] = useState<Identifier[]>([]);

  useEffect(() => {
    fetch(`${Config().api}/web/extidentifiers`)
      .then((res) => res.json())
      .then((data) => setExtidentifiers(data.data));
  }, []);

  return (
    <>
      {!onclickmenu ? (
        <div className="bg-zinc-900 flex-grow mb-3 flex flex-col items-center min-h-[600px]">
          <div className="mt-[90px] text-center">
            <h1 className="m-0  p-0">Extensions Pricing</h1>
            <h4 className="opacity-45 font-medium">
              That&apos;s Great, It Looks Like You Need To Something More Than
              Free
            </h4>
            <div className="mt-10 mb-[10px] flex flex-col md:flex-row gap-2 w-full  md:min-w-[550px] text-center">
              <label
                htmlFor=""
                onClick={() => setPricingMode(0)}
                className={`flex-grow py-5 rounded mx-[13px] md:mx-0  cursor-pointer ${
                  pricingmode === 0
                    ? "bg-synblue border-2 border-solid border-synblue"
                    : "hover:bg-zinc-800 border-2 border-solid border-zinc-600"
                }`}
              >
                Individual Pricing
              </label>
              <label
                htmlFor=""
                onClick={() => setPricingMode(1)}
                className={`flex-grow py-5 rounded mx-[13px] md:mx-0  cursor-pointer ${
                  pricingmode === 1
                    ? "bg-synblue border-2 border-solid border-synblue"
                    : "hover:bg-zinc-800 border-2 border-solid border-zinc-600"
                }`}
              >
                Combo Pricing
              </label>
            </div>
          </div>
          {pricingmode === 0 && (
            <>
              {extidentifiers && (
                <div className="w-[94%] md:w-[600px]  mt-10 ">
                  <input
                    className="py-3 px-4"
                    type="text"
                    name=""
                    id=""
                    placeholder="Type Extension Name Here"
                    onChange={(e) => setsearch(e.target.value)}
                    value={search}
                  />
                  {search && (
                    <div className="mt-2 rounded flex flex-col gap-2 mb-16">
                      {extidentifiers.map((item, index) => {
                        if (
                          item.name.toLowerCase().includes(search.toLowerCase())
                        ) {
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                setSelectedextid(item.identifier);
                                setSelectedextname(item.name);
                                setOnclickmenu(true);
                                setsearch(item.name);
                              }}
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
                        extidentifiers.every(
                          (item) =>
                            !item.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                        ) && (
                          <div className="SlideIn0 bg-zinc-700 text-zinc-500 rounded min-h-[70px] flex flex-row gap-2 items-center px-5 ">
                            <label htmlFor="" className="text-xl font-bold">
                              No Extension Found
                            </label>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          {pricingmode === 1 && (
            <div className="SlideIn0 flex flex-col justify-center items-center w-[90%] border-2 border-zinc-600 border-solid m-10 rounded min-h-[360px]">
              <h3 className="text-zinc-600 m-0 p-0">Not Available Yet</h3>
              <h3 className="text-zinc-600  m-0 p-0">
                Introducing Soon With Multiple Extensions
              </h3>
            </div>
          )}
        </div>
      ) : (
        selectedextid && (
          <div className="relative flex flex-col justify-center items-center SlideIn0 w-full bg-zinc-900 mb-3 rounded min-h-[100px]">
            <label
              htmlFor=""
              className="absolute left-4 top-4 bg-synblue px-6 py-2 rounded cursor-pointer"
            >
              {selectedextname}
            </label>
            <label
              htmlFor=""
              className="flex flex-row gap-2 items-center justify-center cursor-pointer border-2 border-solid border-zinc-600 rounded px-4 py-2 absolute right-4 top-4 hover:bg-zinc-600 transition-all"
              onClick={() => setOnclickmenu(false)}
            >
              <ArrowLeft size={22} weight="bold" /> <span>Back</span>
            </label>
            <PricingSection extid={selectedextid} />
          </div>
        )
      )}
    </>
  );
}

export default ExtensionPricings;
