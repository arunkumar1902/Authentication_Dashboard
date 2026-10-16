import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);

  const toast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();

    setItems((current) => [
      ...current,
      { id, message, type },
    ]);

    window.setTimeout(() => {
      setItems((current) =>
        current.filter((item) => item.id !== id)
      );
    }, 3600);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}

      <div
        className="toast-stack"
        aria-live="polite"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`toast toast-${item.type}`}
          >
            <i
              className={`fa-solid ${
                item.type === "error"
                  ? "fa-circle-exclamation"
                  : "fa-circle-check"
              }`}
            />

            <span>{item.message}</span>

            <button
              aria-label="Dismiss notification"
              onClick={() =>
                setItems((current) =>
                  current.filter(
                    (t) => t.id !== item.id
                  )
                )
              }
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

export function ToastHost() {
  return null;
}