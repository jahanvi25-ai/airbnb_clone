import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ErrorList from "../components/ErrorList";

const initialForm = {
  FirstName: "",
  LastName: "",
  email: "",
  password: "",
  confirmedPassword: "",
  userType: "",
  terms: false,
};

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState([]);

  const update = (field) => (e) => {
    const value = field === "terms" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      await signup(form);
      navigate("/");
    } catch (err) {
      const responseErrors = err.response?.data?.errors;
      setErrors(responseErrors || ["Something went wrong. Please try again."]);
    }
  };

  return (
    <main className="mx-auto flex max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
        <div className="border-b border-slate-100 px-6 py-7 text-center sm:px-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-red-500">
            Welcome home
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create your account</h1>
          <p className="mt-2 text-sm text-slate-500">
            Join to discover and book places you'll love.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-7 sm:px-10">
          <ErrorList errors={errors} />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">First name</label>
              <input
                type="text"
                required
                autoComplete="given-name"
                placeholder="John"
                value={form.FirstName}
                onChange={update("FirstName")}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-100"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Last name</label>
              <input
                type="text"
                autoComplete="family-name"
                placeholder="Doe"
                value={form.LastName}
                onChange={update("LastName")}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="johndoe@example.com"
              value={form.email}
              onChange={update("email")}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-100"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                required
                autoComplete="new-password"
                placeholder="Create a password"
                value={form.password}
                onChange={update("password")}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-100"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Confirm password
              </label>
              <input
                type="password"
                required
                autoComplete="new-password"
                placeholder="Repeat your password"
                value={form.confirmedPassword}
                onChange={update("confirmedPassword")}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-100"
              />
            </div>
          </div>

          <fieldset>
            <legend className="mb-3 text-sm font-medium text-slate-700">I want to join as a</legend>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-4 transition hover:border-red-300 hover:bg-red-50">
                <input
                  type="radio"
                  name="userType"
                  value="guest"
                  checked={form.userType === "guest"}
                  onChange={update("userType")}
                  required
                  className="h-4 w-4 border-slate-300 text-red-500 focus:ring-red-500"
                />
                <span className="text-sm font-medium text-slate-700">Guest</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-4 transition hover:border-red-300 hover:bg-red-50">
                <input
                  type="radio"
                  name="userType"
                  value="host"
                  checked={form.userType === "host"}
                  onChange={update("userType")}
                  className="h-4 w-4 border-slate-300 text-red-500 focus:ring-red-500"
                />
                <span className="text-sm font-medium text-slate-700">Host</span>
              </label>
            </div>
          </fieldset>

          <label className="flex cursor-pointer items-start gap-3 text-sm leading-5 text-slate-600">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={update("terms")}
              required
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-red-500 focus:ring-red-500"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="font-medium text-red-500 hover:text-red-600 hover:underline">
                terms and conditions
              </a>
              .
            </span>
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-red-500 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-200"
          >
            Create account
          </button>
        </form>

        <div className="border-t border-slate-100 bg-slate-50 px-6 py-5 text-center text-sm text-slate-600 sm:px-10">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-red-500 hover:text-red-600 hover:underline">
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
}
