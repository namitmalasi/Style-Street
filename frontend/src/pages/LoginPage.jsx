import { useState } from "react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(formData);
    if (res.success) {
      toast.success("Login successful");

      navigate("/");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-2 text-gray-900">Welcome Back</h2>
        <p className="text-gray-500 mb-8">
          Sign in to your account to continue
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />
        </div>

        <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition">
          Sign In
        </button>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-gray-900 font-medium hover:underline"
          >
            Create one
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
