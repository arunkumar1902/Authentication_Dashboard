import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useToast } from "./Toast";
import { Modal } from "./UI";

export default function AppLayout() {
  const { user, logout } = useAuth();

  const toast = useToast();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const doLogout = () => {
    logout();

    setConfirmLogout(false);

    toast("You have been securely signed out.");

    navigate("/login", { replace: true });
  };

  const links = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: "fa-chart-pie",
    },
    {
      to: "/profile",
      label: "My Profile",
      icon: "fa-user",
    },
    {
      to: "/profile/edit",
      label: "Edit Profile",
      icon: "fa-user-pen",
    },
    {
      to: "/change-password",
      label: "Security",
      icon: "fa-shield-halved",
    },
  ];

  return (
    <div className="app-shell">
      {/* Sidebar background overlay for mobile */}
      {menuOpen && (
        <button
          className="sidebar-scrim"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar ${
          menuOpen ? "sidebar-open" : ""
        }`}
      >
        <div className="brand">
          <span className="brand-mark">
            <i className="fa-solid fa-shield-halved" />
          </span>

          <span>
            Access
            <span className="brand-accent">Hub</span>
          </span>

          <button
            className="mobile-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* Workspace label */}
        <div className="workspace-label">
          WORKSPACE
        </div>

        {/* Navigation links */}
        <nav className="side-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/dashboard"}
              onClick={() => setMenuOpen(false)}
            >
              <i className={`fa-solid ${link.icon}`} />

              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar bottom section */}
        <div className="sidebar-bottom">
          <div className="security-note">
            <i className="fa-solid fa-lock" />

            <div>
              <strong>Your account, protected</strong>
              <small>Security status: Active</small>
            </div>
          </div>

          <button
            className="nav-logout"
            onClick={() => setConfirmLogout(true)}
          >
            <i className="fa-solid fa-arrow-right-from-bracket" />

            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main content panel */}
      <main className="main-panel">
        {/* Top navigation bar */}
        <header className="topbar">
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <i className="fa-solid fa-bars" />
          </button>

          {/* Breadcrumb navigation */}
          <div className="breadcrumb">
            <span>Workspace</span>

            <i className="fa-solid fa-chevron-right" />

            <strong>
              {
                links.find(
                  (link) =>
                    link.to === window.location.pathname
                )?.label || "Account"
              }
            </strong>
          </div>

          {/* Logged-in user information */}
          <div className="topbar-user">
            <div className="topbar-user-copy">
              <strong>{user?.name}</strong>

              <span>{user?.role || "User"}</span>
            </div>

            <div className="avatar avatar-small">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>
        </header>

        {/* Page content rendered by React Router */}
        <div className="page-content">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="app-footer">
          <span>
            © {new Date().getFullYear()} AccessHub
          </span>

          <span>
            <i className="fa-solid fa-shield-halved" />
            Secure account management
          </span>
        </footer>
      </main>

      {/* Logout confirmation modal */}
      {confirmLogout && (
        <Modal
          title="Sign out of AccessHub?"
          onClose={() => setConfirmLogout(false)}
          onConfirm={doLogout}
          confirmText="Sign out"
          danger
        >
          <p>
            You will need to sign in again to access your
            dashboard.
          </p>
        </Modal>
      )}
    </div>
  );
}