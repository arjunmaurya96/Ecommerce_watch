import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {

        email,
        password,

      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,

        })

        localStorage.setItem('authToken', res.data.user.token)
        localStorage.setItem('auth', JSON.stringify(res.data))
        navigate("/");
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
        className="d-flex align-items-center justify-content-center py-4"
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
            <h4 className="fw-bold" style={{ color: "#764ba2" }}>Login Now  </h4>
            <p className="text-muted small">Logins your account</p>
          </div>

          <form onSubmit={handleSubmit}>


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
              ) : "Login"}
            </button>

            <button
              type="submit"
              onClick={() => { navigate('/forgot-password') }}
              className="btn btn-sm w-100 py-2 fw-bold text-white mt-2"
              disabled={loading}
              style={{
                background: "linear-gradient(to right, #667eea, #764ba2)",
                border: "none",
                borderRadius: "6px",
                fontSize: "0.9rem"
              }}
            >
              Forgot Password

            </button>

            <div className="text-center mt-2 small">
              <p className="text-muted mb-0">
                Have an account?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "#764ba2",
                    textDecoration: "none",
                    fontWeight: "500"
                  }}
                >
                  register now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;