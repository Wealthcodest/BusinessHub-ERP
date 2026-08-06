import { useCallback, useMemo, useRef, useState } from "react";

import ToastContainer from "./ToastContainer";
import { ToastContext } from "./toastContext";

const MAX_VISIBLE_TOASTS = 5;
const EXIT_ANIMATION_DURATION = 200;

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);
  const exitTimersRef = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((currentToasts) => {
      const toast = currentToasts.find((item) => item.id === id);

      if (!toast || toast.isExiting) return currentToasts;

      return currentToasts.map((item) =>
        item.id === id ? { ...item, isExiting: true } : item
      );
    });

    if (!exitTimersRef.current.has(id)) {
      const timer = window.setTimeout(() => {
        setToasts((currentToasts) =>
          currentToasts.filter((toast) => toast.id !== id)
        );
        exitTimersRef.current.delete(id);
      }, EXIT_ANIMATION_DURATION);

      exitTimersRef.current.set(id, timer);
    }
  }, []);

  const addToast = useCallback((type, message) => {
    const id = `toast-${Date.now()}-${idRef.current++}`;

    setToasts((currentToasts) => [
      ...currentToasts.filter((toast) => !toast.isExiting),
      { id, type, message, isEntering: true, isExiting: false },
    ].slice(-MAX_VISIBLE_TOASTS));

    window.requestAnimationFrame(() => {
      setToasts((currentToasts) =>
        currentToasts.map((toast) =>
          toast.id === id ? { ...toast, isEntering: false } : toast
        )
      );
    });

    window.setTimeout(() => dismiss(id), 4000);

    return id;
  }, [dismiss]);

  const toast = useMemo(() => ({
    success: (message) => addToast("success", message),
    error: (message) => addToast("error", message),
    warning: (message) => addToast("warning", message),
    info: (message) => addToast("info", message),
    dismiss,
  }), [addToast, dismiss]);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}
