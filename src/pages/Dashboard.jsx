import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { EmptyState } from "../components/UI";

// Sample account activity data
const activitySeed = [
  {
    title: "Signed in to AccessHub",
    detail: "Successful authentication",
    time: "Just now",
    icon: "fa-right-to-bracket",
    color: "blue",
  },
  {
    title: "Account security checked",
    detail: "Security status is active",
    time: "Today",
    icon: "fa-shield-halved",
    color: "green",
  },
  {
    title: "Profile workspace ready",
    detail: "Personal details available",
    time: "Today",
    icon: "fa-user-pen",
    color: "purple",
  },
  {
    title: "Welcome to AccessHub",
    detail: "Your account workspace was created",
    time: "Account setup",
    icon: "fa-sparkles",
    color: "orange",
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  const [search, setSearch] = useState("");

  // Filter activities based on the search input
  const activities = useMemo(
    () =>
      activitySeed.filter((a) =>
        `${a.title} ${a.detail} ${a.time}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  // Extract the user's first name
  const firstName =
    user?.name?.trim().split(/\s+/)[0] || "there";

  return (
    <div className="dashboard-page">
      
      <div className="page-heading">
        <div>
          <div className="heading-kicker">
            <span />
            OVERVIEW
          </div>

          <h1>
            Good morning, {firstName}{" "}
            <span className="wave">✦</span>
          </h1>

          <p>
            Here’s what’s happening with your account today.
          </p>
        </div>

        <Link
          to="/profile/edit"
          className="btn btn-primary"
        >
          <i className="fa-solid fa-user-pen" />
          Edit profile
        </Link>
      </div>

      <section className="welcome-banner">
        <div className="welcome-copy">
          <div className="welcome-tag">
            <i className="fa-solid fa-sparkles" />
            YOUR WORKSPACE
          </div>

          <h2>
            Everything you need, <br />
            all in one secure place.
          </h2>

          <p>
            Manage your profile, keep your account up to
            date, and stay in control of your security.
          </p>

          <Link to="/profile" className="banner-link">
            View your profile
            <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>

        <div className="banner-art">
          <div className="art-ring ring-a" />
          <div className="art-ring ring-b" />

          <div className="art-shield">
            <i className="fa-solid fa-shield-halved" />
          </div>

          <div className="art-float float-check">
            <i className="fa-solid fa-check" />
          </div>

          <div className="art-float float-lock">
            <i className="fa-solid fa-lock" />
          </div>
        </div>
      </section>


      <section className="stats-grid">
        <article className="stat-card">
          <div className="stat-top">
            <span className="stat-icon stat-blue">
              <i className="fa-solid fa-user-check" />
            </span>

            <span className="stat-label">
              ACCOUNT STATUS
            </span>
          </div>

          <div className="stat-value">
            Active
            <span className="status-dot" />
          </div>

          <p className="stat-foot">
            <i className="fa-solid fa-circle-check" />
            Your account is in good standing
          </p>
        </article>

        <article className="stat-card">
          <div className="stat-top">
            <span className="stat-icon stat-green">
              <i className="fa-solid fa-shield-halved" />
            </span>

            <span className="stat-label">
              SECURITY
            </span>
          </div>

          <div className="stat-value">
            Protected
          </div>

          <p className="stat-foot">
            <i className="fa-solid fa-check" />
            Password-based access enabled
          </p>
        </article>


        <article className="stat-card">
          <div className="stat-top">
            <span className="stat-icon stat-purple">
              <i className="fa-solid fa-id-card" />
            </span>

            <span className="stat-label">
              PROFILE COMPLETION
            </span>
          </div>

          <div className="stat-value">
            {user?.phone && user?.location
              ? "100%"
              : user?.phone || user?.location
                ? "75%"
                : "50%"}
          </div>

          <div className="progress-track">
            <span
              style={{
                width:
                  user?.phone && user?.location
                    ? "100%"
                    : user?.phone || user?.location
                      ? "75%"
                      : "50%",
              }}
            />
          </div>

          <p className="stat-foot">
            Add details to complete your profile
          </p>
        </article>
        
        <article className="stat-card">
          <div className="stat-top">
            <span className="stat-icon stat-orange">
              <i className="fa-solid fa-calendar-check" />
            </span>

            <span className="stat-label">
              MEMBER SINCE
            </span>
          </div>

          <div className="stat-value">
            {user?.joinedAt
              ? new Date(user.joinedAt).toLocaleDateString(
                  "en",
                  {
                    month: "short",
                    year: "numeric",
                  }
                )
              : "Today"}
          </div>

          <p className="stat-foot">
            Glad to have you with us
          </p>
        </article>
      </section>

      <section className="dashboard-columns">
        
        <article className="content-card activity-card">
          <div className="card-heading">
            <div>
              <h2>Recent activity</h2>
              <p>
                A quick look at your account activity.
              </p>
            </div>

            <span className="live-badge">
              <span />
              LIVE
            </span>
          </div>


          <div className="activity-search">
            <i className="fa-solid fa-magnifying-glass" />

            <input
              aria-label="Search activity"
              placeholder="Search activity..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            )}
          </div>

          {activities.length ? (
            <div className="activity-list">
              {activities.map((a, i) => (
                <div
                  className="activity-item"
                  key={a.title}
                >
                  <div
                    className={`activity-icon ${a.color}`}
                  >
                    <i
                      className={`fa-solid ${a.icon}`}
                    />
                  </div>

                  <div className="activity-copy">
                    <strong>{a.title}</strong>
                    <span>{a.detail}</span>
                  </div>

                  <time>{a.time}</time>

                  {i < activities.length - 1 && (
                    <span className="activity-connector" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No matching activity"
              icon="fa-clock"
            >
              Try another keyword to find an activity.
            </EmptyState>
          )}
        </article>


        <div className="dashboard-right">
          
          <article className="content-card profile-summary">
            <div className="card-heading">
              <div>
                <h2>Profile overview</h2>
                <p>Your account details.</p>
              </div>

              <Link
                to="/profile"
                className="icon-link"
                aria-label="View profile"
              >
                <i className="fa-solid fa-arrow-up-right-from-square" />
              </Link>
            </div>

            <div className="profile-mini">
              <div className="avatar avatar-large">
                {user?.name?.charAt(0)?.toUpperCase() ||
                  "U"}
              </div>

              <h3>{user?.name}</h3>
              <p>{user?.email}</p>

              <span className="role-chip">
                <i className="fa-solid fa-user" />
                {user?.role || "User"}
              </span>
            </div>

            <div className="summary-details">
              <div>
                <span>Full name</span>
                <strong>
                  {user?.name || "Not set"}
                </strong>
              </div>

              <div>
                <span>Email address</span>
                <strong>
                  {user?.email || "Not set"}
                </strong>
              </div>

              <div>
                <span>Phone number</span>
                <strong>
                  {user?.phone || "Not added"}
                </strong>
              </div>
            </div>

            <Link
              to="/profile/edit"
              className="btn btn-secondary btn-block"
            >
              Manage profile
              <i className="fa-solid fa-arrow-right" />
            </Link>
          </article>

          <article className="security-card">
            <div className="security-card-icon">
              <i className="fa-solid fa-shield-halved" />
            </div>

            <div>
              <h3>Keep your account secure</h3>

              <p>
                Update your password regularly to help
                protect your account.
              </p>

              <Link to="/change-password">
                Review security
                <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}