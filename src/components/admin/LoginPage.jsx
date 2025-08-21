import React, { useState } from "react";
import AdminUpload from "./AdminUpload";
import { User, Lock, LogIn } from "lucide-react";
import Header from "../Header";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Access env variables
    const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("❌ Invalid credentials. Try again.");
    }
  };

  if (authenticated) {
    return <AdminUpload />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black font-sans">
      <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800">
        <Header />
        <h2 className="text-3xl font-bold text-center text-white mb-2 flex items-center justify-center gap-2">
          <Lock size={28} className="text-red-500" /> Admin Login
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Sign in to manage your uploads
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3">
            <User className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-transparent outline-none text-white"
              required
            />
          </div>

          <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3">
            <Lock className="text-gray-400 mr-2" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-transparent outline-none text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-red-400 transition transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
          >
            <LogIn size={20} /> Login
          </button>

          {error && (
            <p className="text-sm text-red-300 mt-2 text-center animate-bounce">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
