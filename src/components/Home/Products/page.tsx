"use client";
import {
  ArrowSquareOut,
  DownloadSimple,
  Heart,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

interface Product {
  id: number;
  name: string;
  price: number;
  analytics: {
    fav: number;
    rating: number;
    installs: number;
  };
  metadata: {
    hooklines: any[];
    description_brief: string;
  };
  images: {
    logo: string;
  };
  identifier: string;
}

interface ProductsProps {
  // Define the type for the data parameter
  data: Product;
}

function Products({ data }: ProductsProps) {
  const { push } = useRouter();
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        whileHover={"hover"}
        variants={{
          hover: {
            scale: 1.03,
            transition: {
              duration: 0.3,
            },
          },
        }}
        onClick={() => push(`/extensions/${data.identifier}`)}
        className="text-synblack bg-synwhite flex flex-col max-w-96 p-6 rounded relative cursor-pointer overflow-hidden"
      >
        <m.div
          variants={{
            hover: {
              top: 12,
              transition: {
                duration: 0.3,
              },
            },
          }}
          className="absolute top-[-100px] right-3 flex flex-row gap-1 "
        >
          <button className="bg-synblue hover:bg-blue-950 hover:brightness-150 hover:scale-105 flex flex-row gap-2">
            <ArrowSquareOut size={20} color="var(--synwhite)" />
            <span className="text-synwhite">View</span>
          </button>
        </m.div>
        <label
          htmlFor=""
          className="flex flex-row gap-1 absolute bottom-3 right-4"
        >
          <Heart size={24} />
          <span>
            {data.analytics.fav
              ? data.analytics.fav < 1000
                ? "1000+"
                : data.analytics.fav
              : "1000+"}
          </span>
        </label>
        <div className="flex flex-row gap-3 justify-start items-center mt-10">
          <div className="bg-slate-300 w-24 h-24 rounded-full">
            <Image
              src={data.images.logo}
              width={100}
              height={100}
              alt={data.name}
            />
          </div>
          <div className="flex flex-col gap-1 justify-start items-start">
            <h2 className="m-0">{data.name}</h2>
            <h5 className="m-0">{data.metadata.hooklines[2]}</h5>
            <div className="flex flex-row gap-1">
              <label
                htmlFor=""
                className="flex flex-rows gap-2 bg-synblack text-synwhite py-1 px-2 rounded w-fit"
              >
                <Star size={20} />
                <span className="m-0 p-0">{data.analytics.rating}</span>
              </label>
              <label
                htmlFor=""
                className="flex flex-rows gap-2 bg-synblack text-synwhite py-1 px-2 rounded w-fit"
              >
                <DownloadSimple size={20} weight="fill" />
                <span className="m-0 p-0">{data.analytics.installs}</span>
              </label>
            </div>
          </div>
        </div>
        <p className="text-left mt-5 mb-4">{data.metadata.description_brief}</p>
      </m.div>
    </LazyMotion>
  );
}

export default Products;
