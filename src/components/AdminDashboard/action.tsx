"use client";
import Config from "@/resources/config";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import LoadingDots from "../Animations/LoadingDots/page";
import Image from "next/image";
import { useGlobalPopup } from "../SingleWrappers/MessageWrapper";

function AdminAction() {
  const { openpopup } = useGlobalPopup();
  const [isloading, setloading] = useState(true);
  const [checkedoption, setcheckedoption] = useState(0);
  const [checkedoptionstatus, setcheckedoptionstatus] = useState(0);
  const [issubmitting, setissubmitting] = useState(false);
  const [issubmittingupdate, setissubmittingupdate] = useState(false);
  const [issubmittinghotpost, setissubmittinghotpost] = useState(false);
  const [includelink, setincludelink] = useState(false);
  const [newmsg, setnewmsg] = useState(false);
  const [newupdate, setnewupdate] = useState(false);
  const [newhotpost, setnewhotpost] = useState(false);
  const [extselectedname, setextselectedname] = useState("");
  const [allextensions, setallextensions] = useState([
    {
      name: "Fiverr Mate",
      identifier: "fiverr_mate",
      logo: "https://res.cloudinary.com/ds2kpgq2e/image/upload/v1706989493/Syntaximos/Extension%20Logos/fiverrmate_uw89qq.png",
    },
  ]);
  const [data, setdata] = useState([
    {
      label: "Total Users",
      count: 39000,
    },
    {
      label: "Users Today",
      count: 200,
    },
    {
      label: "Today Orders",
      count: 200,
    },
  ]);

  const [message, setmessage] = useState({
    headline: "",
    content: "",
    specific: "",
  });
  const [extupdate, setextupdate] = useState({
    identifier: "",
    version: "",
  });
  const [hotnewsmessage, sethotnewsmessage] = useState({
    headline: "",
    status: false,
    link: "",
    linktext: "",
    readby: [],
  });

  useEffect(() => {
    const token = getCookie("syn_admin");
    fetch(`${Config().api}/admin/overview`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: { status: Boolean; data: any[] }) => {
        setloading(false);
        if (data.status) {
          setdata(data.data);
        } else {
        }
      });
  }, []);

  function submitmessage() {
    if (issubmitting) return;
    setissubmitting(true);
    const data = { ...message, option: checkedoption };

    if (
      !data.headline ||
      !data.content ||
      (data.option === 3 && !data.specific)
    )
      return;

    const token = getCookie("syn_admin");
    fetch(`${Config().api}/admin/news/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          openpopup("Successfully Submitted", true);
        } else {
          openpopup("Something Went Wrong", false);
        }

        setissubmitting(false);
      });
  }

  function submitupdate() {
    if (issubmittingupdate) return;
    setissubmittingupdate(true);

    const data = extupdate;

    if (!data.identifier || !data.version) return;

    const token = getCookie("syn_admin");
    fetch(`${Config().api}/admin/news/notifyupdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          openpopup("Successfully Submitted", true);
        } else {
          openpopup("Something Went Wrong", false);
        }

        setissubmittingupdate(false);
      });
  }

  function submithotmessage() {
    if (issubmittinghotpost) return;
    setissubmittinghotpost(true);

    let data: {
      headline: string;
      status: boolean;
      link?: string;
      linktext?: string;
      readby: never[];
    } = hotnewsmessage;

    if (
      !data.headline ||
      (includelink && !data.link) ||
      (includelink && !data.linktext)
    )
      return;

    if (!includelink) {
      let { link, linktext, ...newdata } = data;
      data = { ...data, link: "", linktext: "" };
    }

    const token = getCookie("syn_admin");
    fetch(`${Config().api}/admin/hotnews/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post: data }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          openpopup("Successfully Submitted", true);
        } else {
          openpopup("Something Went Wrong", false);
        }

        setissubmittinghotpost(false);
      });
  }

  return (
    <>
      <div>
        <h2 className="p-0 m-0">Action</h2>
        <label htmlFor="" className="opacity-55">
          Action To Take As Admin
        </label>
      </div>
      <div className="mt-5">
        <h3 className="p-0 m-0">Submit New Message</h3>
      </div>
      {!newmsg && (
        <button className="mt-4" onClick={() => setnewmsg(true)}>
          Submit New Message
        </button>
      )}
      {newmsg && (
        <>
          <div>
            <h3>Headline</h3>
            <input
              onChange={(e) =>
                setmessage((prev) => ({ ...prev, headline: e.target.value }))
              }
              value={message.headline}
              type="text"
              name=""
              id=""
              className="max-w-[800px]"
            />
          </div>
          <div>
            <h3>Content</h3>
            <textarea
              onChange={(e) =>
                setmessage((prev) => ({ ...prev, content: e.target.value }))
              }
              value={message.content}
              name=""
              id=""
              cols={180}
              rows={10}
              spellCheck={false}
              className="max-w-[800px] rounded text-synblack p-3 outline-none border-none"
            ></textarea>
          </div>
          <div>
            <h3>Whom To Post</h3>
            <div className="flex flex-row gap-10">
              <div className="flex flex-row gap-1">
                <input
                  checked={checkedoption === 0}
                  type="radio"
                  name=""
                  id=""
                  className="w-fit"
                  onChange={() => setcheckedoption(0)}
                />
                <label htmlFor="">All</label>
              </div>
              <div className="flex flex-row gap-1">
                <input
                  checked={checkedoption === 1}
                  type="radio"
                  name=""
                  id=""
                  className="w-fit"
                  onChange={() => setcheckedoption(1)}
                />
                <label htmlFor="">Free</label>
              </div>
              <div className="flex flex-row gap-1">
                <input
                  checked={checkedoption === 2}
                  type="radio"
                  name=""
                  id=""
                  className="w-fit"
                  onChange={() => setcheckedoption(2)}
                />
                <label htmlFor="">Premium</label>
              </div>
              <div className="flex flex-row gap-1">
                <input
                  checked={checkedoption === 3}
                  type="radio"
                  name=""
                  id=""
                  className="w-fit"
                  onChange={() => setcheckedoption(3)}
                />
                <label htmlFor="">Specific</label>
              </div>
            </div>
            {checkedoption === 3 && (
              <div>
                <h3>Set Specific User Email</h3>
                <input
                  onChange={(e) =>
                    setmessage((prev) => ({
                      ...prev,
                      specific: e.target.value,
                    }))
                  }
                  value={message.specific}
                  type="text"
                  name=""
                  id=""
                  className="max-w-[800px]"
                />
              </div>
            )}
            <div className="flex flex-row gap-1 mt-4">
              <button onClick={submitmessage}>
                {issubmitting ? (
                  <LoadingDots width={25} fill="black" />
                ) : (
                  "Submit"
                )}
              </button>
              <button onClick={() => setnewmsg(false)}>Cancel</button>
            </div>
          </div>
        </>
      )}

      <div className="mt-5">
        <h3 className="p-0 m-0">Submit New Update Alert</h3>
      </div>
      {!newupdate && (
        <button className="mt-4" onClick={() => setnewupdate(true)}>
          Submit New Update
        </button>
      )}
      {newupdate && (
        <>
          <div>
            <h3>Choose Extension</h3>
            <input
              onChange={(e) => setextselectedname(e.target.value)}
              value={extselectedname}
              type="text"
              name=""
              id=""
              className="max-w-[800px]"
            />
            {extselectedname &&
              allextensions.some((itm) =>
                itm.name.toLowerCase().includes(extselectedname)
              ) && (
                <div className="mt-3 max-w-[800px] flex flex-col gap-2">
                  {allextensions
                    .filter((itm) =>
                      itm.name.toLowerCase().includes(extselectedname)
                    )
                    .map((itm, index) => {
                      return (
                        <div
                          key={index}
                          className="cursor-pointer flex flex-row gap-2 items-center bg-white text-synblack p-3 px-10 rounded hover:bg-zinc-200 transition-all"
                          onClick={() => {
                            setextupdate((prev) => ({
                              ...prev,
                              identifier: itm.identifier,
                            }));
                            setextselectedname(itm.name);
                          }}
                        >
                          <div className="rounded-full w-[60px] h-[60px] bg-synblue">
                            <Image
                              src={
                                "https://res.cloudinary.com/ds2kpgq2e/image/upload/v1706989493/Syntaximos/Extension%20Logos/fiverrmate_uw89qq.png"
                              }
                              alt="extension logo"
                              width={60}
                              height={60}
                            />
                          </div>
                          <h3>{itm.name}</h3>
                        </div>
                      );
                    })}
                </div>
              )}
          </div>
          <div>
            <h3>Extension Version</h3>
            <input
              onChange={(e) =>
                setextupdate((prev) => ({ ...prev, version: e.target.value }))
              }
              value={extupdate.version}
              type="text"
              name=""
              id=""
              className="max-w-[800px]"
            />
          </div>
          <div className="flex flex-row gap-1 mt-4">
            <button onClick={submitupdate}>
              {issubmittingupdate ? (
                <LoadingDots width={25} fill="black" />
              ) : (
                "Submit"
              )}
            </button>
            <button onClick={() => setnewupdate(false)}>Cancel</button>
          </div>
        </>
      )}

      <div className="mt-5">
        <h3 className="p-0 m-0">Submit New Hot Post</h3>
      </div>
      {!newhotpost && (
        <button className="mt-4" onClick={() => setnewhotpost(true)}>
          Submit New Hot Post
        </button>
      )}
      {newhotpost && (
        <>
          <div>
            <h3>Headline</h3>
            <input
              onChange={(e) =>
                sethotnewsmessage((prev) => ({
                  ...prev,
                  headline: e.target.value,
                }))
              }
              value={hotnewsmessage.headline}
              type="text"
              name=""
              id=""
              className="max-w-[800px]"
            />
          </div>
          <div>
            <h3>Link</h3>
            <div className="flex flex-row gap-1 mb-3">
              <input
                checked={includelink}
                type="checkbox"
                name=""
                id=""
                className="w-fit"
                onChange={() => setincludelink((prev) => (prev ? false : true))}
              />
              <label htmlFor="">Include Link</label>
            </div>
            {includelink && (
              <>
                <div>
                  <h3>Link Text</h3>
                  <input
                    onChange={(e) =>
                      sethotnewsmessage((prev) => ({
                        ...prev,
                        linktext: e.target.value,
                      }))
                    }
                    value={hotnewsmessage.linktext}
                    type="text"
                    name=""
                    id=""
                    className="max-w-[800px]"
                  />
                </div>
                <div>
                  <h3>Link </h3>
                  <input
                    onChange={(e) =>
                      sethotnewsmessage((prev) => ({
                        ...prev,
                        link: e.target.value,
                      }))
                    }
                    value={hotnewsmessage.link}
                    type="text"
                    name=""
                    id=""
                    className="max-w-[800px]"
                  />
                </div>
              </>
            )}
          </div>
          <div>
            <h3>Status Of Post</h3>
            <div className="flex flex-row gap-10">
              <div className="flex flex-row gap-1">
                <input
                  checked={hotnewsmessage.status ? true : false}
                  type="radio"
                  name=""
                  id=""
                  className="w-fit"
                  onChange={() =>
                    sethotnewsmessage((prev) => ({ ...prev, status: true }))
                  }
                />
                <label htmlFor="">Success</label>
              </div>
              <div className="flex flex-row gap-1">
                <input
                  checked={!hotnewsmessage.status ? true : false}
                  type="radio"
                  name=""
                  id=""
                  className="w-fit"
                  onChange={() =>
                    sethotnewsmessage((prev) => ({ ...prev, status: false }))
                  }
                />
                <label htmlFor="">Failed</label>
              </div>
            </div>
            <div className="flex flex-row gap-1 mt-4">
              <button onClick={submithotmessage}>
                {issubmittinghotpost ? (
                  <LoadingDots width={25} fill="black" />
                ) : (
                  "Submit"
                )}
              </button>
              <button onClick={() => setnewhotpost(false)}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminAction;
