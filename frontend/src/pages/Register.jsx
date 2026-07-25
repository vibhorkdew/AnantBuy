import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../Auth.css";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "auth/register",
        form
      );

      alert(
        "Registration Successful. Please Login."
      );

      navigate("/login");

    } catch (err) {

      alert(
        err?.response?.data?.detail ||
        "Registration Failed"
      );
    }
  };

  return (

    <div className="auth-page">

      {/* LEFT SECTION */}

      <div className="auth-left">

        <h1>
          Welcome to AnantBuy
        </h1>

        <p>
          Your one-stop destination for
          Electronics, Fashion, Accessories
          and much more.
        </p>

        <div className="features">

          <div>
            ✓ Secure Authentication
          </div>

          <div>
            ✓ Fast Shopping Experience
          </div>

          <div>
            ✓ Modern React + FastAPI Platform
          </div>

          <div>
            ✓ Built by AnantX Team
          </div>

        </div>

      </div>

      {/* RIGHT SECTION */}

      <div className="auth-card">

        <h2>
          Create Account
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
            required
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px"
          }}
        >
          Already have an account?{" "}

          <Link
            to="/login"
            style={{
              color: "#f59e0b",
              fontWeight: "600",
              textDecoration: "none"
            }}
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;