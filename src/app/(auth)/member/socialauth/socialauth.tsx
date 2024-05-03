import React from "react";
import GoogleAuthButton from "./google";

function SocialAuth({ signin, signup }: { signin: boolean; signup: boolean }) {
  return (
    <div className="w-fit min-h-10 SlideIn0 min-w-[95%] md:min-w-[600px] flex flex-col gap-2 justify-center items-center bg-zinc-800 px-5 py-10 rounded drop-shadow-md">
      <GoogleAuthButton signin={signin} signup={signup} />
    </div>
  );
}

export default SocialAuth;
