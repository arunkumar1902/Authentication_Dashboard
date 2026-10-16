import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthShell from "./AuthShell";
import { Button, Field, PasswordRules } from "../components/UI";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

// Check whether the password meets all security requirements.
const strong = (password) =>
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /[a-z]/.test(password) &&
  /\d/.test(password) &&
  /[^A-Za-z0-9]/.test(password);

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate password strength.
    if (!strong(password)) {
      setError("Choose a password that meets all requirements.");
      return;
    }

    // Check whether both passwords match.
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setBusy(true);

    try {
      await resetPassword(password);

      toast(
        "Password reset successfully. Sign in with your new password."
      );

      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell
      eyebrow="ACCOUNT RECOVERY"
      title="Set a new password"
      subtitle="Create a strong password you have not used before."
      footer={
        <>
          Need a new reset session?{" "}
          <Link to="/forgot-password">Start again</Link>
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
          id="password"
          label="New password"
          type="password"
          autoComplete="new-password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordRules password={password} />

        <Field
          id="confirm"
          label="Confirm new password"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <Button type="submit" block loading={busy}>
          Reset password <i className="fa-solid fa-arrow-right" />
        </Button>
      </form>
    </AuthShell>
  );
}