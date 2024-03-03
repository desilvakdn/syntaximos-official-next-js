"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";
import ConfirmBasic from "@/components/popups/ConfirmBasic/page";
import PopUpBasic from "@/components/popups/PopUpBasic/page";
import Config from "@/resources/config";
import {
  Check,
  CrownSimple,
  Fan,
  Key,
  NavigationArrow,
  PlusCircle,
  Sparkle,
  Star,
  Trash,
  User,
} from "@phosphor-icons/react/dist/ssr";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function SingleAddon({
  item,
  cancelsub,
  setactiveextension,
  setactiveextensionid,
  setsecretkey,
  setkeyschecker,
  setrequestkeypopup,
}: {
  item: any;
  cancelsub: () => void;
  setrequestkeypopup: React.Dispatch<React.SetStateAction<boolean>>;
  setkeyschecker: React.Dispatch<React.SetStateAction<boolean>>;
  setactiveextension: React.Dispatch<React.SetStateAction<string>>;
  setactiveextensionid: React.Dispatch<React.SetStateAction<string>>;
  setsecretkey: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { push } = useRouter();
  const { openpopup } = useGlobalPopup();

  const [props, setProps] = useState({
    check: true,
    isloadingremove: false,
    popupprops: {
      ispopup: false,
      header: "",
      body: "",
    },
    confirmpremiumcancel: false,
  });

  const [iscancelatend, setIscancelatend] = useState(false);

  const [iscancellingpremium, setIscancellingpremium] = useState(false);

  useEffect(() => {
    let accesstoken = getCookie("syn_a");
    fetch(`${Config().api}/dashboard/pastkey/${item.identifier}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setkeyschecker(false);
        if (data.refresh) {
          window.location.reload();
        } else if (data.status) {
          setsecretkey(data.key);
        } else {
          setsecretkey("");
        }
      });
  }, []);

  function RemoveExtension(identifier: string, ispremium: boolean) {
    if (props.isloadingremove) {
      return;
    }

    let accesstoken = getCookie("syn_a");
    if (!accesstoken) {
      return;
    }

    if (ispremium) {
      setProps({
        ...props,
        popupprops: {
          ispopup: true,
          header: "Cancel Premium First",
          body: "Before removing a addon you need to cancel the premium subscription first.",
        },
      });
      return;
    }

    setProps({ ...props, isloadingremove: true });
    fetch(`${Config().api}/dashboard/extension/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
      body: JSON.stringify({ identifier }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status && data.refresh) {
          openpopup("Extension Removed Successfully", true);

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }

        setProps({ ...props, isloadingremove: false });
      })
      .catch((e) => {
        openpopup("An Error Occured", false);
        setProps({ ...props, isloadingremove: false });
      });
  }

  function CancelPremium() {
    let accesstoken = getCookie("syn_a");
    if (!accesstoken) {
      return;
    }

    console.log("Cancelling Premium");
    setIscancellingpremium(true);
    setTimeout(() => {
      setIscancellingpremium(false);
      cancelsub();
    }, 2000);
  }

  function ManagePremium() {
    let accesstoken = getCookie("syn_a");
    if (!accesstoken) {
      return;
    }
    setIscancellingpremium(true);

    fetch(`${Config().api}/stripe/managebilling`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIscancellingpremium(false);
        if (data.refresh) {
          window.location.reload();
        } else if (data.status) {
          window.open(data.url, "_blank");
        }
      });
  }

  useEffect(() => {
    const acc_token = getCookie("syn_a");
    fetch(`${Config().api}/stripe/subend/${item.identifier}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${acc_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.iscancel) {
          setIscancelatend(true);
        } else if (data.status && !data.iscancel) {
          setIscancelatend(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      {props.popupprops.ispopup && (
        <PopUpBasic
          header={props.popupprops.header}
          body={props.popupprops.body}
          close={() =>
            setProps({
              ...props,
              popupprops: {
                ispopup: false,
                header: "",
                body: "",
              },
            })
          }
        />
      )}
      {props.confirmpremiumcancel && (
        <ConfirmBasic
          header="Are You Sure?"
          body="Cancelling the premium will block premium features of the addon. Are you sure you want to cancel the premium? This action cannot be undone."
          close={() =>
            setProps({
              ...props,
              confirmpremiumcancel: false,
            })
          }
          confirm={() => CancelPremium()}
        />
      )}
      <div
        className={`SlideIn0 transition-all  w-[470px] text-synblack p-5 rounded relative hover:scale-[1.01] ${
          iscancelatend
            ? "border-2 border-solid border-red-600 bg-red-200"
            : "bg-synwhite"
        }`}
      >
        {iscancelatend && (
          <label
            htmlFor=""
            className="absolute top-[-10px] left-1/2 translate-x-[-50%] translate-y-0 text-[12px] bg-red-600 text-synwhite py-[3px] px-5 rounded hover:bg-red-500 transition-all cursor-pointer"
          >
            Pending Cancel
          </label>
        )}
        <label
          htmlFor=""
          className="absolute top-2 right-3 bg-slate-300 text-slate-600 p-1 px-2 rounded"
        >
          {item.version}
        </label>
        <div className="flex flex-row gap-3 items-center mb-3">
          <div className="w-[90px] h-[90px] bg-synblue rounded-full">
            <Image src={item.icon} alt={item.name} width={90} height={90} />
          </div>
          <div>
            <h3 className="m-0 p-0">{item.name}</h3>
            <label htmlFor="" className="opacity-55">
              {item.tagline}
            </label>
            <label
              htmlFor=""
              className={`${
                item.premium ? "bg-syngold" : "bg-synblue"
              } p-1 px-3 rounded flex flex-row gap-1 items-center`}
            >
              {item.premium ? (
                <>
                  <CrownSimple size={18} weight="fill" /> Premium Plan
                </>
              ) : (
                <>
                  <Fan size={18} weight="fill" /> Free Plan
                </>
              )}
            </label>
          </div>
        </div>
        <label htmlFor="" className="opacity-60">
          {item.description}
        </label>
        <div className="mt-3 flex flex-row gap-2 w-full">
          <button
            onClick={() => RemoveExtension(item.identifier, item.premium)}
            className="bg-synblue text-synwhite flex flex-row gap-1 items-center justify-center hover:bg-blue-800"
          >
            {props.isloadingremove ? (
              <>
                Removing <LoadingDots width={20} fill="var(--synwhite)" />
              </>
            ) : (
              <>
                <Trash size={22} weight="bold" /> Remove
              </>
            )}
          </button>

          {item.premium ? (
            <button
              onClick={ManagePremium}
              className="bg-syngold text-amber-900 flex flex-row gap-1 items-center justify-center hover:bg-orange-400 hover:text-amber-900"
            >
              {iscancellingpremium ? (
                <>
                  Processing <LoadingDots width={20} fill="#78350f" />
                </>
              ) : (
                <>
                  <CrownSimple size={22} weight="bold" /> Manage Billing
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => push(`/extensions/pricing/${item.identifier}`)}
              className="bg-syngold text-amber-900 flex flex-row gap-1 items-center justify-center hover:bg-orange-400 hover:text-amber-900"
            >
              <CrownSimple size={22} weight="bold" /> Subscribe
            </button>
          )}
          <button
            onClick={() => {
              setrequestkeypopup(true);
              setactiveextension(item.name);
              setactiveextensionid(item.identifier);
            }}
            className="bg-synblack text-synwhite flex flex-row gap-1 items-center justify-center"
          >
            <Key size={22} weight="bold" />
            Get Login Key
          </button>
        </div>
      </div>
    </>
  );
}

export default SingleAddon;
