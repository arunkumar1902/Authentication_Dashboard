import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";
import { Button, Field } from "../components/UI";

export default function EditProfile() {
  const { user, updateProfile, loading } = useAuth();

  const navigate = useNavigate();
  const toast = useToast();

  // Form state
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
  });

  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  // Handle input changes
  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const submit = async (e) => {
    e.preventDefault();

    const next = {};

    // Validate name
    if (form.name.trim().length < 2) {
      next.name =
        "Name must contain at least 2 characters.";
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }

    // Validate phone number
    if (
      form.phone &&
      !/^[+]?[\d\s()-]{7,20}$/.test(form.phone)
    ) {
      next.phone = "Enter a valid phone number.";
    }

    setErrors(next);

    // Stop submission if validation fails
    if (Object.keys(next).length > 0) {
      return;
    }

    setBusy(true);

    try {
      // Update the user's profile
      await updateProfile({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        location: form.location.trim(),
      });

      toast("Profile updated successfully.");

      navigate("/profile");
    } catch (err) {
      toast(
        err.message || "Could not update profile.",
        "error"
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="profile-page">
      {/* Page heading */}
      <div className="page-heading">
        <div>
          <div className="heading-kicker">
            <span />
            ACCOUNT SETTINGS
          </div>

          <h1>Edit profile</h1>

          <p>
            Keep your account information accurate and up
            to date.
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

      {/* Edit profile layout */}
      <div className="edit-layout">
        {/* Profile information sidebar */}
        <aside className="content-card edit-aside">
          <div className="avatar avatar-profile">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <h3>{user?.name}</h3>

          <p>{user?.email}</p>

          <span className="verified-chip">
            <i className="fa-solid fa-circle-check" />
            Active account
          </span>

          <div className="edit-aside-divider" />

          {/* Profile tip */}
          <div className="edit-tip">
            <i className="fa-solid fa-lightbulb" />

            <div>
              <strong>Profile tip</strong>

              <p>
                Use an email address you can access.
                It helps with account recovery.
              </p>
            </div>
          </div>
        </aside>

        {/* Profile editing form */}
        <section className="content-card edit-form-card">
          <div className="section-title">
            <span className="section-icon">
              <i className="fa-solid fa-user-pen" />
            </span>

            <div>
              <h2>Personal details</h2>

              <p>
                Fields marked below are used for your
                account profile.
              </p>
            </div>
          </div>

          <form onSubmit={submit} noValidate>
            <div className="form-grid">
              <Field
                id="name"
                name="name"
                label="Full name"
                placeholder="Your full name"
                value={form.name}
                onChange={change}
                error={errors.name}
              />

              {/* Email address */}
              <Field
                id="email"
                name="email"
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={change}
                error={errors.email}
              />

              <Field
                id="phone"
                name="phone"
                label="Phone number"
                type="tel"
                placeholder="+1 555 123 4567"
                value={form.phone}
                onChange={change}
                error={errors.phone}
              />

              <Field
                id="location"
                name="location"
                label="Location"
                placeholder="City, Country"
                value={form.location}
                onChange={change}
              />
            </div>

            <div className="form-note">
              <i className="fa-solid fa-circle-info" />

              Your information is saved to this browser
              for this demo.
            </div>

            <div className="form-actions">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/profile")}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                loading={busy || loading}
              >
                Save changes
                <i className="fa-solid fa-check" />
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}