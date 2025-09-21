import React, { useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../utils/config";

const LoginForm = () => {
  const { login } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Giriş başarısız.");
      }

      const data = await res.json();
      login(data.user, data.token);
      navigate("/"); // re-direct home
    } catch (err) {
      setError((err as Error).message);
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Giriş Yap</h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none  transition duration-200"
      />

      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none transition duration-200"
      />

      <button
        type="submit"
        className="w-full py-2 bg-[#ffc40c] text-[#253342] font-bold rounded-lg hover:bg-[#ffbe00]/70 transition duration-200"
      >
        Giriş Yap
      </button>
    </form>
  );
};

export default LoginForm;
