import { useState } from "react";
import api from "../utils/api.js";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", { username, email, password });
      alert("User created! Login now.");
      nav("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <div className="h-screen bg-[#111] content-center">
        <div className="max-w-md mx-auto bg-[#222] p-4 text-white shadow-lg shadow-amber-50 rounded-2xl">
          <h1 className="text-2xl mb-4 font-bold">Signup</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="border p-2 rounded-lg"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border p-2 rounded-lg"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border p-2 rounded-lg"
            />
            <button 
            type="submit" 
            className="bg-green-500 text-black font-medium text-lg p-2 rounded-xl">
              Signup
            </button>
          </form>
          <p className="mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
