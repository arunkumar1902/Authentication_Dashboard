import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";
import {
  Button,
  Field,
  PasswordRules,
} from "../components/UI";

// Validate password strength
const strong = (p) =>
  p.length >= 8 &&
  /[A-Z]/.test(p) &&
  /[a-z]/.test(p) &&
  /\d/.test(p) &&
  /[^A-Za-z0-9]/.test(p);

export default function ChangePassword() {
  const { changePassword } = useAuth();
  const toast = useToast();

  // Form state
  const [form, setForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);

  // Update form fields
  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const submit = async (e) => {
    e.preventDefault();

    setError("");

    // Check required fields
    if (
      !form.current ||
      !form.next ||
      !form.confirm
    ) {
      return setError(
        "Complete all password fields."
      );
    }

    // Validate password strength
    if (!strong(form.next)) {
      return setError(
        "Your new password does not meet all requirements."
      );
    }

    // Ensure the new password is different
    if (form.current === form.next) {
      return setError(
        "Your new password must be different from your current password."
      );
    }

    // Check whether passwords match
    if (form.next !== form.confirm) {
      return setError(
        "New passwords do not match."
      );
    }

    setBusy(true);

    try {
      await changePassword(
        form.current,
        form.next
      );

      setSuccess(true);

      setForm({
        current: "",
        next: "",
        confirm: "",
      });

      toast("Password changed successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="page-heading">
        <div>
          <div className="heading-kicker">
            <span />
            SECURITY CENTER
          </div>

          <h1>Change password</h1>

          <p>
            Protect your account with a strong,
            unique password.
          </p>
        </div>

        <Link
          to="/profile"
          className="btn btn-secondary"
        >
          <i className="fa-solid fa-arrow-left" />
          Back to profile
        </Link>
      </div>

      <div className="password-layout">
        <section className="content-card password-form-card">
          <div className="section-title">
            <span className="section-icon purple">
              <i className="fa-solid fa-key" />
            </span>

            <div>
              <h2>Update your password</h2>

              <p>
                Enter your current password, then
                choose a new one.
              </p>
            </div>
          </div>

          {success && (
            <div className="success-inline">
              <i className="fa-solid fa-circle-check" />

              Password updated. Your next sign-in
              will use your new password.
            </div>
          )}

          {error && (
            <div className="form-alert">
              <i className="fa-solid fa-circle-exclamation" />
              {error}
            </div>
          )}

          <form onSubmit={submit} noValidate>
            <Field
              id="current"
              name="current"
              label="Current password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter current password"
              value={form.current}
              onChange={update}
            />

            <div className="password-field-spacer" />

            <Field
              id="next"
              name="next"
              label="New password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a new password"
              value={form.next}
              onChange={update}
            />

            <PasswordRules password={form.next} />

            <Field
              id="confirm"
              name="confirm"
              label="Confirm new password"
              type="password"
              autoComplete="new-password"
              placeholder="Enter new password again"
              value={form.confirm}
              onChange={update}
            />

            <div className="form-actions">
              <Button
                type="submit"
                loading={busy}
              >
                Update password
                <i className="fa-solid fa-arrow-right" />
              </Button>
            </div>
          </form>
        </section>


        <aside className="password-guidance">
          <div className="guidance-shield">
            <i className="fa-solid fa-shield-halved" />
          </div>

          <h2>
            Stronger passwords, safer accounts.
          </h2>

          <p>
            A few small steps can make a meaningful
            difference to your account security.
          </p>

          <ul>
            <li>
              <i className="fa-solid fa-check" />
              Use a unique password for this account
            </li>

            <li>
              <i className="fa-solid fa-check" />
              Avoid personal information or common phrases
            </li>

            <li>
              <i className="fa-solid fa-check" />
              Never share your password with anyone
            </li>
          </ul>
          
          <div className="guidance-footer">
            <i className="fa-solid fa-lock" />

            Your password is never shown in your profile.
          </div>
        </aside>
      </div>
    </div>
  );
}