import CustomerFeedbackSection from "@/components/ExtensionPage/customertesto";
import FeaturesSection from "@/components/ExtensionPage/features";
import HeroExtensionSection from "@/components/ExtensionPage/herosection";
import HowItWorks from "@/components/ExtensionPage/howitworks";
import PricingSectionExtPage from "@/components/ExtensionPage/pricing";
import QASection from "@/components/ExtensionPage/qanda";
import React from "react";

function ExtensionPage() {
  let herosection = {
    rating: 4.65,
    title: "Fiverr Mate",
    identifier: "fiverr_mate",
    tagline: "Will Take Care Of Your Fiverr Gig SEO",
    version: "V1.2.0",
    description:
      "A Chrome extension offers stats to boost your Fiverr gig's visibility, even for new sellers, with accurate data Fiverr doesn't disclose. Install Fiverr Mate now to do Fiverr Gig SEO fast without put your efforts on boring tasks and analyzations.",
    users: 20000,
    compatible: ["chrome", "brave", "edge"],
    link: "https://chromewebstore.google.com/detail/fiverr-mate-fiverr-gig-se/pfnlgphmiaoifnibdpneedbodehafgek?utm_source=ext_app_menu",
    heroimg: "/Extensions/fiverrmate/fiverr_mate.png",
  };
  return (
    <div className="bg-zinc-900 p-10 flex justify-center items-center mb-4 flex-grow flex-col gap-[20px]">
      <HeroExtensionSection data={herosection} />
      <FeaturesSection />
      <HowItWorks />
      <CustomerFeedbackSection />
      <PricingSectionExtPage />
      <QASection />
    </div>
  );
}

export default ExtensionPage;
