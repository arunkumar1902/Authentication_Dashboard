import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthShell from "./AuthShell";
import { Button, Field, PasswordRules } from "../components/UI";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

const strong = (password) =>
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /[a-z]/.test(password) &&
  /\d/.test(password) &&
  /[^A-Za-z0-9]/.test(password);

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const { register, login, loading } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  // Update the form field that changed.
  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const next = {};

    // Validate the full name.
    if (form.name.trim().length < 2) {
      next.name = "Enter your full name.";
    }

    // Validate the email address.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }

    // Validate password strength.
    if (!strong(form.password)) {
      next.password = "Your password does not meet all requirements.";
    }

    // Confirm that both passwords match.
    if (form.confirm !== form.password) {
      next.confirm = "Passwords do not match.";
    }

    setErrors(next);

    if (Object.keys(next).length) {
      return;
    }

    try {
      await register(form);
      await login(form.email, form.password, true);

      toast("Your account has been created.");

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Could not create your account.");
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Get started with a secure, personal workspace."
      footer={
        <>
          Already have an account? <Link to="/login">Sign in</Link>
        </>
      }
    >
      <form
        className="auth-form register-form"
        onSubmit={submit}
        noValidate
      >
        {error && (
          <div className="form-alert">
            <i className="fa-solid fa-circle-exclamation" />
            {error}
          </div>
        )}

        <Field
          id="name"
          name="name"
          label="Full name"
          placeholder="e.g. Alex Morgan"
          autoComplete="name"
          value={form.name}
          onChange={change}
          error={errors.name}
        />

        <Field
          id="email"
          name="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          onChange={change}
          error={errors.email}
        />

        <Field
          id="password"
          name="password"
          label="Create password"
          type="password"
          placeholder="Create a strong password"
          autoComplete="new-password"
          value={form.password}
          onChange={change}
          error={errors.password}
        />

        <PasswordRules password={form.password} />

        <Field
          id="confirm"
          name="confirm"
          label="Confirm password"
          type="password"
          placeholder="Enter password again"
          autoComplete="new-password"
          value={form.confirm}
          onChange={change}
          error={errors.confirm}
        />

        <label className="check-label terms-check">
          <input type="checkbox" required />

          <span>
            I agree to the{" "}
            <a href="#terms" onClick={(e) => e.preventDefault()}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#privacy" onClick={(e) => e.preventDefault()}>
              Privacy Policy
            </a>
            .
          </span>
        </label>

        <Button type="submit" block loading={loading}>
          Create account <i className="fa-solid fa-arrow-right" />
        </Button>
      </form>
    </AuthShell>
  );
}