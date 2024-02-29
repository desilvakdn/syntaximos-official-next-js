"use client";
import React, { createContext, useContext, useState } from "react";

interface PopupContextType {
  isPopupOpen: boolean;
  openpopup: (message: string, status: boolean) => void;
  closepopup: () => void;
  message: string;
  status: boolean;
}

const GlobalPopup = createContext<PopupContextType>({
  isPopupOpen: false,
  openpopup: () => {},
  closepopup: () => {},
  message: "",
  status: true,
});

export const useGlobalPopup = () => useContext(GlobalPopup);

export const GlobalPopupProvider = ({ children }: { children: any }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [message, setmessage] = useState("");
  const [status, setstatus] = useState(true);

  const openpopup = (message: string, status: boolean) => {
    setIsPopupOpen(true);
    setmessage(message);
    setstatus(status);
  };
  const closepopup = () => setIsPopupOpen(false);

  return (
    <GlobalPopup.Provider
      value={{ isPopupOpen, openpopup, closepopup, message, status }}
    >
      {children}
    </GlobalPopup.Provider>
  );
};

export default GlobalPopup;
