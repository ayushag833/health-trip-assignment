// pages/privacy-policy.tsx
import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Privacy Policy of Your Company" />
      </Head>
      <div className="container mx-auto px-4 py-8 bg-gray-900 text-gray-200">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
        <p className="mb-6 text-lg">
          This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you visit our website, including any
          other media form, media channel, mobile website, or mobile application
          related or connected thereto.
        </p>

        <h2 className="text-3xl font-semibold mt-8 mb-4">
          Information We Collect
        </h2>
        <p className="mb-4">
          We may collect information about you in a variety of ways, including:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Personal Data: Personally identifiable information, such as your
            name, shipping address, email address, and telephone number, that
            you voluntarily give to us when you register with the site or when
            you choose to participate in various activities related to the site.
          </li>
          <li>
            Derivative Data: Information our servers automatically collect when
            you access the site, such as your IP address, your browser type,
            your operating system, your access times, and the pages you have
            viewed directly before and after accessing the site.
          </li>
        </ul>

        <h2 className="text-3xl font-semibold mt-8 mb-4">
          Cookies and Tracking Technologies
        </h2>
        <p className="mb-4">
          We may use cookies, web beacons, tracking pixels, and other tracking
          technologies on the site to help customize the site and improve your
          experience. When you access the site, your personal information is not
          collected through the use of tracking technology.
        </p>
        <p className="mb-4">
          Most browsers are set to accept cookies by default. You can remove or
          reject cookies, but be aware that such action could affect the
          availability and functionality of the site.
        </p>

        <h2 className="text-3xl font-semibold mt-8 mb-4">
          Use of Your Information
        </h2>
        <p className="mb-4">
          Having accurate information about you permits us to provide you with a
          smooth, efficient, and customized experience. Specifically, we may use
          information collected about you via the site to:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Create and manage your account.</li>
          <li>
            Process your transactions and send you related information,
            including purchase confirmations and invoices.
          </li>
          <li>Send you a confirmation email when you register.</li>
          <li>Respond to customer service requests and support needs.</li>
          <li>Send you marketing and promotional communications.</li>
        </ul>

        <h2 className="text-3xl font-semibold mt-8 mb-4">
          Disclosure of Your Information
        </h2>
        <p className="mb-4">
          We may share information we have collected about you in certain
          situations. Your information may be disclosed as follows:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            By Law or to Protect Rights: If we believe the release of
            information about you is necessary to respond to legal process, to
            investigate or remedy potential violations of our policies, or to
            protect the rights, property, and safety of others, we may share
            your information as permitted or required by any applicable law,
            rule, or regulation.
          </li>
          <li>
            Third-Party Service Providers: We may share your information with
            third parties that perform services for us or on our behalf,
            including payment processing, data analysis, email delivery, hosting
            services, customer service, and marketing assistance.
          </li>
        </ul>

        <h2 className="text-3xl font-semibold mt-8 mb-4">
          Security of Your Information
        </h2>
        <p className="mb-4">
          We use administrative, technical, and physical security measures to
          help protect your personal information. While we have taken reasonable
          steps to secure the personal information you provide to us, please be
          aware that no method of transmission over the Internet or method of
          electronic storage is 100% secure, and we cannot guarantee its
          absolute security.
        </p>

        <h2 className="text-3xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have questions or comments about this Privacy Policy, please
          contact us at:
        </p>
        <p className="mb-4">
          Email:{" "}
          <a
            href="mailto:support@yourcompany.com"
            className="text-blue-600 hover:underline"
          >
            support@yourcompany.com
          </a>
        </p>
        <p className="mb-4">
          Address: 123 Your Company St, Your City, Your State, Your Country
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
