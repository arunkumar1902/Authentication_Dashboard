import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  const joined = user?.joinedAt
    ? new Date(user.joinedAt).toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return (
    <div className="profile-page">
      {/* Page heading */}
      <div className="page-heading">
        <div>
          <div className="heading-kicker">
            <span />
            ACCOUNT
          </div>

          <h1>My profile</h1>
          <p>View and manage your personal information.</p>
        </div>

        <Link to="/profile/edit" className="btn btn-primary">
          <i className="fa-solid fa-pen" /> Edit profile
        </Link>
      </div>

      {/* Profile hero section */}
      <section className="profile-hero content-card">
        <div className="profile-cover">
          <div className="cover-pattern" />
        </div>

        <div className="profile-hero-content">
          <div className="avatar avatar-profile">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="profile-identity">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>

            <div className="identity-tags">
              <span className="role-chip">
                <i className="fa-solid fa-user" /> {user?.role || "User"}
              </span>

              <span className="verified-chip">
                <i className="fa-solid fa-circle-check" /> Account active
              </span>
            </div>
          </div>

          <div className="profile-joined">
            <span>MEMBER SINCE</span>
            <strong>{joined}</strong>
          </div>
        </div>
      </section>

      {/* Profile details */}
      <div className="profile-detail-grid">
        {/* Personal information */}
        <section className="content-card detail-card">
          <div className="section-title">
            <span className="section-icon">
              <i className="fa-regular fa-id-card" />
            </span>

            <div>
              <h2>Personal information</h2>
              <p>Your personal details and contact information.</p>
            </div>
          </div>

          <div className="detail-list">
            <div className="detail-row">
              <span>Full name</span>
              <strong>{user?.name || "Not provided"}</strong>
            </div>

            <div className="detail-row">
              <span>Email address</span>
              <strong>
                {user?.email || "Not provided"}{" "}
                <i className="fa-solid fa-circle-check verified-inline" />
              </strong>
            </div>

            <div className="detail-row">
              <span>Phone number</span>
              <strong>{user?.phone || "Not added"}</strong>
            </div>

            <div className="detail-row">
              <span>Location</span>
              <strong>{user?.location || "Not added"}</strong>
            </div>
          </div>

          <Link to="/profile/edit" className="subtle-link">
            Update personal details{" "}
            <i className="fa-solid fa-arrow-right" />
          </Link>
        </section>

        {/* Account and security */}
        <section className="content-card detail-card">
          <div className="section-title">
            <span className="section-icon purple">
              <i className="fa-solid fa-shield-halved" />
            </span>

            <div>
              <h2>Account & security</h2>
              <p>Manage your sign-in and account protection.</p>
            </div>
          </div>

          <div className="security-setting">
            <span className="setting-symbol">
              <i className="fa-solid fa-key" />
            </span>

            <div>
              <strong>Password</strong>
              <small>Keep your password strong and unique</small>
            </div>

            <Link to="/change-password">Change</Link>
          </div>

          <div className="security-setting">
            <span className="setting-symbol green">
              <i className="fa-solid fa-user-check" />
            </span>

            <div>
              <strong>Account status</strong>
              <small>Your account is active</small>
            </div>

            <span className="status-pill">Active</span>
          </div>

          <div className="security-setting">
            <span className="setting-symbol orange">
              <i className="fa-regular fa-calendar" />
            </span>

            <div>
              <strong>Member since</strong>
              <small>{joined}</small>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}