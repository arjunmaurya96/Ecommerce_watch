import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Register - Ecommerce App"}>
      <div
        className="d-flex align-items-center justify-content-center mt-3 py-4"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "100vh"
        }}
      >
        <div
          className="card shadow-sm p-3 mx-2"
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.97)"
          }}
        >
          <div className="text-center mb-3">
            <h4 className="fw-bold" style={{ color: "#764ba2" }}>Register Now </h4>
            <p className="text-muted small">Create your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="form-control form-control-sm"
                required
                style={{ borderRadius: "6px" }}
              />
            </div>

            <div className="mb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="form-control form-control-sm"
                required
                style={{ borderRadius: "6px" }}
              />
            </div>

            <div className="mb-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="form-control form-control-sm"
                required
                style={{ borderRadius: "6px" }}
              />
            </div>

            <div className="mb-2">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="form-control form-control-sm"
                required
                style={{ borderRadius: "6px" }}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className="form-control form-control-sm"
                required
                style={{ borderRadius: "6px" }}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="What is Your Favorite sports"
                className="form-control form-control-sm"
                required
                style={{ borderRadius: "6px" }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-sm w-100 py-2 fw-bold text-white"
              disabled={loading}
              style={{
                background: "linear-gradient(to right, #667eea, #764ba2)",
                border: "none",
                borderRadius: "6px",
                fontSize: "0.9rem"
              }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Processing...
                </>
              ) : "Register"}
            </button>

            <div className="text-center mt-2 small">
              <p className="text-muted mb-0">
                Have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#764ba2",
                    textDecoration: "none",
                    fontWeight: "500"
                  }}
                >
                  login now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;