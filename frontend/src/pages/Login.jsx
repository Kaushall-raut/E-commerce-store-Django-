import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/auth";

export const Login = () => {
  const Base_Url = import.meta.env.VITE_BACKEND_URL;
  const [form, setForm] = useState({ username: "", password: "" });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const response = await fetch(`${Base_Url}/api/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        saveToken(data);
        setMsg("Login successful Redirecting ...")
        setTimeout(() => {
            navigate("/")
        }, 1000);
      }else{
        setMsg(data.detail || "Login failed")
      }
    } catch (error) {
        setMsg(error)
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={form.username}
            required
            placeholder="username"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
            name="password"
            placeholder="password"
            className="w-full p-2 border rounded"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Login
          </button>
        </form>
        {msg && <p className="mt-3 text-sm">{msg}</p>}

        <div className="mt-4 text-sm">
          Don't have an account
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};
