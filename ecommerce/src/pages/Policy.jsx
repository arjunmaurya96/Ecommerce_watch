import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Policy Ecommerce"}>
      <div className="container py-5 mt-5">
        <div className="bg-light p-5 rounded shadow">
          <h1 className="text-center mb-4 border-bottom pb-3">
            Privacy Policy
          </h1>

          <p>
            We value your privacy and are committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, and
            safeguard your data when you interact with our website.
          </p>

          <h4 className="mt-4">1. Information We Collect</h4>
          <p>
            We may collect personal details such as name, email address, phone
            number, and other relevant information when you register or interact
            with our services.
          </p>

          <h4 className="mt-4">2. How We Use Your Information</h4>
          <p>
            The data we collect is used to improve our services, personalize
            your experience, and keep you informed about updates and offers.
          </p>

          <h4 className="mt-4">3. Data Security</h4>
          <p>
            We implement strong security measures to protect your personal data
            from unauthorized access, alteration, or disclosure.
          </p>

          <h4 className="mt-4">4. Third-Party Disclosure</h4>
          <p>
            We do not sell, trade, or transfer your personal information to
            outside parties, except when necessary to provide services or as
            required by law.
          </p>

          <h4 className="mt-4">5. Consent</h4>
          <p>
            By using our website, you consent to our Privacy Policy and agree to
            its terms.
          </p>

          <div className="text-center mt-5">
            <a href="/" className="btn btn-primary">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
