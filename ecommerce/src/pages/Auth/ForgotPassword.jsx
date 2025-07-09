import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
//   const location = useLocation();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPass = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/auth/forgot-password", {
        email,
        newPassword,
        answer
      });
      console.log('response', res.data)
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
    <Layout title={"Forgot Password - Ecommerce App"}>
      <div 
        className="d-flex align-items-center justify-content-center py-4"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "100vh"
        }}
      >
        <div 
          className="card shadow-sm p-4 mx-2" 
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.97)"
          }}
        >
          <h4 className="text-center fw-bold mb-3">Reset Your Password</h4>
          <form onSubmit={handleForgotPass}>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Your secret answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn w-100 text-white fw-bold"
              disabled={loading}
              style={{
                background: "linear-gradient(to right, #667eea, #764ba2)",
                border: "none",
                borderRadius: "6px"
              }}
            >
              {loading ? "Processing..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
