"use client";
import { useContext, useEffect } from "react";
import AuthContext from "./AuthProvider";
import PageLoader from "../Loader/page";
import { useRouter } from "next/navigation";

export default function isNotAuthAdmin(Component: any) {
  return function IsNotAuthAdmin(props: any) {
    const router = useRouter();

    const { isloggedin, userid, isloading, isadmin } = useContext(AuthContext);

    useEffect(() => {
      if (isloading) {
        // Optional: You might want to handle loading differently
        return;
      }

      if (isloggedin && userid && isadmin) {
        router.push("/admin/dashboard");
      } else if (isloggedin && userid && !isadmin) {
        router.push("/member/dashboard");
      }
    }, [isloggedin, userid, isloading, router]);

    if (isloading) {
      return <PageLoader />; // Or return a loading spinner, message, etc.
    }

    if (isloggedin) {
      return null;
    }

    return <Component {...props} />;
  };
}
