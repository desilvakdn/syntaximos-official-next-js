"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import fetchPost from "@/modules/fetchPost";
import Config from "@/resources/config";
import VerifyLogin from "@/utils/verifylogin";
import {
  Check,
  CrownSimple,
  NavigationArrow,
  PlusCircle,
  Sparkle,
  Star,
  User,
} from "@phosphor-icons/react/dist/ssr";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SingleExtension({
  item,
  setpopupinstall,
  setexturl,
}: {
  item: any;
  setpopupinstall: React.Dispatch<React.SetStateAction<boolean>>;
  setexturl: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { push } = useRouter();

  const [props, setProps] = useState({
    check: true,
    isloadingaddfree: false,
  });

  function AddExtensionFree(identifier: string) {
    if (props.isloadingaddfree) {
      return;
    }

    let usersession = VerifyLogin();
    if (!usersession) return;

    setProps({ ...props, isloadingaddfree: true });
    fetchPost("dashboard/extension/add", { identifier }, true).then((data) => {
      if (data.status) {
        window.location.reload();
      }

      setProps({ ...props, isloadingaddfree: false });
    });
  }
  return (
    <div className="SlideIn0 transition-all bg-synwhite w-[470px] text-synblack p-5 rounded relative hover:scale-[1.01]">
      <div className="absolute top-2 right-3 flex flex-row gap-1">
        <label
          htmlFor=""
          className=" bg-slate-300 text-slate-600 p-1 px-2 rounded"
        >
          {item.version}
        </label>
        {item.added && (
          <label
            htmlFor=""
            className=" bg-lime-600 text-lime-950 p-1 px-2 rounded cursor-pointer hover:bg-lime-500 hover:text-lime-950 transition-all"
            onClick={() => {
              setpopupinstall(true);
              setexturl(item.link || "");
            }}
          >
            Install
          </label>
        )}
      </div>
      <div className="flex flex-row gap-3 items-center mb-3">
        <div className="w-[90px] h-[90px] bg-synblue rounded-full">
          <Image src={item.icon} alt={item.name} width={90} height={90} />
        </div>
        <div>
          <h3 className="m-0 p-0">{item.name}</h3>
          <label htmlFor="" className="opacity-55">
            {item.tagline}
          </label>
          <div className="mt-2 flex flex-row gap-2 items-center">
            <label
              htmlFor=""
              className="bg-synblue p-1 px-3 rounded flex flex-row gap-1 items-center"
            >
              <Star size={18} weight="fill" /> {item.rating}
            </label>
            <label
              htmlFor=""
              className="bg-synblue p-1 px-3 rounded flex flex-row gap-1 items-center"
            >
              <User size={18} weight="fill" /> {`${item.users}+`}
            </label>
          </div>
        </div>
      </div>
      <label htmlFor="" className="opacity-60">
        {item.description}
      </label>
      <div className="mt-3 flex flex-row gap-2 w-full flex-wrap">
        {item.added ? (
          <button className="flex-grow bg-lime-600 text-lime-900 flex flex-row gap-1 items-center justify-center hover:bg-lime-600 hover:text-lime-900 hover:cursor-default">
            <Check size={22} weight="bold" /> Added
          </button>
        ) : (
          <button
            onClick={() => AddExtensionFree(item.identifier)}
            className="flex-grow bg-synblue text-synwhite flex flex-row gap-1 items-center justify-center hover:bg-blue-800"
          >
            {props.isloadingaddfree ? (
              <>
                Adding <LoadingDots width={20} fill="var(--synwhite)" />
              </>
            ) : (
              <>
                <PlusCircle size={22} weight="bold" /> Add Free
              </>
            )}
          </button>
        )}
        {item.premium ? (
          <button className="flex-grow bg-slate-400 text-slate-600 flex flex-row gap-1 items-center justify-center hover:bg-slate-400 hover:text-slate-600 hover:cursor-default">
            <Sparkle size={22} weight="bold" /> Subscribed
          </button>
        ) : (
          <Link href={`/extensions/pricing/${item.identifier}`}>
            <button className="flex-grow bg-syngold text-amber-900 flex flex-row gap-1 items-center justify-center hover:bg-orange-400 hover:text-amber-900">
              <CrownSimple size={22} weight="bold" /> Get Premium
            </button>
          </Link>
        )}
        <button
          onClick={() => push(`/extensions/${item.identifier}`)}
          className="flex-grow bg-synblack text-synwhite flex flex-row gap-1 items-center justify-center"
        >
          <NavigationArrow size={22} weight="bold" />
          See More
        </button>
      </div>
    </div>
  );
}

export default SingleExtension;
