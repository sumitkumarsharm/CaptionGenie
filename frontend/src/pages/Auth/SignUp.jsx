import React, { useState } from "react";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/create");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-[color:var(--card)] rounded-lg shadow text-[color:var(--text)]">
      <h2 className="text-2xl  text-[color:var(--muted)]  font-semibold mb-4">Sign up</h2>

      <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name..."
          className="p-3 rounded border border-gray-300 bg-transparent text-[color:var(--muted)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email..."
          className="p-3 rounded border border-gray-300 bg-transparent text-[color:var(--muted)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password..."
          className="p-3 rounded border border-gray-300 bg-transparent text-[color:var(--muted)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          className="p-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
          type="submit"
        >
          Sign up
        </button>
      </form>

      <p className="mt-4 text-sm text-[color:var(--muted)]">
        Already have an account?{" "}
        <Link to="/signin" className="text-blue-500 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
