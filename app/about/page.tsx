// pages/about.tsx
import Head from "next/head";
import Image from "next/image";

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About Us</title>
        <meta
          name="description"
          content="Learn more about our mission and values."
        />
      </Head>
      <div className="container mx-auto px-4 py-8 bg-slate-900 text-gray-200">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg">
            At [Your Company Name], our mission is to provide high-quality
            products and services that enhance the lives of our customers. We
            believe in innovation, sustainability, and community engagement.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg mb-4">
            Founded in [Year], [Your Company Name] started as a small venture
            with a big dream. Over the years, we have grown into a trusted brand
            known for our commitment to quality and customer satisfaction. Our
            journey has been fueled by passion and a desire to make a positive
            impact in our community.
          </p>
          <Image
            src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d"
            alt="Our Story"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-lg">
            <li>
              Integrity: We uphold the highest standards of integrity in all our
              actions.
            </li>
            <li>
              Customer Focus: We strive to exceed our customers' expectations.
            </li>
            <li>
              Innovation: We embrace change and seek new solutions to meet the
              needs of our customers.
            </li>
            <li>
              Sustainability: We are committed to sustainable practices that
              protect our planet.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Join Us</h2>
          <p className="text-lg">
            We invite you to join us on our journey. Whether you are a customer,
            partner, or supporter, your involvement helps us achieve our
            mission. Together, we can make a difference!
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
