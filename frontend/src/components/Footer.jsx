import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[var(--card)] border-t  border-gray-300 dark:border-gray-700 px-6 py-10 text-gray-700 dark:text-gray-300">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-6">
        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start max-w-sm text-center md:text-left">
          <Link to="/" className="text-2xl font-extrabold text-violet-700 dark:text-yellow-300 mb-3 hover:opacity-90 transition">
            CaptionGenie
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Transform your images into vivid stories with AI-powered personalized captions in multiple languages and customizable tones.
          </p>

          {/* Social Media Icons */}
          <div className="flex gap-4 mt-6 justify-center md:justify-start">
            <a
              href="https://twitter.com/yourprofile"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-violet-700 dark:hover:text-yellow-300 transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://facebook.com/yourprofile"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-violet-700 dark:hover:text-yellow-300 transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://instagram.com/yourprofile"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-violet-700 dark:hover:text-yellow-300 transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-violet-700 dark:hover:text-yellow-300 transition"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row justify-center gap-12 text-center md:text-left">
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-yellow-300">Explore</h3>
            <nav className="flex flex-col gap-3 text-gray-600 dark:text-gray-400">
              <Link to="/" className="hover:text-violet-700 dark:hover:text-yellow-300 transition">
                Home
              </Link>
              <Link to="/create" className="hover:text-violet-700 dark:hover:text-yellow-300 transition">
                Create Caption
              </Link>
              <Link to="/gallery" className="hover:text-violet-700 dark:hover:text-yellow-300 transition">
                Gallery
              </Link>
              <Link to="/signin" className="hover:text-violet-700 dark:hover:text-yellow-300 transition">
                Sign In
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-yellow-300">Resources</h3>
            <nav className="flex flex-col gap-3 text-gray-600 dark:text-gray-400">
              <a href="/about" className="hover:text-violet-700 dark:hover:text-yellow-300 transition">
                About Us
              </a>
              <a href="/faq" className="hover:text-violet-700 dark:hover:text-yellow-300 transition">
                FAQ
              </a>
              <a href="/privacy" className="hover:text-violet-700 dark:hover:text-yellow-300 transition">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-violet-700 dark:hover:text-yellow-300 transition">
                Terms of Service
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} CaptionAI. All rights reserved.
      </div>
    </footer>
  );
}
