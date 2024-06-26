"use client";
import PageLoader from "@/components/Loader/page";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Dashboard() {
  const path = usePathname();
  const { push } = useRouter();

  useEffect(() => {
    if (path === "/member/dashboard") {
      push("/member/dashboard/extensions");
    }
  }, [path]);

  return <PageLoader />;
}

export default Dashboard;
