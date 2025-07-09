import React from "react";
import Layout from "../components/Layout/Layout";
import img1 from "../assets/img/contact1.jpg";

const Contact = () => {
  return (
    <Layout title={"Contact Ecommerce"}>
      <div className="container mt-4 mt-5">
        <div className="row">
          {/* Right Column - Image */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src={img1}
              alt="Contact"
              className="img-fluid rounded shadow"
            />
          </div>
          {/* Left Column - Contact Content */}
          <div className="col-md-6">
            <div className="bg-dark text-white p-3 mb-3">
              <h2 className="m-0">Contact Us</h2>
            </div>
            <p>
              We'd love to hear from you! Whether you have a question about
              features, pricing, or anything else, our team is ready to answer
              all your questions.
            </p>
            <p>
              <strong>Email:</strong> contact@example.com
            </p>
            <p>
              <strong>Phone:</strong> +91 9876543210
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
