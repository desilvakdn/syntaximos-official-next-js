import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Welcome to Syntaximos! By accessing and using our website and Chrome extensions, you agree to comply with the following Terms of Use. This policy outlines the rules and guidelines governing your interaction with our services. Please review the details below to ensure a positive and secure experience.",
};

function TermsofUse() {
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
    <>
      <div className="bg-zinc-900 p-10 flex justify-center items-center mb-4">
        <div className="max-w-[1000px]">
          <h1>Terms Of Service</h1>
          <div>
            <label className="bg-synblue py-1 px-4 rounded">
              Last updated: {GetDateStyle1()}
            </label>

            <h2>1. Introduction</h2>

            <p>
              These Terms of Service (&quot;Terms&quot;) apply to the websites,
              products, applications, services and tools (collectively
              &quot;Services&quot;) provided by Syntaximos and its affiliated
              entities (&quot;Syntaximos,&quot; &quot;we,&quot; &quot;our,&quot;
              or &quot;us&quot;). By using our Services, you agree to be bound
              by these Terms. If you do not agree, do not access or use our
              Services. We may periodically make changes to these Terms and it
              is your responsibility to review them for updates.
            </p>

            <h2>2. Our Services</h2>

            <p>
              Syntaximos provides browser extensions, software products, and
              other IT/developer services. Our Services are offered subject to
              your acceptance without modification of these Terms. We may
              update, enhance, suspend, discontinue or otherwise modify our
              Services at any time and without notice.
            </p>

            <h2>3. Personal Data We Collect</h2>

            <p>
              In providing our Services, we may collect personal identification
              information such as your full name, e-mail address, phone number,
              mailing address, credit card/payment details and other data. We
              also may track information provided to us by your browser or
              device when you access and engage with our Services. This may
              include IP address, device ID, cookie data, location information
              and information about your activity using the Services. We collect
              this data to provide you support, bill you for services, improve
              our offerings and customize content.
            </p>

            <h2>4. Legal Basis and Use of Personal Data</h2>

            <p>
              We only process your personal data where we have a lawful basis
              for doing so, such as:
            </p>

            <ul>
              <li>
                Performing a contract with you (e.g. to provide the Services)
              </li>
              <li>
                Pursuing our legitimate interests (e.g. to analyze how our
                Services are used)
              </li>
              <li>Complying with a legal obligation</li>
              <li>If you have consented</li>
            </ul>

            <p>We use your data to:</p>

            <ul>
              <li>Provide, operate, maintain and improve our Services</li>
              <li>Establish and maintain your user profile and account</li>
              <li>
                Process your financial information and payments for our Services
              </li>
              <li>Communicate with you about our Services</li>
              <li>
                Understand usage trends and preferences to customize content and
                features
              </li>
              <li>Develop new products and services</li>
              <li>Enforce our Terms and policies</li>
              <li>Comply with applicable laws and regulations</li>
              <li>
                For other purposes disclosed at the time you provide your data
                or otherwise with your consent
              </li>
            </ul>

            <h2>5. Sharing and Disclosure of Personal Data</h2>

            <p>
              We do not sell, share, rent or trade your personal data with third
              parties for their promotional purposes. We may share your data
              with vendors providing services on our behalf with appropriate
              data protection and security measures. This may include payment
              processors, web analytics, email distribution and monitoring
              services, customer support providers and more.{" "}
            </p>

            <p>
              We may also disclose your data if required by law, subpoenas,
              court orders or legal process requirements. This may include
              disclosures to law enforcement agencies.
            </p>

            <h2>6. Your Rights Over Personal Data</h2>

            <p>As a user, you may:</p>

            <ul>
              <li>Access your personal data </li>
              <li>Request correction or deletion of inaccurate data</li>
              <li>Restrict or object to certain processing</li>
              <li>
                Revoke your consent where we rely on it to process your data
              </li>
              <li>
                Receive your personal data to transfer to another service
                provider
              </li>
              <li>
                Lodge a complaint with the appropriate data protection authority
              </li>
            </ul>

            <p>
              To make privacy requests, please submit an e-mail to
              support@syntaximos.com.
            </p>

            <h2>7. Data Retention</h2>

            <p>
              We retain your personal data only as reasonably required for the
              purposes explained in these Terms or as required by law. We will
              retain your information as long as your account is considered
              active. If you close your account, we will delete data from active
              systems within 30 days. Data may continue to persist in backup
              systems for limited periods.{" "}
            </p>

            <h2>8. Cookies and Tracking Technologies</h2>

            <p>
              We utilize cookies, web beacons, pixels and similar technologies
              to provide and support our Services. This allows us to offer
              customized experiences, analyze our traffic, monitor performance,
              improve our Services and show relevant advertising. You can
              disable cookies through your browser but our Services may then
              fail to function properly.
            </p>

            <h2>9. Data Security</h2>

            <p>
              We employ organizational, technical and physical safeguards to
              help protect the security and integrity of your personal data.
              This includes encryption, limiting access to authorized personnel
              on a need-to-know basis, strict policy controls and established
              incident response plans. While we work to protect your data, no
              technology solution can ever be 100% secure.
            </p>

            <h2>10. International Data Transfers</h2>

            <p>
              We are headquartered in the United States. Personal data you
              provide may be transferred to and stored by our affiliated
              entities in the U.S. for processing consistent with these Terms.
              U.S. privacy laws may not be as stringent as those in your
              jurisdiction.
            </p>

            <h2>11. Changes to These Terms</h2>

            <p>
              We may update these Terms from time to time. If changes are
              significant, we may notify you through our Services or by email.
              Your continued use of our Services constitutes acceptance of
              revised Terms.
            </p>

            <h2>12. Contact Us</h2>

            <p>
              Get in touch if you have any questions or concerns about our
              privacy practices by emailing us at support@syntaximos.com. Please
              include &quot;Privacy&quot; in the subject line.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsofUse;
