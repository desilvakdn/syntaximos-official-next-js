"use client";
import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function GoogleRecaptchaWrapper({ children }: { children: React.ReactNode }) {
  const siteKey: string | undefined =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey ?? "NOT DEFINED"}>
      {children}
    </GoogleReCaptchaProvider>
  );
}

export default GoogleRecaptchaWrapper;
