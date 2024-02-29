"use client";
import { useContext, useEffect } from "react";
import AuthContext from "./AuthProvider";
import PageLoader from "../Loader/page";
import { useRouter } from "next/navigation";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const router = useRouter();

    const { isloggedin, userid, isloading } = useContext(AuthContext);

    useEffect(() => {
      if (isloading) {
        // Optional: You might want to handle loading differently
        return;
      }

      if (!isloggedin || !userid) {
        router.push("/member/login");
      }
    }, [isloggedin, userid, isloading, router]);

    if (isloading) {
      return <PageLoader />; // Or return a loading spinner, message, etc.
    }

    if (!isloggedin) {
      return null;
    }

    return <Component {...props} />;
  };
}
