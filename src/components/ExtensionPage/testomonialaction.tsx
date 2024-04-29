"use client";
import { Star } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function TestomonialAction({
  reviews,
  extensionreviewurl,
}: {
  reviews: any[];
  extensionreviewurl: string;
}) {
  const [viewall, setViewall] = useState(false);
  const [reviewsview, setreviewsview] = useState<any[]>([]);

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    let reviewsmodified = reviews.filter(
      (sinreview) =>
        !sinreview.comment.toLowerCase().includes("fake") &&
        !sinreview.comment.toLowerCase().includes("bad") &&
        !sinreview.comment.toLowerCase().includes("scam")
    );
    if (viewall) {
      let g = shuffleArray(reviewsmodified);
      setreviewsview(g);
    } else {
      let g = shuffleArray(reviewsmodified);
      setreviewsview(g.slice(0, 7));
    }
  }, [viewall]);

  return (
    <>
      <div className={`SlideIn0 mt-8 w-full flex flex-row flex-wrap gap-2`}>
        {reviewsview.map((review, index) => {
          return (
            <motion.div
              key={index}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: -10, opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.5 + 0.1 * index,
                ease: "backInOut",
              }}
              className="flex-grow flex flex-row gap-4 items-center justify-center bg-zinc-800 p-3 rounded hover:bg-zinc-700 cursor-pointer transition-all"
            >
              <div className="rounded-full overflow-hidden">
                <Image
                  src={review.image_url}
                  alt="user profile image"
                  width={48}
                  height={48}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2">
                  <h3 className="p-0 m-0">{review.name}</h3>
                  <label
                    htmlFor=""
                    className="flex flex-row gap-0 items-center text-synblue"
                  >
                    5 <Star width={22} weight="fill" />
                  </label>
                </div>
                <p className="opacity-55 max-w-80">
                  {review.comment.length > 100
                    ? review.comment.slice(0, 100) + "..."
                    : review.comment}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
      <motion.div layout className="mt-7 flex flex-row gap-2">
        <button onClick={() => setViewall(!viewall)}>
          {viewall ? "View Less" : "View All"}
        </button>
        <button onClick={() => window.open(extensionreviewurl, "_blank")}>
          View In Webstore
        </button>
      </motion.div>
    </>
  );
}

export default TestomonialAction;
