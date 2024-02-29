"use client";
import React, { useContext, useEffect } from "react";
import GlobalPopup from "../SingleWrappers/MessageWrapper";
import { CheckCircle, XCircle } from "@phosphor-icons/react/dist/ssr";

function GPop() {
  const { isPopupOpen, closepopup, message, status } = useContext(GlobalPopup);

  useEffect(() => {
    if (isPopupOpen) {
      setTimeout(() => {
        closepopup();
      }, 3000);
    }
  }, [isPopupOpen, closepopup]);

  return (
    <>
      {isPopupOpen && (
        <div
          className={`SlideInDown0Pop fixed top-5 left-1/2 z-50 p-3 rounded ${
            status ? "bg-lime-600" : "bg-red-600"
          }`}
          style={{
            transform: "translate(-50%,0)",
          }}
        >
          <label
            htmlFor=""
            className="flex flex-row gap-2 justify-center items-center"
          >
            {status ? (
              <>
                <CheckCircle size={22} weight="bold" /> {message}
              </>
            ) : (
              <>
                <XCircle size={22} weight="bold" /> {message}
              </>
            )}
          </label>
        </div>
      )}
    </>
  );
}

export default GPop;
