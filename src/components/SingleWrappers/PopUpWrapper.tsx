import React, { ReactNode } from "react";

interface PopUpWrapperProps {
  children: ReactNode;
}

function PopUpWrapper({ children }: PopUpWrapperProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-synblack bg-opacity-50 z-[10] flex justify-center items-center ">
      {children}
    </div>
  );
}

export default PopUpWrapper;
