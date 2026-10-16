import { Link } from "react-router-dom";

export default function AuthShell({
  eyebrow = "WELCOME TO ACCESSHUB",
  title,
  subtitle,
  children,
  footer
}) {
  return (
    <main className="auth-layout">
      <section className="auth-main">
        <Link to="/login" className="auth-brand">
          <span className="brand-mark">
            <i className="fa-solid fa-shield-halved" />
          </span>

          Access
          <span>Hub</span>
        </Link>

        <div className="auth-card">
          <div className="auth-eyebrow">
            <span />
            {eyebrow}
          </div>

          <h1>{title}</h1>

          <p className="auth-subtitle">
            {subtitle}
          </p>

          {children}

          {footer && (
            <div className="auth-footer">
              {footer}
            </div>
          )}
        </div>

        <div className="auth-bottom">
          <span>
            © {new Date().getFullYear()} AccessHub Inc.
          </span>

          <span>
            Privacy · Terms · Help
          </span>
        </div>
      </section>


    </main>
  );
}