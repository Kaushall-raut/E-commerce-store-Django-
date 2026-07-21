import { useNavigate } from "react-router-dom";
import { userCart } from "../context/CartContext";
import { useState } from "react";

export const CheckoutPage = () => {
  const Base_Url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { clearCart } = userCart();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment_method: "COD",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${Base_Url}/api/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setError("order placed successfully");
        fetch(`${Base_Url}/api/cart`);
        clearCart();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(data.error || "failed to place order .Try again later");
      }
    } catch (error) {
      setError("error occurred:", error);
    }
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-center text-3xl font-bold mb-6">checkOut</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />
          <textarea
            name="address"
            placeholder="Full address "
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          ></textarea>

          <input
            type="tel"
            placeholder=" Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />

          <select
            name="payment method"
            value={form.payment_method}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="COD">Cash on delivery</option>
            <option value="Online">Online Payment</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {loading ? "processing ... " : "Place Order "}
          </button>
          {error && (
            <p className="text-center text-green-700 font-semibold mt-4">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
