"use client";
import Billing from "@/components/Dashboard/Billing/billing";
import ExtensionsDashboard from "@/components/Dashboard/Extensions/extensions";
import Myaddons from "@/components/Dashboard/My Addons/myaddons";
import NewMiniCompo from "@/components/Dashboard/Other/newsminicompo";
import Setting from "@/components/Dashboard/Setting/setting";
import SyntaximosLogo from "@/Icons/syntaximoswordlogo";
import Config from "@/resources/config";
import { motion, AnimatePresence } from "framer-motion";
import {
  BoundingBox,
  Check,
  Confetti,
  CurrencyCircleDollar,
  Envelope,
  EnvelopeSimple,
  Gear,
  Plus,
  SignOut,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { deleteCookie, getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";
import fetchGet from "@/modules/fetchGet";
import fetchPost from "@/modules/fetchPost";
import MyOffers from "@/components/Dashboard/My Offers/myOffers";

function DashboardItems({ params }: { params: { dashpath: "" } }) {
  const { push } = useRouter();
  const { openpopup } = useGlobalPopup();
  const [ispremium, setIspremium] = useState(false);
  const [opennews, setopennews] = useState(false);
  const path = usePathname();
  const [menuitems, setmenuitems] = useState([
    {
      name: "Extensions",
      icon: <BoundingBox size={24} weight="bold" />,
      url: "/member/dashboard/extensions",
      identifier: "extensions",
    },
    {
      name: "My Addons",
      icon: <Plus size={24} weight="bold" />,
      url: "/member/dashboard/myaddons",
      identifier: "myaddons",
    },
    {
      name: "Billing",
      icon: <CurrencyCircleDollar size={24} weight="bold" />,
      url: "/member/dashboard/billing",
      identifier: "billing",
    },
    {
      name: "My Offers",
      icon: <Confetti size={24} weight="bold" />,
      url: "/member/dashboard/myoffers",
      identifier: "myoffers",
    },
    {
      name: "Setting",
      icon: <Gear size={24} weight="bold" />,
      url: "/member/dashboard/setting",
      identifier: "setting",
    },
  ]);
  const [hasoffers, sethasoffers] = useState(0);
  const [isProductHunt, setisProductHunt] = useState(false);

  let [hotnews, sethotnews] = useState({
    headline: "",
    status: false,
    linktext: "",
    link: "",
    id: 34774437,
    content: "",
    forpost: 0,
  });
  const [seefull, setseefull] = useState(false);

  let navlabel = {
    extensions: "Extensions",
    myaddons: "My Addons",
    billing: "Billing",
    myoffers: "My Offers",
    setting: "Setting",
  };

  const [properties, setProperties] = useState({
    activetab: 0,
  });

  const [firstname, setFirstname] = useState("");

  const [news, setnews] = useState([
    {
      id: 0,
      message: "",
      headline: "",
      date: new Date(),
      isread: false,
    },
  ]);

  let class_ = `flex flex-row gap-2 items-center pl-7 cursor-pointer transition-all bg-zinc-800 p-3 hover:bg-synblue hover:p-3 rounded relative`;
  let selectedclass_ = `flex flex-row gap-2 items-center justify-center transition-all bg-synblue p-3 rounded relative`;

  useEffect(() => {
    fetchGet(`dashboard/firstname`, true).then((data) => {
      if (data.status) {
        setFirstname(data.data);
      }
    });

    fetchGet(`user/offer/eligibility`, true).then((e) => {
      if (e.status && e.data && e.data > 0) {
        sethasoffers(e.data);
      }
    });

    fetchGet(`web/producthunt`, true).then((l) => {
      if (l.status && l.switch) {
        setisProductHunt(true);
      } else {
        setisProductHunt(false);
      }
    });
  }, []);

  useEffect(() => {
    fetchGet(`dashboard/news/get`, true).then((data) => {
      if (data.status && data?.data?.length > 0) {
        setnews(data.data);
      } else {
        setnews([
          {
            id: 0,
            message: "",
            headline: "",
            date: new Date(),
            isread: false,
          },
        ]);
      }
    });

    fetchGet(`dashboard/hotnews/get`, true).then(
      (data: {
        refresh: Boolean;
        status: Boolean;
        data: {
          headline: string;
          status: boolean;
          link: string;
          linktext: string;
          content: string;
          forpost: number;
          id: number;
        };
      }) => {
        if (data.status) {
          sethotnews({
            headline: data.data.headline,
            status: data.data.status,
            linktext: data.data.linktext,
            link: data.data.link,
            id: data.data.id, // Convert to string if id is a number
            content: data.data.content,
            forpost: data.data.forpost,
          });
        } else {
          sethotnews({
            headline: "",
            status: false,
            linktext: "",
            link: "",
            id: 34774437,
            content: "",
            forpost: 0,
          });
        }
      }
    );
  }, []);

  useEffect(() => {
    fetchGet(`auth/userdetails`, true).then((data) => {
      if (data.status) {
        setIspremium(data.data.premium);
      }
    });
  }, []);

  async function logout() {
    setProperties({ activetab: 4 });

    try {
      const data = await fetchPost(`auth/logout`, {}, true);

      if (data?.status || data?.expired) {
        deleteCookie("SYNU", {
          path: "/",
          domain: Config().api.includes("localhost")
            ? "localhost"
            : process.env.NEXT_PUBLIC_WEB_URL_COOKIE_DELETION,
        });
        //localStorage.clear();
        window.location.reload();
      } else {
        openpopup("Something Went Wrong", false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function setmarkread(id: number) {
    fetchPost(
      `dashboard/news/markread`,
      {
        messageid: id,
      },
      true
    ).then((data) => {
      if (data.status) {
        //setnews(data.data);
      }
    });
  }

  async function removemessage(id: number) {
    return fetchPost(
      `dashboard/news/delete`,
      {
        messageid: id,
      },
      true
    )
      .then((data) => {
        if (data.status) {
          setnews(data.data);
        }
      })
      .finally(() => {
        return true;
      });
  }

  function hotnewsread() {
    fetchPost(
      `dashboard/hotnews/read`,
      {
        id: hotnews.id,
      },
      true
    )
      .then((data) => {
        if (data.status) {
          openpopup("Message Removed Successfully", true);
          sethotnews({
            headline: "",
            status: false,
            linktext: "",
            link: "",
            id: 34774437,
            content: "",
            forpost: 0,
          });
        } else {
          openpopup("Message Removed Failed", false);
        }
      })
      .finally(() => {
        return true;
      });
  }

  return (
    <>
      {opennews && (
        <div className="fixed top-0 left-0 bottom-0 right-0 z-[2] bg-synblack bg-opacity-65 flex justify-center items-center">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "backInOut" }}
            className={`min-w-[500px] ${
              news[0] && news[0]?.headline ? "min-h-[50%]" : "min-h-[20%]"
            } max-h-[80%] bg-white rounded flex flex-col gap-1 `}
          >
            <div className="text-synblack px-5 relative">
              <h2>Notifications</h2>
              <label
                onClick={() => setopennews(false)}
                htmlFor=""
                className="absolute top-3 right-3 opacity-45 hover:opacity-100 cursor-pointer transition-all"
              >
                <X size={22} weight="bold" />
              </label>
            </div>
            <div className="flex-grow px-4 flex flex-col gap-2 overflow-y-auto py-2">
              {news[0] &&
                news[0]?.headline &&
                news.map((singlenews, index) => {
                  return (
                    <NewMiniCompo
                      key={index}
                      headline={singlenews.headline}
                      markread={singlenews.isread}
                      date={new Date(singlenews.date)}
                      setmarkread={() => setmarkread(singlenews.id)}
                      removemessage={() => removemessage(singlenews.id)}
                      content={singlenews.message}
                    />
                  );
                })}

              {!news[0]?.headline && (
                <div className="text-synblack opacity-60">
                  <label htmlFor="">
                    You Don&apos;t Have Any Announcements
                  </label>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
      <div className="fixed top-3 left-3 right-3 bottom-3 flex flex-row gap-3 ">
        <div className="w-96 max-w-72 flex flex-col bg-zinc-900 rounded p-2 gap-4">
          <div
            onClick={() => push("/")}
            className="text-center w-full flex justify-center items-center py-4 cursor-pointer transition-all hover:scale-[1.04]"
          >
            <SyntaximosLogo width={150} logocolor="#2d5bff" />
            {/* <h2
            onClick={() => push("/")}
            className="transition-all hover:cursor-pointer hover:scale-[1.01]"
          >
            Syntaximos
          </h2> */}
          </div>
          <div className="flex-grow  rounded flex flex-col gap-2 ">
            {menuitems.slice(0, -1).map((item, index) => {
              return (
                <label
                  key={index}
                  onClick={() => push(item.url)}
                  htmlFor=""
                  className={
                    path?.includes(item.identifier) ? selectedclass_ : class_
                  }
                >
                  {item.icon} {item.name}
                  {hasoffers > 0 && item.identifier === "myoffers" && (
                    <div className="absolute right-[0px] top-0">
                      <span className="relative flex ">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-full w-full bg-sky-500 justify-center items-center px-2">
                          {1}
                        </span>
                      </span>
                    </div>
                  )}
                </label>
              );
            })}
          </div>
          {isProductHunt && (
            <div className="relative py-3 px-2 border-[2px] border-dashed border-zinc-500 rounded">
              <span className="flex h-3 w-3 pointer-events-none absolute -top-2 -right-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-400"></span>
              </span>
              <label htmlFor="">
                Fiverr Mate is live on Product Hunt. We need Your help!
              </label>
              <div className="w-full h-[20px]"></div>
              <div
                className="animate-bounce"
                dangerouslySetInnerHTML={{
                  __html: `<a href="https://www.producthunt.com/posts/fiverr-mate?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-fiverr&#0045;mate" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=459165&theme=light" alt="Fiverr&#0032;Mate - Fiverr&#0032;Gig&#0032;SEO&#0032;Tool&#0032;&#0032;To&#0032;Rank&#0032;Higher&#0032;on&#0032;Fiverr&#0032;with&#0032;SEO&#0033; | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>`,
                }}
              ></div>
              <label htmlFor="" className="text-justify">
                Put your Upvote 👆 & show your ❤️ with Fiverr Mate
              </label>
            </div>
          )}
          <div className="flex flex-col gap-2 text-center  rounded">
            <label
              onClick={() => push(menuitems[menuitems.length - 1].url)}
              htmlFor=""
              className={
                path?.includes(menuitems[menuitems.length - 1].identifier)
                  ? selectedclass_
                  : class_
              }
            >
              <Gear size={24} weight="bold" /> Setting
            </label>
            <label onClick={logout} htmlFor="" className={class_}>
              <SignOut size={24} weight="bold" /> Logout
            </label>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3 rounded">
          <div className="h-20 bg-zinc-900  rounded flex flex-row items-center p-4 justify-between">
            <label htmlFor="" className="bg-synblue px-3 py-2 rounded">
              {navlabel[params.dashpath as keyof typeof navlabel]}
            </label>
            <div>
              <button className="relative" onClick={() => setopennews(true)}>
                <Envelope size={26} weight="bold" />
                <span className="absolute top-[-10px] right-[-10px] bg-yellow-500 px-1 rounded text-sm">
                  {!news[0]?.headline
                    ? 0
                    : news.length > 0 &&
                      news.reduce(
                        (acc, curr) => acc + (!curr.isread ? 1 : 0),
                        0
                      )}
                </span>
              </button>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <div className="flex flex-row gap-2 items-center">
                <label htmlFor="">{`Hi ${firstname}`}</label>
              </div>
              {ispremium && (
                <button
                  className="flex flex-row gap-1 items-center"
                  onClick={() =>
                    window.open(
                      "https://join.skype.com/invite/vPQfjOHbv1M3",
                      "_blank"
                    )
                  }
                >
                  <span>Contact</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <path d="M172,152c0,20.19-19.33,36-44,36-21.26,0-39.46-12.35-43.27-29.38a12,12,0,0,1,23.42-5.24C109.3,158.49,117.21,164,128,164c9.44,0,20-5.13,20-12,0-6.37-6.29-9.32-24-14.42-16.14-4.65-38.23-11-38.23-33.58,0-20.52,18.15-36,42.22-36,17.24,0,32.06,8.14,38.69,21.24a12,12,0,1,1-21.41,10.84C142.8,95.17,136,92,128,92c-10.22,0-18.22,5.27-18.22,12,0,1.09,0,2.21,3.28,4.17,4.18,2.48,11,4.45,17.6,6.35,8.75,2.52,17.8,5.13,25.38,9.86C169.23,132.61,172,143.94,172,152Zm64,24a60.07,60.07,0,0,1-60,60A59.36,59.36,0,0,1,144,226.73,101.21,101.21,0,0,1,128,228,100.11,100.11,0,0,1,28,128a101.21,101.21,0,0,1,1.27-16A59.36,59.36,0,0,1,20,80,60.07,60.07,0,0,1,80,20a59.36,59.36,0,0,1,32.05,9.27A101.21,101.21,0,0,1,128,28,100.11,100.11,0,0,1,228,128,101.21,101.21,0,0,1,226.73,144,59.36,59.36,0,0,1,236,176Zm-24,0a35.63,35.63,0,0,0-7.49-22,12,12,0,0,1-2.23-9.87,76.07,76.07,0,0,0-90.43-90.43A12,12,0,0,1,102,51.49,35.63,35.63,0,0,0,80,44,36,36,0,0,0,44,80a35.63,35.63,0,0,0,7.49,22,12,12,0,0,1,2.23,9.87,76.07,76.07,0,0,0,90.43,90.43,12,12,0,0,1,9.87,2.23A35.63,35.63,0,0,0,176,212,36,36,0,0,0,212,176Z"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
          {hotnews.headline && (
            <motion.div
              className={`w-full ${
                hotnews.status ? "bg-lime-300" : "bg-red-400"
              }  rounded flex flex-col gap-1 justify-center text-synblack  `}
            >
              <div className="w-full flex flex-row gap-1 items-center justify-between px-10 py-4 ">
                <div className="flex flex-row gap-1 items-center ">
                  <label htmlFor="">
                    {hotnews.status ? (
                      <Check size={22} weight="bold" />
                    ) : (
                      <X size={22} weight="bold" />
                    )}
                  </label>
                  <label htmlFor="">{hotnews.headline}</label>
                  {hotnews.content && (
                    <button
                      onClick={() =>
                        setseefull((seefull) => (seefull ? false : true))
                      }
                      className="bg-synblack text-synwhite m-0 p-0 px-4 ml-3 hover:bg-synwhite hover:text-synblack"
                    >
                      {seefull ? "See Less" : "See More"}
                    </button>
                  )}
                  {hotnews.link && (
                    <button
                      onClick={() => window.open(hotnews.link, "_blank")}
                      className="bg-synblack text-synwhite m-0 p-0 px-4 ml-3 hover:bg-synwhite hover:text-synblack"
                    >
                      {hotnews.linktext}
                    </button>
                  )}
                </div>
                <button
                  onClick={hotnewsread}
                  className="bg-synblack text-synwhite m-0 p-0 px-4 ml-3 hover:bg-synwhite hover:text-synblack"
                >
                  Mark Read
                </button>
              </div>
              {seefull && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0.6, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="mt-3 bg-lime-100 px-10 py-5"
                  >
                    {hotnews.content}
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          )}
          <div className="w-full h-full flex-grow-1 bg-zinc-900  rounded flex flex-col gap-3 overflow-auto">
            {
              {
                extensions: <ExtensionsDashboard />,
                myaddons: <Myaddons />,
                billing: <Billing />,
                myoffers: <MyOffers />,
                setting: <Setting />,
              }[params.dashpath as keyof typeof navlabel]
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardItems;
