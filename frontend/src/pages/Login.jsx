import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ErrorList from "../components/ErrorList";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong. Please try again.";
      setErrors([message]);
    }
  };

  return (
    <main className="mx-auto flex max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:min-h-[calc(100vh-72px)] lg:px-8">
      <section className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
        <div className="border-b border-slate-100 px-6 py-7 text-center sm:px-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-red-500">
            Welcome back
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Pick up right where your next stay left off.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-7 sm:px-10">
          <ErrorList errors={errors} />

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              autoComplete="username"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-red-500 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-200"
          >
            Sign in
          </button>
        </form>

        <div className="border-t border-slate-100 bg-slate-50 px-6 py-5 text-center text-sm text-slate-600 sm:px-10">
          New here?{" "}
          <Link to="/signup" className="font-semibold text-red-500 hover:text-red-600 hover:underline">
            Create an account
          </Link>
        </div>
      </section>
    </main>
  );
}
