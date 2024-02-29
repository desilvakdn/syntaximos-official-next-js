import React from "react";
import LoadingDots from "../Animations/LoadingDots/page";

function PageLoader() {
  return (
    <>
      <div className="fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center">
        <div className="flex flex-row gap-2 justify-center items-center">
          <label htmlFor="">Loading</label>
          <LoadingDots width={30} fill={"var(--synwhite)"} />
        </div>
      </div>
    </>
  );
}

export default PageLoader;
