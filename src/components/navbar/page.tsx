"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import BecomeMember from "./becomemember";
import { usePathname, useRouter } from "next/navigation";
import SyntaximosLogo from "@/Icons/syntaximoswordlogo";
import { List } from "@phosphor-icons/react/dist/ssr";
import VerifyLogin from "@/utils/verifylogin";

type DecodedJWT = {
  firstname: string;
  lastname: string;
  id: string;
  iat: number;
  exp: number;
  // ... other properties
};

function NavBar() {
  const [session, setsession] = useState<DecodedJWT | null>(null);
  const { push } = useRouter();
  let menuitems = [
    { label: "Home", route: "/" },
    { label: "Extensions", route: "/extensions" },
    { label: "Pricing", route: "/extensions/pricing" },
    { label: "Contact", route: "/contact" },
  ];
  const [ismenuactive, setismenuactive] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const session = VerifyLogin();
    setsession(session as DecodedJWT | null);
  }, []);

  return (
    <>
      {!(
        session &&
        (pathname?.includes("/member/dashboard") ||
          pathname?.includes("/admin/dashboard"))
      ) && (
        <div className="transition-all flex flex-col gap-6 mb-3 justify-between items-center md:flex-row md:gap-0 md:mb-4 px-[20px] py-[20px] md:px-[1.3rem] md:py-[1.3rem]">
          <div className="w-full md:w-fit flex flex-row justify-between">
            <label
              className="cursor-pointer"
              htmlFor=""
              onClick={() => push("/")}
            >
              <SyntaximosLogo width={140} fill="white" logocolor={"#1288ff"} />
            </label>
            {/* <h2 className={`${styles.sitetitle} m-0 p-0`}>Syntaximos</h2> */}
            <label
              htmlFor=""
              onClick={() =>
                setismenuactive((ismenuactive) => (ismenuactive ? false : true))
              }
              className={`transition-all cursor-pointer md:hidden ${
                ismenuactive && "rotate-90"
              }`}
            >
              <List size={32} weight="bold" />
            </label>
          </div>

          <ul className="hidden md:flex flex-row justify-center items-center gap-3">
            {menuitems.map((item, index) => {
              return (
                <li
                  onClick={() => push(item.route)}
                  className={`transition-all cursor-pointer ${
                    pathname === item.route
                      ? "bg-synblue py-1 px-4 rounded"
                      : "hover:bg-synblue hover:py-1 hover:px-4 hover:rounded"
                  }`}
                  key={item.label.toLowerCase()}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
          <div className="hidden md:block">
            <BecomeMember session={session} />
          </div>

          {ismenuactive && (
            <>
              <ul className="flex flex-row justify-center items-center gap-3">
                {menuitems.map((item, index) => {
                  return (
                    <Link key={item.label.toLowerCase()} href={item.route}>
                      <li
                        className={`transition-all ${
                          pathname === item.route
                            ? "bg-synblue py-1 px-4 rounded"
                            : "hover:bg-synblue hover:py-1 hover:px-4 hover:rounded"
                        }`}
                        key={item.label.toLowerCase()}
                      >
                        {item.label}
                      </li>
                    </Link>
                  );
                })}
              </ul>
              <BecomeMember session={session} />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default NavBar;
