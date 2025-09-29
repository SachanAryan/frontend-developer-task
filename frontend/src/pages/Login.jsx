import { useState } from "react";
import api from "../utils/api.js";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      nav("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
    <div className=" h-screen bg-[#111] content-center">
    <div className="max-w-md mx-auto bg-[#222] p-4 text-white shadow-lg shadow-amber-50 rounded-2xl">
      <h1 className="text-2xl mb-4 font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 rounded-lg"
          autoComplete="off"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 rounded-lg"
          autoComplete="off"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-xl text-lg font-medium">
          Login
        </button>
      </form>
      <p className="mt-2">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500">
          Signup
        </Link>
      </p>
    </div>
    </div>
    </>
  );
}
