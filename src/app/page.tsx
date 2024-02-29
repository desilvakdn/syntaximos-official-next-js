import Steps from "@/components/Home/Steps/page";
import steps from "@/resources/steps.js";
import mainfeatures from "@/resources/mainfeatures";
import CompanyTrust from "@/components/Home/CompanyTrust/page";
import QA from "@/components/Home/QA/main";
import SpotlightProductWrapper from "@/components/Home/others/spotlightproductwrapper";
import HomeBanner from "@/components/Home/HomeBanner/homebanner";
import FeaturesHome from "@/components/Home/Features/features";

export default async function Home() {
  return (
    <main>
      <HomeBanner />
      <CompanyTrust />
      <Steps steps={steps} />
      <FeaturesHome mainfeatures={mainfeatures} />
      <SpotlightProductWrapper />
      {/* <ProductShowcase /> */}
      <QA />
    </main>
  );
}
