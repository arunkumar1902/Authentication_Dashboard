import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState } from "react";

// Create authentication context
const AuthContext = createContext(null);

const USERS_KEY = "accesshub_users";
const SESSION_KEY = "accesshub_session";
const REMEMBER_KEY = "accesshub_remembered_session";

const defaultUser = {
  email: "user@example.com",
  password:"User@123"
};

const readUsers = () => {
  try {
    const savedUsers = localStorage.getItem(USERS_KEY);

    return savedUsers ? JSON.parse(savedUsers) : [defaultUser];
  } catch {
    return [];
  }
};

const readSession = () => {
  try {
    const saved =
      sessionStorage.getItem(SESSION_KEY) ||
      localStorage.getItem(REMEMBER_KEY);

    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

// Authentication Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSession);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (user) {
      const users = readUsers();

      const latest = users.find(
        (u) => u.id === user.id
      );

      if (latest) {
        setUser((current) => ({
          ...current,
          ...latest,
        }));
      }
    }
  }, []);

  // Register a new user
  const register = async ({ name, email, password }) => {
    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 450)
    );

    const users = readUsers();

    if (
      users.some(
        (u) =>
          u.email.toLowerCase() ===
          email.trim().toLowerCase()
      )
    ) {
      setLoading(false);

      throw new Error(
        "An account with this email already exists."
      );
    }

    // Create the new user
    const created = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: "User",
      phone: "",
      location: "",
      joinedAt: new Date().toISOString(),
    };

    localStorage.setItem( USERS_KEY, JSON.stringify([...users, created]) );
    setLoading(false);
    return created;
  };

  // Log in an existing user
  const login = async ( email, password, remember = false ) => {
    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );

    const found = readUsers().find( (u) => 
      u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    setLoading(false);

    if (!found) {
      throw new Error(
        "Email or password is incorrect."
      );
    }

    // Remove the password from session user data
    const safeUser = { ...found };
    delete safeUser.password;

    // Clear any previous session
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(REMEMBER_KEY);

    // Save the session according to Remember Me
    (
      remember ? localStorage : sessionStorage
    ).setItem(
      remember ? REMEMBER_KEY : SESSION_KEY,
      JSON.stringify(safeUser)
    );

    setUser(safeUser);

    return safeUser;
  };

  // Update the user's profile
  const updateProfile = async (updates) => {
    if (!user) {
      throw new Error("Please sign in again.");
    }

    const users = readUsers();

    const updated = {
      ...users.find((u) => u.id === user.id),
      ...updates,
    };

    // Update the user in localStorage
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(
        users.map((u) =>
          u.id === user.id ? updated : u
        )
      )
    );

    // Keep the password out of session data
    const safeUser = { ...updated };
    delete safeUser.password;

    setUser(safeUser);

    persistSession(safeUser);

    return safeUser;
  };

  // Change the current user's password
  const changePassword = async (
    currentPassword,
    newPassword
  ) => {
    const users = readUsers();

    const found = users.find(
      (u) => u.id === user?.id
    );

    if (
      !found ||
      found.password !== currentPassword
    ) {
      throw new Error(
        "Your current password is incorrect."
      );
    }

    // Save the new password
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(
        users.map((u) =>
          u.id === user.id
            ? { ...u, password: newPassword }
            : u
        )
      )
    );
  };

  // Request a password reset
  const requestReset = async (email) => {
    await new Promise((resolve) =>
      setTimeout(resolve, 450)
    );

    const found = readUsers().find(
      (u) =>
        u.email.toLowerCase() ===
        email.trim().toLowerCase()
    );

    if (!found) {
      throw new Error(
        "No account was found with that email address."
      );
    }

    // Store the email for the reset process
    sessionStorage.setItem(
      "accesshub_reset_email",
      found.email
    );
  };

  // Reset the user's password
  const resetPassword = async (newPassword) => {
    const email = sessionStorage.getItem(
      "accesshub_reset_email"
    );

    if (!email) {
      throw new Error(
        "Your reset session has expired. Please request a new reset."
      );
    }

    const users = readUsers();

    // Update the password for the matching account
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(
        users.map((u) =>
          u.email === email
            ? { ...u, password: newPassword }
            : u
        )
      )
    );

    // Clear the reset session
    sessionStorage.removeItem(
      "accesshub_reset_email"
    );
  };

  // Persist updated session information
  const persistSession = (safeUser) => {
    if (localStorage.getItem(REMEMBER_KEY)) {
      localStorage.setItem(
        REMEMBER_KEY,
        JSON.stringify(safeUser)
      );
    } else {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify(safeUser)
      );
    }
  };

  // Log out the current user
  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(REMEMBER_KEY);

    setUser(null);
  };

  // Share authentication data and methods
  const value = useMemo(
    () => ({
      user,
      loading,
      register,
      login,
      logout,
      updateProfile,
      changePassword,
      requestReset,
      resetPassword,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};