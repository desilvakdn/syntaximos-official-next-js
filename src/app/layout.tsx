import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import NavBar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import GoogleRecaptchaWrapper from "@/components/SingleWrappers/GoogleRecaptchaWrapper";
import { GlobalPopupProvider } from "@/components/SingleWrappers/MessageWrapper";
import GPop from "@/components/popups/globalpopup";

const montserrat = Montserrat({ subsets: ["latin"] });

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101010",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://syntaximos.com"),
  icons: [
    `${process.env.NEXT_PUBLIC_WEB_URL}/webicons/icon16.png`,
    `${process.env.NEXT_PUBLIC_WEB_URL}/webicons/icon32.png`,
    `${process.env.NEXT_PUBLIC_WEB_URL}/webicons/icon128.png`,
  ],
  title: {
    default: "Syntaximos | Develops Chrome Extensions for Your Productivity",
    template: "%s | Syntaximos",
  },
  description: `Welcome to Syntaximos. We develop best powerful Chrome Extensions for improving your productivity. Discover the collection of web browser extensions in ${new Date().getFullYear()} for task management, research, automation, and more. Optimize your web experience today!`,
  openGraph: {
    url: process.env.NEXT_PUBLIC_WEB_URL,
    siteName: "Syntaximos | Develops Chrome Extensions for Your Productivity",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  keywords: [
    "Chrome extensions",
    "Fiverr Mate",
    "Productivity extensions",
    "Chrome web store",
    "Browser extensions",
    "Efficiency tools",
    "Task management extensions",
    "Automation extensions",
    "Research extensions",
    "Time-saving extensions",
    "software",
    "addons",
    "Syntaximos",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <GlobalPopupProvider>
          <GPop />
          <GoogleRecaptchaWrapper>
            <NavBar />
            {children}
            <Footer />
          </GoogleRecaptchaWrapper>
        </GlobalPopupProvider>
      </body>
    </html>
  );
}
