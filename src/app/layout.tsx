import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import NavBar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import GoogleRecaptchaWrapper from "@/components/SingleWrappers/GoogleRecaptchaWrapper";
import { AuthProvider } from "@/components/SingleWrappers/AuthProvider";
import { GlobalPopupProvider } from "@/components/SingleWrappers/MessageWrapper";
import GPop from "@/components/popups/globalpopup";

const inter = Inter({ subsets: ["latin"] });

const Approach = localFont({
  src: [
    {
      path: "../fonts/ApproachMonoTRIAL-Lt.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ApproachMonoTRIAL-Rg.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/ApproachMonoTRIAL-Md.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/ApproachMonoTRIAL-SmBd.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/ApproachMonoTRIAL-Bd.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/ApproachMonoTRIAL-Blk.otf",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Syntaximos",
  description:
    "Make Your Browser More Powerful With Our Browser Extensions And Addons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Approach.className}>
        <GlobalPopupProvider>
          <GPop />
          <AuthProvider>
            <GoogleRecaptchaWrapper>
              <NavBar />
              {children}
              <Footer />
            </GoogleRecaptchaWrapper>
          </AuthProvider>
        </GlobalPopupProvider>
      </body>
    </html>
  );
}
