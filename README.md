# AccessHub — Authentication & User Access Dashboard

## Requirements
- Node.js 18+
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Screens included
- Login
- Registration
- Forgot password
- Reset password
- Dashboard (protected)
- User profile
- Edit profile
- Change password
- Logout confirmation and session handling

## Demo notes
Create an account from the Registration screen, then sign in. The app stores demo account data in localStorage. Remember Me stores the demo session in localStorage; when unchecked, the session uses sessionStorage. Password reset is a local simulation: request a reset for an existing account, then continue to Reset Password.

This is a frontend-only educational demo. Do not use real or sensitive passwords. Production authentication must be implemented on a backend with secure password hashing, server-managed sessions or secure tokens, email reset verification, rate limiting, and appropriate CSRF protections.

## Structure
```text
src/
  components/
    AppLayout.jsx
    ProtectedRoute.jsx
    Toast.jsx
    UI.jsx
  context/
    AuthContext.jsx
  pages/
    AuthShell.jsx
    Login.jsx
    Register.jsx
    ForgotPassword.jsx
    ResetPassword.jsx
    Dashboard.jsx
    Profile.jsx
    EditProfile.jsx
    ChangePassword.jsx
  styles/
    global.css
    auth.css
    dashboard.css
    profile.css
  App.jsx
  main.jsx
```
