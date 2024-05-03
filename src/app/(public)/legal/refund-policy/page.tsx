import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Syntaximos strives to provide high-quality Chrome extensions that enhance your browsing experience. We offer a transparent refund policy to ensure your satisfaction. Please visit full refund policy to understand your eligibility and the process for requesting a refund.",
};

function RefundPolicy() {
  function GetDateStyle1() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentDate = new Date();
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
  }
  return (
    <div className="bg-zinc-900 p-10 flex justify-center items-center mb-4">
      <div className="max-w-[1000px]">
        <h1>Refund Policy</h1>
        <div>
          <label className="bg-synblue py-1 px-4 rounded">
            Last updated: {GetDateStyle1()}
          </label>
          <div></div>

          <h2>Product Prestige Promise</h2>

          <p>
            We stand behind the quality and capabilities of our extensions. All
            products undergo extensive internal testing procedures before
            release. We also provide free trial versions so you can evaluate
            usefulness before paying. If our extensions fail to execute as
            described after purchase, please contact us immediately so we can
            troubleshoot and resolve any deficiencies.
          </p>

          <h2>No-Refund Cases</h2>

          <p>
            We do NOT offer refunds or permit cancellation/downgrades resulting
            in refunds for:
          </p>

          <ul>
            <li>General user change of mind</li>
            <li>User inability to properly use extensions</li>
            <li>Feeling product is too expensive</li>
            <li>User errors resulting in inability to use product</li>
            <li>Failure to have resources we advise are required</li>
            <li>And similar scenarios</li>
          </ul>

          <p>
            You as the buyer remain responsible for cancelling subscriptions
            yourself. Auto-renewals are enabled by default.
          </p>

          <h2>Potential Refund Cases</h2>

          <p>
            There ARE certain limited cases where refunds may be considered:
          </p>

          <ul>
            <li>
              If our extension ceases core functioning despite troubleshooting
              attempts with you, and we determine the issues cannot be remedied
              within your current billing cycle to meet advertised capabilities.
            </li>

            <li>
              If you experience failure in functionality explicitly guaranteed
              in our Extension capability listings and after working with our
              support team, we jointly determine the issues cannot be resolved
              without compromise to those guarantees.
            </li>
          </ul>

          <h2>Refund Eligibility</h2>

          <p>To be eligible for a potential refund, you must:</p>

          <ul>
            <li>
              Have attempted initially to resolve issues through our Support
              team.
            </li>

            <li>
              Provide detailed information on issues being faced, steps
              attempted to resolve, data of purchase and subsystem(s) affected.
            </li>

            <li>
              Engage cooperatively and patiently with our Support team in joint
              troubleshooting over email, screenshares or phone assistance.
            </li>

            <li>
              Continue using the remainder of extension features unaffected by
              bugs or capability issues encountered. Refunds will not be
              considered if inability to use ALL component parts or
              unwillingness to work with our Support team on resolving issues.
            </li>
          </ul>

          <h2>Change of Mind/Mistaken Purchases</h2>

          <p>
            We do not provide refunds for general change of mind cases or
            purchases made incorrectly in error. To prevent unwanted orders,
            carefully review subscription details like billing period/cost
            before confirming checkout. You maintain full responsibility for
            proper selection of subscription plans suitable to your needs and
            budget. However, you may cancel upcoming subscription auto-renewals
            at any time through account settings.
          </p>

          <h2>Troubleshooting Required First</h2>

          <p>
            If facing issues with extensions not performing properly, you must
            first engage Syntaximos support staff in attempts to troubleshoot
            and restore functionality before refunds are considered. Please
            describe issues faced thoroughly along with detailed context of your
            setup/environment and steps attempted independently to resolve
            problems. Be willing to work closely with our technicians over
            email, screenshares and phone calls to pinpoint and address
            deficiencies.
          </p>

          <h2>Potential Refund Eligibility</h2>

          <p>
            If despite cooperative troubleshooting efforts, core extension
            functionality remains degraded without remedy, a partial refund
            covering unused subscription time going forward from date support
            ticket opened may be warranted given loss of advertised
            capabilities. Ability to process refunds may be limited in certain
            cases:
          </p>

          <ul>
            <li>
              Failure to adequately detail issues and troubleshoot. Refund
              depends on your providing the full context needed for our
              technicians to understand and reproduce problems.
            </li>

            <li>
              Inability to use certain functions but majority of extension
              remains unaffected. Refunds address material, widespread
              deficiencies impairing the core performance guarantees of our
              offerings.
            </li>

            <li>
              User errors unrelated to underlying quality or accuracy of our
              software code or systems.
            </li>

            <li>
              Lacking recommended third-party integrations, addons, libraries,
              platforms etc we advise are required but do not directly provide.
            </li>
          </ul>

          <h2>Submitting Refund Requests</h2>

          <h3>How to Request Refunds</h3>

          <p>
            If after carefully reviewing our refund policy terms you still
            believe you may qualify for a partial reimbursement, please initiate
            your refund request by emailing{" "}
            <a href="mailto:support@syntaximos.com">support@syntaximos.com</a>{" "}
            with &quot;Refund Request&quot; and your order ID # in the subject
            line.
          </p>

          <p>
            In the body of your email, provide as many details as possible
            including:
          </p>

          <ul>
            <li>Your name and email on the Syntaximos account</li>
            <li>Product/extension purchased and subscription plan details</li>
            <li>Date of transaction </li>
            <li>
              The specific issues, errors or malfunctions you are facing that
              impair core functionality
            </li>
            <li>
              Detailed environment context - browser version, OS, other relevant
              software configurations
            </li>
            <li>
              Troubleshooting steps you have independently attempted and outcome
              at each stage
            </li>
            <li>
              Screenshots demonstrating problems encountered where applicable
            </li>
          </ul>

          <p>
            With this information submitted, a Syntaximos Customer Service agent
            will first respond to confirm receipt and may request further
            specifics if initial details are deemed insufficient to processing
            the refund request.
          </p>

          <p>
            Next, our agent will initiate remote troubleshooting over
            screenshare, email and/or phone call engagements. Per our policy,
            you must make reasonable efforts to work collaboratively with
            Support staff to identify and remediate defects before refunds can
            be considered.
          </p>

          <p>
            If despite cooperative troubleshooting, critical issues persist
            without remedy and materially compromise advertised functionality
            for the remainder of billing cycle, you may be approved for a
            prorated refund covering the unused subscription time going forward.
            Approved refunds are processed within approximately 5-7 days.
            Unfortunately, we cannot offer refunds for multiple past
            subscription payments already utilized regardless of problems.{" "}
          </p>

          <p>
            We aim to make the refund process as smooth as possible while
            adhering to strict policy terms. Please engage with our agents in a
            respectful, patient and timely manner after submitting requests so
            we can best understand your issues and either achieve resolution or
            determine eligibility for partial remuneration. Reach out with any
            other questions!
          </p>

          <h2>Refund Amounts &amp; Timeline</h2>

          <p>
            If deemed eligible, prorated refunds will be provided for unused
            portion of current billing period dating from support case opened.
            Fund disbursement to your original payment method will be initiated
            within approximately 5-7 business days after refund approval.
            Unfortunately bulk refunds cannot be offered for multiple prior
            subscription payments already charged and utilized.
          </p>

          <h2>Confidential Data Handling</h2>

          <p>
            No account deletion or data wiping will occur automatically upon
            refund. You must submit separate requests if you also wish to have
            private information permanently purged after closing your
            subscription. Please note data recovery beyond 30 days is not
            possible.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RefundPolicy;
