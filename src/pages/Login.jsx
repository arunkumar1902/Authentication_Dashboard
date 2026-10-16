import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthShell from "./AuthShell";
import { Button, Field } from "../components/UI";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

export default function Login() {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("User@123");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const next = {};

    // Validate the email address.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address.";
    }

    // Validate the password.
    if (!password) {
      next.password = "Password is required.";
    }

    setErrors(next);

    if (Object.keys(next).length) {
      return;
    }

    try {
      await login(email, password, remember);

      toast("Welcome back! You are signed in.");

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to sign in. Please try again.");
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Enter your details to access your account."
      footer={
        <>
          New to AccessHub?{" "}
          <Link to="/register">Create an account</Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={submit} noValidate>
        {error && (
          <div className="form-alert">
            <i className="fa-solid fa-circle-exclamation" />
            {error}
          </div>
        )}

        <Field
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <Field
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <div className="form-options">
          <label className="check-label">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Remember me</span>
          </label>

          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <Button type="submit" block loading={loading}>
          Sign in <i className="fa-solid fa-arrow-right" />
        </Button>

        <div className="default-user">
          <span>Email : user@example.com</span>
          <span>Password : User@123</span>
        </div>

        <div className="form-divider">
          <span />
          or continue securely
          <span />
        </div>

        <div className="secure-caption">
          <i className="fa-solid fa-lock" />
          Your information is encrypted and secure
        </div>
      </form>
    </AuthShell>
  );
}