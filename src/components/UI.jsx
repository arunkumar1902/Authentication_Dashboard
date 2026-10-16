import { useState } from "react";

// Button Component
export function Button({
  children,
  block = false,
  className = "",
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
  onClick,
  ...props
}) {
  const buttonClass = [
    "btn",
    `btn-${variant}`,
    block ? "btn-block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

// Field Component
export function Field({
  label,
  error,
  hint,
  type = "text",
  ...props
}) {
  const [visible, setVisible] = useState(false);

  const isPassword = type === "password";

  return (
    <div className={`field ${error ? "field-error" : ""}`}>
      {label && (
        <label htmlFor={props.id}>
          {label}
        </label>
      )}

      <div className="field-control">
        <input
          type={
            isPassword
              ? visible
                ? "text"
                : "password"
              : type
          }
          aria-invalid={!!error}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            aria-label={
              visible ? "Hide password" : "Show password"
            }
            onClick={() => setVisible((v) => !v)}
          >
            <i
              className={`fa-regular ${
                visible ? "fa-eye-slash" : "fa-eye"
              }`}
            />
          </button>
        )}
      </div>

      {error ? (
        <small className="field-message error-message">
          {error}
        </small>
      ) : hint ? (
        <small className="field-message">
          {hint}
        </small>
      ) : null}
    </div>
  );
}

// Password Rules Component
export function PasswordRules({ password }) {
  const checks = [
    ["At least 8 characters", password.length >= 8],
    ["One uppercase letter", /[A-Z]/.test(password)],
    ["One lowercase letter", /[a-z]/.test(password)],
    ["One number", /\d/.test(password)],
    [
      "One special character",
      /[^A-Za-z0-9]/.test(password),
    ],
  ];

  return (
    <ul className="password-rules">
      {checks.map(([text, pass]) => (
        <li
          className={pass ? "rule-pass" : ""}
          key={text}
        >
          <i
            className={`fa-solid ${
              pass ? "fa-circle-check" : "fa-circle"
            }`}
          />

          {text}
        </li>
      ))}
    </ul>
  );
}

// Modal Component
export function Modal({
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  danger = false,
  busy = false,
}) {
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) =>
        e.target === e.currentTarget && onClose()
      }
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <i className="fa-solid fa-xmark" />
        </button>

        <div className={`modal-symbol ${danger ? "danger" : ""}`}>
          <i
            className={`fa-solid ${
              danger
                ? "fa-triangle-exclamation"
                : "fa-circle-question"
            }`}
          />
        </div>

        <h2 id="modal-title">{title}</h2>

        <div className="modal-copy">
          {children}
        </div>

        <div className="modal-actions">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant={danger ? "danger" : "primary"}
            loading={busy}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </section>
    </div>
  );
}

// Empty State Component
export function EmptyState({
  icon = "fa-folder-open",
  title = "Nothing here yet",
  children = "Try adjusting your search or filters.",
}) {
  return (
    <div className="empty-state">
      <span>
        <i className={`fa-regular ${icon}`} />
      </span>

      <h3>{title}</h3>

      <p>{children}</p>
    </div>
  );
}

// Loading State Component
export function LoadingState({
  label = "Loading...",
}) {
  return (
    <div className="loading-state">
      <span className="spinner spinner-dark" />

      {label}
    </div>
  );
}