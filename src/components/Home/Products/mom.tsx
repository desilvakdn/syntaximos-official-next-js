import React from "react";
import Products from "@/components/Home/Products/page";
import ViewAllCompo from "./viewallcompo";
import Config from "@/resources/config";

interface ExtDetailsResponse {
  status: boolean;
  data: any[]; // Change `any` to a more specific type if possible
}
async function ProductShowcase() {
  let extdetails = await fetch(`${Config().api}/web/extensions`, {
    cache: "no-store",
  });

  const extdetailsdata: ExtDetailsResponse = await extdetails.json();
  return (
    <div className="my-[100px] pb-14 align-mddle text-center flex flex-col justify-center items-center">
      <h2 className="text-center ">Exclusive Extension Collection</h2>
      <p className="text-center opacity-50 w-[450px] md:w-[650px]">
        Here&apos;s Our most capable extension collection. First you have to be
        a member and then you can add and use without pain.
      </p>
      <ViewAllCompo />
      <div
        className={`m-10 grid grid-cols-1 ${
          extdetailsdata.data.length > 1 && "md:grid-cols-2"
        }  lg:grid-cols-3 gap-3`}
      >
        {extdetailsdata.data.length === 1 && <div></div>}
        {extdetailsdata.data.map((item, index) => (
          <Products key={index} data={item} />
        ))}
        {extdetailsdata.data.length === 1 && <div></div>}
        {/* {mainfeatures.map((feature, index) => {
      return (
        <div className="transition-all cursor-pointer py-4 px-6 flex flex-col justify-center items-center max-w-96 bg-synwhite text-synblack rounded hover:bg-synblue hover:text-synwhite">
          <div className="p-0 w-full flex flex-row justify-start items-center gap-4">
            {feature.icon}
            <h3>{feature.title}</h3>
          </div>
          <p className="p-0 m-0 text-left">{feature.description}</p>
        </div>
      );
    })} */}
      </div>
    </div>
  );
}

export default ProductShowcase;
