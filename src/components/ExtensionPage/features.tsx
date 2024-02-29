import React from "react";
import FeaturesAction from "./featuresaction";

function FeaturesSection() {
  let extension = "Fiverr Mate";
  let features = [
    {
      img: "/Extensions/fiverrmate/matemenu.png",
      title: "Mate Menu",
      description:
        "Menu that comes with all the features that you need to make your fiverr gig stands out. Try yourself",
    },
    {
      img: "/Extensions/fiverrmate/keywordexplorer.png",
      title: "Keyword Explorer",
      description:
        "The explorer that provides you insight about most used keywords in tags, titles and links by top sellers",
    },
    {
      img: "/Extensions/fiverrmate/gigexplorer.png",
      title: "Gig Explorer",
      description:
        "The explorer that provides tags the seller used including functionality to download quality gig images and much more",
    },
    {
      img: "/Extensions/fiverrmate/suggested_keywords_generator.png",
      title: "Suggested Keywords Generator",
      description:
        "This feature will generate suggested keywords and analyze them to get more impressions and clicks for your gigs",
    },
    {
      img: "/Extensions/fiverrmate/search_keywords_generator.png",
      title: "Search Keywords Generator",
      description:
        "This feature will generate search results keywords for your target keyword and analyze them with real time data",
    },
    {
      img: "/Extensions/fiverrmate/meta_data_downloader.png",
      title: "Gig Meta Data Downloader",
      description:
        "Download all the gig metadata including gig tags, title, description, faq and much more in a single click",
    },
    {
      img: "/Extensions/fiverrmate/fiverr_gig_sorter.png",
      title: "Fiverr Gig Sorter",
      description:
        "Sort the gigs by parameters like rating, reviews, orders and much more to get the best gigs for your research",
    },
    {
      img: "/Extensions/fiverrmate/fiverr_gig_saver.png",
      title: "Fiverr Gig Saver",
      description:
        "Save your favorite gigs without login and analyze them to get the best insights and ideas for your gig",
    },
    {
      img: "/Extensions/fiverrmate/fiverr_mate_ai.png",
      title: "Fiverr Mate AI",
      description:
        "Let the Mate AI do the work for you. Just let the AI generate the best title,description and faq for your gig",
    },
    {
      img: "/Extensions/fiverrmate/green_categories_finder.png",
      title: "Service Category Analyzer",
      description:
        "Find low competition categories to rank better and get more impressions, clicks, orders for your gig",
    },
    {
      img: "/Extensions/fiverrmate/Fiverr_gig_inspector.png",
      title: "Mate Gig Inspector",
      description:
        "Show the gig specific metadata and using ai , generate title, description, faq and tags for your gig",
    },
    {
      img: "/Extensions/fiverrmate/gig_description_analyzer.png",
      title: "Gig Description Analyzer",
      description:
        "Show hidden keywords in gig description and keywords you can target more to get more gig impressions",
    },
  ];

  return (
    <div className="flex flex-col gap-2  w-full min-h-[30vw] justify-center items-center">
      <h1 className="text-4xl">Features</h1>
      <label htmlFor="" className="opacity-55">
        Fiverr Mate Comes With Following Useful Features That Will Increase Your
        Gig SEO, Productivity and Save A Lot Time
      </label>
      <FeaturesAction features={features} extension={extension} />
    </div>
  );
}

export default FeaturesSection;
