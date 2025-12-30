import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/user/register",
        { name, email, password }
      );

      setSuccess(res.data.message || "Registration successful");

      setTimeout(() => {
        setLoading(false);
        navigate("/auth/login");
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#242527] flex items-center justify-center px-4">
      <div className="w-full max-w-120 bg-[#1c1d1f] p-10 rounded-2xl shadow-xl">
        <h1 className="text-white text-3xl font-semibold text-center mb-6">
          Register
        </h1>

        {/* Success Message */}
        {success && (
          <p className="mb-4 text-green-400 text-sm text-center">
            {success}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p className="mb-4 text-red-400 text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-5 py-3 text-lg rounded-md bg-[#2b2c2f] text-white outline-none focus:ring-2 focus:ring-[#4CB6AC]"
            required
            disabled={loading}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-5 py-3 text-lg rounded-md bg-[#2b2c2f] text-white outline-none focus:ring-2 focus:ring-[#4CB6AC]"
            required
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-5 py-3 text-lg rounded-md bg-[#2b2c2f] text-white outline-none focus:ring-2 focus:ring-[#4CB6AC]"
            required
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 py-3 text-lg rounded-md font-medium transition flex items-center justify-center gap-2
              ${
                loading
                  ? "bg-[#3e948b] cursor-not-allowed"
                  : "bg-[#4CB6AC] hover:bg-[#3e948b]"
              }
              text-white
            `}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/auth/login")}
            className="text-[#4CB6AC] cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
