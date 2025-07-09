import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-white pt-4 pb-3 mt-5">
        <div className="container text-center">
          <h5 className="mb-3">All Rights Reserved &copy; Ecommerce</h5>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/about" className="text-decoration-none text-white-50 hover-effect">
              About
            </Link>
            <span className="text-white-50">|</span>
            <Link to="/contact" className="text-decoration-none text-white-50 hover-effect">
              Contact
            </Link>
            <span className="text-white-50">|</span>
            <Link to="/policy" className="text-decoration-none text-white-50 hover-effect">
              Privacy & Policy
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
