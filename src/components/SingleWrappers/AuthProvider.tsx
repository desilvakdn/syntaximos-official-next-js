"use client";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";
import PageLoader from "../Loader/page";
import Config from "@/resources/config";
import { usePathname } from "next/navigation";

const AuthContext = createContext({
  isloggedin: false,
  userid: "",
  isloading: true,
  isadmin: false,
});

export const AuthProvider = ({ children }: { children: any }) => {
  const pathname = usePathname();
  const [accesstoken, setAccesstoken] = useState("");
  const [userid, setUserId] = useState("");
  const [isloggedin, setIsloggedin] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const [isadmin, setIsAdmin] = useState(false);

  function setloading(status: boolean) {
    setTimeout(() => {
      setIsloading(status);
    }, 1000);
  }

  useEffect(() => {
    const accesstoken = getCookie("syn_a");
    const refreshtoken = getCookie("syn_r");
    const admintoken = getCookie("syn_admin");
    if (accesstoken && refreshtoken) {
      try {
        let x = jwtDecode(accesstoken);
        let y = jwtDecode(refreshtoken);
        fetch(
          `${Config().api}/auth/token/refresh/${refreshtoken}/${accesstoken}`
        )
          .then((res) => res.json())
          .then((data) => {
            setloading(false);
            if (data.status) {
              setCookie("syn_a", data.tokens.accesstoken);
              let x: {
                id: string;
              } = jwtDecode(data.tokens.accesstoken);
              setUserId(x.id);
              setIsloggedin(true); // Fix: Update type of isloggedin state variable
            } else {
              setIsloggedin(false); // Fix: Update type of isloggedin state variable
              deleteCookie("syn_a");
              deleteCookie("syn_r");
            }
          });
      } catch (error) {
        setIsloggedin(false);
        setloading(false);
      }
    } else if (admintoken) {
      try {
        fetch(`${Config().api}/admin/verifytoken/${admintoken}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.status) {
              setIsAdmin(true);
              let x: {
                id: string;
              } = jwtDecode(admintoken);
              setUserId(x.id);
              setIsloggedin(true); // Fix: Update type of isloggedin state variable
            } else {
              setIsloggedin(false); // Fix: Update type of isloggedin state variable
              deleteCookie("syn_admin");
            }

            setloading(false);
          });
      } catch (error) {
        deleteCookie("syn_admin");
        setIsloggedin(false);
        setloading(false);
      }
    } else {
      setIsloggedin(false);
      setloading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isloggedin, userid, isloading, isadmin }}>
      {isloading && pathname.includes("member/dashboard") ? (
        <PageLoader />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;
