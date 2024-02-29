import Link from "next/link";
import React from "react";

async function Member() {
  let actions = [
    {
      label: "Become A Syntaximos",
      route: "/member/register",
    },
    {
      label: "Login To Account",
      route: "/member/login",
    },
  ];

  return (
    <div className="flex-grow flex justify-center items-center flex-col">
      <h2>Welcome To Syntaximos</h2>
      <p className="text-center px-[15px]">
        You&apos;re One step is away to become a syntaximos or enter to the
        world of syntaximos
      </p>
      <div className="min-w-[85%] md:min-w-[70%] md:min-h-[100px] mt-10 flex flex-col  md:flex-row gap-3">
        {actions.map((action, index) => {
          return (
            <Link key={index} href={action.route} className="flex-grow">
              <button
                key={index}
                className="SlideIn0 rounded bg-zinc-800 border-solid border-zinc-500 text-synwhite border-2 w-full h-[100px] md:h-full hover:bg-synwhite hover:text-synblack "
              >
                {action.label}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Member;
