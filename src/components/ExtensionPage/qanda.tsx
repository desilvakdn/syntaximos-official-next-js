import React from "react";
import QAcontainer from "../Home/QA/QAcontainer";

function QASection() {
  const data = {
    status: true,
    data: [
      {
        question: "Are there any risks of using Fiverr Mate?",
        answer:
          "No, you can use Fiverr Mate in a private separate browser profile which has no connection with your personal Fiverr account. So in any case, if something happens, it will only affect that browser profile, which means you're safe using it. You don't need to be logged in to your personal account.",
      },
      {
        question: "Can Fiverr Mate exactly rank your gig?",
        answer:
          "We can't say exactly. Gig ranking does not only depend on SEO. It's a combination of your reputation, quality of work, and customer handling. But without Gig SEO, even if you have other completed gigs, you won't get good results. So consider that Fiverr Mate provides data with a single click that you can take advantage of.",
      },
      {
        question: "Are free plan features limited?",
        answer:
          "Yes, you get some features available for the free plan, but those features are also limited to some extent. You have to get the premium version to unlock all features without any limitations.",
      },
      {
        question: "Is this an official Fiverr web extension?",
        answer:
          "No, this is not. Syntaximos is a third-party company that operates Fiverr Mate, so there's not even a partnership with Fiverr.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "Yes, but we only offer refunds under certain circumstances. You can read the refund policy in our legal section, which can be found in the footer.",
      },
      {
        question: "Is this a one-time payment?",
        answer:
          "No, this is a subscription-based model. You'll be charged every month during the renewing billing period. Until you cancel, you will continue to be charged. You have full control over canceling subscriptions, and we do not take any responsibility for forgetting to cancel them. Even if you have canceled and were still charged, we will consider issuing a refund.",
      },
      {
        question: "Why are some features missing from updates?",
        answer:
          "We're consistently working on improvements of Fiverr Mate while making sure you're safe. If we find some features pose a threat when using them, we consider removing them, and later we'll fix and add them if asked by users.",
      },
    ],
  };
  return (
    <div className="flex flex-col gap-2  w-full min-h-[30vw] justify-center items-center">
      <h1 className="text-4xl">We Have Answers</h1>
      <label htmlFor="" className="text-justify">
        Here are the most user&apos;s asked q and a regarding to this extension.
        Please read them carefully and understand limitations, drawbacks and
        it&apos;s capabilities.
      </label>
      <div className="flex justify-center items-center w-full">
        <QAcontainer qacontainer={data} />
      </div>
    </div>
  );
}

export default QASection;
