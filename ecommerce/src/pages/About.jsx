import React from "react";
import Layout from "../components/Layout/Layout";
import aboutImg from "../assets/img/contact2.jpg";

const About = () => {
  return (
    <Layout title={"About Ecommerce"}>
      <div className="container py-4 mt-5">
        <div className="row align-items-center">
          {/* Left Side - Image */}
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={aboutImg}
              alt="About us"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Right Side - Text */}
          <div className="col-md-6">
            <h2 className="mb-3">About Us</h2>
            <p>
              Welcome to our platform! We are passionate about delivering
              top-notch solutions and services that enhance your experience. Our
              team is dedicated to providing quality and excellence in
              everything we do.
            </p>
            <p>
              <strong>Email:</strong> info@example.com
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

export default About;
