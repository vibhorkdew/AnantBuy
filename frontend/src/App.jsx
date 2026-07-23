import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

import ProtectedRoute from "./components/ProtectedRoute";

import ReviewOrder from "./pages/ReviewOrder";

function App() {

  const darkMode = true;

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#020617,#0f172a,#111827)",
        color: "white"
      }}
    >

      <BrowserRouter>

        <Navbar/>

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/review"
            element={<ReviewOrder />}
          />

        </Routes>

        <Footer />

      </BrowserRouter>

    </div>

  );
}

export default App;