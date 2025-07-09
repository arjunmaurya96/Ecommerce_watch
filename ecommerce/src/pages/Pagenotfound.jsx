import React from "react";
import Layout from "../components/Layout/Layout";

const Pagenotfound = () => {
  return (
    <Layout title={"go back- page not found"}>
      <div
        className="d-flex mt-5 flex-column justify-content-center align-items-center text-center"
        style={{ minHeight: "70vh" }}
      >
        <h1 className="display-1 fw-bold">404</h1>
        <h2 className="mb-3">Oops! Page not found</h2>
        <a href="/" className="btn btn-primary mt-3">
          Go Back
        </a>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
