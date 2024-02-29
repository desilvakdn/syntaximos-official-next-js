import React from "react";

function FeaturesHome({ mainfeatures }: { mainfeatures: any[] }) {
  return (
    <div className="pb-14 align-mddle text-center flex flex-col justify-center items-center">
      <h2 className="px-[12px] text-center">Extensions Comes With Following</h2>
      <p className="text-center opacity-50 w-[450px] md:w-[650px]">
        All our extensions comes with following features and more unique
        features. our main goal is to make user&apos;s life easier and smarter.
      </p>
      <div className="m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {mainfeatures.map((feature, index) => {
          return (
            <div
              key={index}
              className="transition-all cursor-pointer py-4 px-6 flex flex-col justify-center items-center max-w-96 bg-synwhite text-synblack rounded hover:bg-synblue hover:text-synwhite"
            >
              <div className="p-0 w-full flex flex-row justify-start items-center gap-4">
                {feature.icon}
                <h3>{feature.title}</h3>
              </div>
              <p className="p-0 m-0 text-left">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FeaturesHome;
