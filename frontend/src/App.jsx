import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import CreateCaption from "./pages/CreateCaption";
import Gallery from "./pages/Gallery";
import Navbar from "./components/Navbar";
import useDarkMode from "./hooks/useDarkMode";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

function Private({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/signin" />;
  return children;
}

export default function App() {
  const [dark, setDark] = useDarkMode();

  return (
    <div className="flex flex-col min-h-screen text-black dark:text-gray-100 bg-[color:var(--bg)] transition-colors duration-300">
      <Navbar dark={dark} setDark={setDark} />

      <main className="flex-grow max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page */}
          <Route path="/" element={<Navigate to="/create" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/create"
            element={
              <Private>
                <CreateCaption />
              </Private>
            }
          />
          <Route
            path="/gallery"
            element={
              <Private>
                <Gallery />
              </Private>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>

      <Footer />

      {/* ✅ Toastify setup */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme={dark ? "dark" : "light"} // auto theme match
      />
    </div>
  );
}
