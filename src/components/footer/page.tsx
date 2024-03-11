"use client";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../SingleWrappers/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import Config from "@/resources/config";

interface ExtDetailsResponse {
  status: boolean;
  data: any[]; // Change `any` to a more specific type if possible
}

interface ExtensionData {
  name: any;
  identifier: any;
}

function Footer() {
  const { isloggedin, userid } = useContext(AuthContext);
  const pathname = usePathname();
  const { push } = useRouter();
  const [extensiondata, setextensiondata] = useState<ExtensionData[]>([]);
  const [hasmoreext, sethasmoreext] = useState(false);

  useEffect(() => {
    fetch(`${Config().api}/web/extensions`)
      .then((i) => i.json())
      .then((data: ExtDetailsResponse) => {
        if (data.status) {
          let r = data.data.map((item) => ({
            name: item.name,
            identifier: item.identifier,
          }));
          r = shuffleArray(r);
          if (r.length > 4) {
            sethasmoreext(true);
          }
          setextensiondata(r.length > 4 ? r.slice(4) : r);
        }
      });
  }, []);

  let legal = [
    {
      name: "Terms Of Use",
      url: "/legal/terms-of-use",
    },
    {
      name: "Privacy Policy",
      url: "/legal/privacy-policy",
    },
    {
      name: "Refund Policy",
      url: "/legal/refund-policy",
    },
    {
      name: "For Any Inquiry",
      url: "/contact",
    },
  ];

  return (
    <>
      {!(
        isloggedin &&
        (pathname.includes("/member/dashboard") ||
          pathname.includes("/admin/dashboard"))
      ) && (
        <div className="mt-auto bg-zinc-900 min-h-72 rounded flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 p-8">
            <div className="flex flex-col justify-center items-center text-center md:justify-start md:items-start md:text-left">
              <h2>Syntaximos</h2>
              <p className="lg:mr-36 opacity-50 pr-[25px] lg:pr-0 text-justify">
                Discover secure, time-saving Chrome extensions that automate
                tasks, unlock web features, and supercharge productivity. Trust
                in our commitment to safety and data protection. Try now and
                upgrade to premium for even more benefits!
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h3>Extensions</h3>
              <ul>
                {extensiondata.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => push(`/extensions/${item.identifier}`)}
                    >
                      <label
                        htmlFor=""
                        className="hover:scale-[1.1] transition-all hover:text-synblue cursor-pointer"
                      >
                        {item.name}
                      </label>
                    </li>
                  );
                })}
              </ul>
              {hasmoreext && (
                <button className="p-0 px-5 py-1 mt-2">view All</button>
              )}
            </div>
            <div className="flex flex-col md:items-start items-center ">
              <h3>Legal</h3>
              <ul className="flex flex-col justify-center items-center md:justify-start md:items-start">
                {legal.map((item, index) => (
                  <li
                    key={index}
                    className="opacity-50 hover:opacity-100 hover:text-synblue transition-all cursor-pointer"
                  >
                    <label
                      htmlFor=""
                      onClick={() => push(item.url)}
                      className="cursor-pointer"
                    >
                      {item.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 pb-8">
            <div className="flex flex-row gap-2">
              <label
                htmlFor=""
                className="hover:scale-[1.1] transition-all hover:text-synblue cursor-pointer"
              >
                <FacebookLogo size={32} weight="fill" />
              </label>
              <label
                htmlFor=""
                className="hover:scale-[1.1] transition-all hover:text-red-500 cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://www.youtube.com/channel/UCxEYRHGmlsBVuLgPVHUvMrg",
                    "_blank"
                  )
                }
              >
                <YoutubeLogo size={32} weight="fill" />
              </label>
              <label
                htmlFor=""
                className="hover:scale-[1.1] transition-all hover:text-pink-500 cursor-pointer"
              >
                <InstagramLogo size={32} weight="fill" />
              </label>
              <label
                htmlFor=""
                className="hover:scale-[1.1] transition-all hover:text-blue-400 cursor-pointer"
              >
                <TwitterLogo size={32} weight="fill" />
              </label>
            </div>
            <label className="text-center mt-2 px-10">
              Copyright © 2023-2024 Syntaximos. All Rights Reserved
            </label>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;

function shuffleArray(array: any[]) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
