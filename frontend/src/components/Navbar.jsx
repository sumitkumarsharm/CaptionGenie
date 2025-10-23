import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuMoon, LuSunMoon } from "react-icons/lu";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar({ dark, setDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Close user dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="shadow-sm sticky top-0 z-30" style={{ backgroundColor: "var(--card)" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between p-3">
        <motion.div whileHover={{ scale: 1.03 }} className="text-xl font-semibold" style={{ color: "var(--muted)" }}>
          <Link to="/">CaptionGenie</Link>
        </motion.div>

        <button
          className="md:hidden flex items-center px-2 py-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" style={{ color: "var(--muted)" }} viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/" className="px-3 py-2 rounded-md" style={{ color: "var(--muted)" }}>
            Home
          </Link>
          <Link to="/create" className="px-3 py-2 rounded-md" style={{ color: "var(--muted)" }}>
            Create
          </Link>
          <Link to="/gallery" className="px-3 py-2 rounded-md" style={{ color: "var(--muted)" }}>
            Gallery
          </Link>
          <button
            onClick={() => setDark(!dark)}
            className="px-2 py-1 rounded border"
            style={{ color: "var(--muted)", borderColor: "var(--muted)" }}
            aria-label="Toggle dark mode"
          >
            {dark ? <LuSunMoon size={20} /> : <LuMoon size={20} />}
          </button>

          {/* User icon and dropdown */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="text-var(--muted) focus:outline-none"
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
                aria-label="User menu"
              >
                <FaUserCircle size={26} style={{ color: "var(--muted)" }} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50 py-2">
                  <div className="px-4 py-2 text-gray-900 dark:text-yellow-300 font-semibold select-none">
                    {user.name}
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-b-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signin"
              className="px-3 py-1 rounded text-sm"
              style={{
                backgroundColor: "#3b82f6",
                color: "#fff",
              }}
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full flex flex-col items-center bg-[var(--card)] md:hidden shadow-md z-40">
            <Link to="/" onClick={() => setMenuOpen(false)} className="px-3 py-2 w-full text-center" style={{ color: "var(--muted)" }}>
              Home
            </Link>
            <Link to="/create" onClick={() => setMenuOpen(false)} className="px-3 py-2 w-full text-center" style={{ color: "var(--muted)" }}>
              Create
            </Link>
            <Link to="/gallery" onClick={() => setMenuOpen(false)} className="px-3 py-2 w-full text-center" style={{ color: "var(--muted)" }}>
              Gallery
            </Link>
            <button
              onClick={() => { setDark(!dark); setMenuOpen(false); }}
              className="px-2 py-1 w-full text-center border rounded"
              style={{ color: "var(--muted)", borderColor: "var(--muted)" }}
            >
              {dark ? "Light" : "Dark"}
            </button>
            {user ? (
              <>
                <div className="text-sm px-3 py-1 w-full text-center" style={{ color: "var(--muted)" }}>
                  {user.name}
                </div>
                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className="px-3 py-1 w-full text-sm"
                  style={{ backgroundColor: "#ef4444", color: "#fff" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-1 w-full text-center text-sm"
                style={{ backgroundColor: "#3b82f6", color: "#fff" }}
              >
                Sign in
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
