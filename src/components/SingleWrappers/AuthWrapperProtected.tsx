"use client";
import { useContext, useEffect } from "react";
import AuthContext from "./AuthProvider";
import PageLoader from "../Loader/page";
import { usePathname, useRouter } from "next/navigation";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const path = usePathname();
    const router = useRouter();

    const { isloggedin, userid, isloading, isadmin } = useContext(AuthContext);

    useEffect(() => {
      if (isloading) {
        // Optional: You might want to handle loading differently
        return;
      }

      if (
        isloggedin &&
        userid &&
        isadmin &&
        path.includes("/member/dashboard")
      ) {
        router.push("/admin/dashboard");
      } else if (
        isloggedin &&
        userid &&
        !isadmin &&
        path.includes("/admin/dashboard")
      ) {
        router.push("/member/dashboard");
      } else if (!isloggedin || !userid) {
        router.push("/member/login");
      }
    }, [isloggedin, userid, isloading, isadmin]);

    if (isloading) {
      return <PageLoader />; // Or return a loading spinner, message, etc.
    }

    if (!isloggedin) {
      return null;
    }

    return <Component {...props} />;
  };
}
