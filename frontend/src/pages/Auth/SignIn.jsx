import React, { useState } from "react";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/create");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-[color:var(--card)] rounded-lg shadow text-[color:var(--text)]">
      <h2 className="text-2xl text-[color:var(--muted)] font-semibold mb-4">Sign in</h2>

      <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-3 rounded border border-gray-300 bg-transparent text-[color:var(--muted)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-3 rounded border border-gray-300 bg-transparent text-[color:var(--muted)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          type="submit"
        >
          Sign in
        </button>
      </form>

      <p className="mt-4 text-sm text-[color:var(--muted)]">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
