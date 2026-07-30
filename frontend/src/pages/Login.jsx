import {
  useState,
  useContext
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  AuthContext
} from "../context/AuthContext";

import api from "../api/axios";

function Login() {

  const navigate =
    useNavigate();

  const { login } =
    useContext(AuthContext);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await api.post(
            "auth/login",
            {
              email,
              password
            }
          );

        login(
          res.data.access_token
        );

        navigate("/products");

      } catch (err) {

        console.log(
          "LOGIN ERROR:",
          err
        );

        alert(
          err?.response?.data?.detail ||
          "Login Failed"
        );
      }
    };

  return (

    <div className="auth-page">

      {/* LEFT SECTION */}

      <div className="auth-left">

        <h1>
          Welcome Back
        </h1>

        <p>
          Login to continue shopping on
          AnantBuy and access your cart,
          orders and premium products.
        </p>

        <div className="features">

          <div>
            ✓ Secure JWT Authentication
          </div>

          <div>
            ✓ Fast & Responsive Experience
          </div>

          <div>
            ✓ Electronics, Fashion & More
          </div>

          <div>
            ✓ Powered by AnantX Team
          </div>

        </div>

      </div>

      {/* RIGHT SECTION */}

      <div className="auth-card">

        <h2>
          Login
        </h2>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <button
            type="submit"
          >
            Login
          </button>

        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px"
          }}
        >
          New User?{" "}

          <Link
            to="/register"
            style={{
              color: "#f59e0b",
              fontWeight: "600",
              textDecoration: "none"
            }}
          >
            Create Account
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;