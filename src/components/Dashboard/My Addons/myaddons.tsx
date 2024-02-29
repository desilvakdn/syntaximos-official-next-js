import LoadingDots from "@/components/Animations/LoadingDots/page";
import React, { useEffect, useState } from "react";
import SingleExtension from "../Extensions/singleextension";
import SingleAddon from "./singleaddon";
import CancelPremium from "./cancelpremium";
import { getCookie } from "cookies-next";
import Config from "@/resources/config";

interface Extension {
  icon: string;
  identifier: string;
  name: string;
  premium: boolean;
  tagline: string;
  description: string;
  version: string;
}

function Myaddons() {
  const [cancelprop, setcancelprop] = useState({
    iscancel: false,
    identifier: "",
    name: "",
  });
  const [ext, setExt] = useState<Extension[]>([
    {
      icon: "",
      identifier: "",
      name: "",
      premium: false,
      tagline: "",
      description: "",
      version: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let accesstoken = getCookie("syn_a");
    if (!accesstoken) {
      setLoading(false);
      return;
    }
    fetch(`${Config().api}/dashboard/myaddons`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.refresh) {
          window.location.reload();
        } else if (data.status) {
          setExt(data.data);
        }
        setLoading(false);
      });
  }, []);

  return (
    <>
      {cancelprop.iscancel ? (
        <CancelPremium
          identifier={cancelprop.identifier}
          name={cancelprop.name}
          back={() =>
            setcancelprop({
              iscancel: false,
              identifier: "",
              name: "",
            })
          }
        />
      ) : (
        <div className="p-8 flex flex-col flex-grow">
          <div>
            <h2>My Addons</h2>
            <label htmlFor="">
              You Can Manage Your Addons And Subscriptions
            </label>
          </div>
          {loading ? (
            <div className="w-full flex-grow flex justify-center items-center">
              <LoadingDots width={30} fill="var(--synwhite)" />
            </div>
          ) : (
            <div className="mt-5">
              {ext.map((item, index) => {
                return (
                  <SingleAddon
                    key={index}
                    item={item}
                    cancelsub={() =>
                      setcancelprop({
                        iscancel: true,
                        identifier: item.identifier,
                        name: item.name,
                      })
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Myaddons;
