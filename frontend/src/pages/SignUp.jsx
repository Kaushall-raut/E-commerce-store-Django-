import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/auth";

export const SignUp = () => {
  const Base_Url = import.meta.env.VITE_BACKEND_URL;
  const [form, setForm] = useState({ username: "",email:"" ,  password: "",password2:"" });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const response = await fetch(`${Base_Url}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        saveToken(data);
        setMsg("account successfully created Redirecting ...")
        setTimeout(() => {
            navigate("/login")
        }, 1000);
      }else{
        setMsg(data.detail || "sign up failed")
      }
    } catch (error) {
        setMsg(error)
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
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
            type="email"
            name="email"
            onChange={handleChange}
            value={form.email}
            required
            placeholder="email"
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
          <input
            type="password"
            name="password2"
            onChange={handleChange}
            value={form.password2}
            name="password2"
            placeholder="password2"
            className="w-full p-2 border rounded"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer">
            sign up
          </button>
        </form>
        {msg && <p className="mt-3 text-sm">{msg}</p>}

        <div className="mt-4 text-sm ">
          Already have an account
          <a href="/login" className="text-blue-600 hover:underline p-1">
             log in
          </a>
        </div>
      </div>
    </div>
  );
};
