"use client";
import LoadingDots from "@/components/Animations/LoadingDots/page";
import { useGlobalPopup } from "@/components/SingleWrappers/MessageWrapper";
import Config from "@/resources/config";
import { DotsThreeOutline } from "@phosphor-icons/react/dist/ssr";
import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";

interface SinglePaymentCardProps {
  id: string;
  primary: boolean;
  cusid: string;
  name: string;
  card: {
    type: string;
    status: boolean;
    exp_month: number;
    exp_year: number;
    funding: string;
    lastnum: string | number;
  };
}

function SinglePaymentCard({ data }: { data: SinglePaymentCardProps }) {
  const [clickeddots, setClickeddots] = useState(false);
  const popupRef = useRef(null);
  const { openpopup } = useGlobalPopup();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !(popupRef.current as unknown as Node).contains(event.target as Node)
      ) {
        setClickeddots(false);
      }
    };

    if (clickeddots) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickeddots]);

  const [props, setprops] = useState({
    ismakingprimary: false,
    isremovingcard: false,
  });

  function makeprimary() {
    if (props.ismakingprimary || props.isremovingcard || data.primary) {
      return;
    }

    let accesstoken = getCookie("syn_a");
    setprops({ ...props, ismakingprimary: true });
    fetch(`${Config().api}/stripe/setprimarypm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
      body: JSON.stringify({ id: data.id }),
    })
      .then((e) => e.json())
      .then((data) => {
        console.log(data);
        if (data.refresh) {
          window.location.reload();
        } else if (data.status) {
          openpopup("Card Set As Primary", true);
        } else {
          openpopup("Failed to Set As Primary", false);
        }
        setprops({ ...props, ismakingprimary: false });
        setClickeddots(false);
      });
  }

  function removecard() {
    if (props.isremovingcard || props.ismakingprimary || data.primary) {
      return;
    }
    setprops({ ...props, isremovingcard: true });

    let accesstoken = getCookie("syn_a");
    fetch(`${Config().api}/stripe/removecard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
      body: JSON.stringify({
        id: data.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setprops({ ...props, isremovingcard: false });
        if (data.refresh) {
          window.location.reload();
        } else if (data.status) {
          openpopup("Card Removed Successfully", true);
        } else {
          openpopup("Failed to Remove Card", false);
        }
        setClickeddots(false);
        setprops({ ...props, isremovingcard: false });
      });
  }
  return (
    <div
      className={`${
        data.primary ? "bg-lime-700 text-synwhite" : "bg-zinc-800"
      } w-[400px] h-[200px] rounded p-5 relative`}
    >
      {clickeddots && (
        <div
          ref={popupRef}
          className="absolute flex flex-col gap-2 bg-zinc-200 text-synblack  rounded right-4 top-14"
        >
          <label
            htmlFor=""
            className={`transition-all ${
              data.primary
                ? "cursor-default hover:bg-synwhite text-zinc-400"
                : "cursor-pointer hover:bg-synblue"
            } p-3 rounded-t flex flex-row items-center gap-2`}
            onClick={makeprimary}
          >
            {props.ismakingprimary ? (
              <>
                Processing <LoadingDots width={20} fill="var(--synblack)" />
              </>
            ) : (
              "Make Primary"
            )}
          </label>
          <label
            htmlFor=""
            className={`transition-all ${
              data.primary
                ? "cursor-default hover:bg-synwhite text-zinc-400"
                : "cursor-pointer hover:bg-synblue"
            } p-3 rounded-t flex flex-row items-center gap-2`}
            onClick={removecard}
          >
            {props.isremovingcard ? (
              <>
                Processing <LoadingDots width={20} fill="var(--synblack)" />
              </>
            ) : (
              "Remove Card"
            )}
          </label>
        </div>
      )}
      <div className="flex flex-row justify-between">
        <label htmlFor="">{data.card.type}</label>

        {data.primary ? (
          <label htmlFor="">Primary</label>
        ) : (
          <label
            htmlFor=""
            className="transition-all hover:opacity-60 cursor-pointer"
            onClick={() => setClickeddots(!clickeddots)}
          >
            <DotsThreeOutline size={32} weight="fill" />
          </label>
        )}
      </div>
      <div className="flex flex-row gap-5 items-center">
        <h2>****</h2>
        <h2>****</h2>
        <h2>****</h2>
        <h2>{data.card.lastnum}</h2>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <label htmlFor="">Name</label>
          <label htmlFor="">{data.name}</label>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Expire On</label>
          <label htmlFor="">{`${data.card.exp_month}/${data.card.exp_year}`}</label>
        </div>
      </div>
    </div>
  );
}

export default SinglePaymentCard;
