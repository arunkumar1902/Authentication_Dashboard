import { useState } from "react";
import { Link } from "react-router-dom";

import AuthShell from "./AuthShell";
import { Button, Field } from "../components/UI";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  const { requestReset } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate the email address.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setBusy(true);

    try {
      await requestReset(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell
      eyebrow="ACCOUNT RECOVERY"
      title={success ? "Check your account" : "Forgot your password?"}
      subtitle={
        success
          ? "Your demo reset session is ready. Continue to choose a new password."
          : "No worries. Enter your registered email to start the reset process."
      }
      footer={
        <>
          Remember your password? <Link to="/login">Back to sign in</Link>
        </>
      }
    >
      {success ? (
        <div className="success-panel">
          <span>
            <i className="fa-solid fa-envelope-circle-check" />
          </span>

          <h3>Reset request accepted</h3>

          <p>
            For this frontend demo, your reset session is stored in this
            browser. Continue to the reset screen to set a new password.
          </p>

          <Link
            className="btn btn-primary btn-block link-button"
            to="/reset-password"
          >
            Continue to reset password{" "}
            <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>
      ) : (
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
            error={error && !email ? error : ""}
          />

          <Button type="submit" block loading={busy}>
            Send reset instructions{" "}
            <i className="fa-solid fa-arrow-right" />
          </Button>

          <div className="info-note">
            <i className="fa-solid fa-circle-info" />
            <span>
              Use the email address associated with your account.
            </span>
          </div>
        </form>
      )}
    </AuthShell>
  );
}