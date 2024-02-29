"use client";
import React, { useContext } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import BecomeMember from "./becomemember";
import AuthContext from "../SingleWrappers/AuthProvider";
import { usePathname } from "next/navigation";

function NavBar() {
  let menuitems = [
    { label: "Home", route: "/" },
    { label: "Extensions", route: "/extensions" },
    { label: "Pricing", route: "/extensions/pricing" },
    { label: "Contact", route: "/contact" },
  ];
  const [active, setActive] = React.useState(0);

  const { isloggedin, userid, isloading } = useContext(AuthContext);
  const pathname = usePathname();

  return (
    <>
      {((isloggedin &&
        userid &&
        !isloading &&
        !pathname.includes("/member/dashboard")) ||
        (!isloggedin &&
          !isloading &&
          !pathname.includes("/member/dashboard"))) && (
        <div className="flex flex-col gap-6 mb-8 justify-between items-center md:flex-row md:gap-0 md:mb-4 p-[1.3rem]">
          <Link href="/">
            <h2 className={`${styles.sitetitle} m-0 p-0`}>Syntaximos</h2>
          </Link>
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
          <BecomeMember />
        </div>
      )}
    </>
  );
}

export default NavBar;
