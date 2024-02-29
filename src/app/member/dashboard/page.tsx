"use client";
import PageLoader from "@/components/Loader/page";
import isAuth from "@/components/SingleWrappers/AuthWrapperProtected";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect } from "react";

function Dashboard() {
  const path = usePathname();
  const { push } = useRouter();
  useLayoutEffect(() => {
    if (path === "/member/dashboard") {
      push("/member/dashboard/extensions");
    }
  }, [path, push]);
  return <PageLoader />;
}

export default isAuth(Dashboard);
