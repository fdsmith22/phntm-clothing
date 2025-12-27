"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextType {
  showToast: (message: string, type?: Toast["type"]) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-black border border-neutral-800 px-6 py-4 pr-10 min-w-[280px] max-w-[360px]"
            >
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-neutral-700" />
              <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-neutral-700" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-neutral-700" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-neutral-700" />

              <div className="flex items-start gap-3">
                <motion.span
                  className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${
                    toast.type === "success"
                      ? "bg-green-500"
                      : toast.type === "error"
                      ? "bg-red-500"
                      : "bg-blue-500"
                  }`}
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div>
                  <span
                    className={`font-mono text-[9px] uppercase tracking-widest block mb-1 ${
                      toast.type === "success"
                        ? "text-green-500"
                        : toast.type === "error"
                        ? "text-red-500"
                        : "text-blue-500"
                    }`}
                  >
                    {toast.type === "success"
                      ? "// SUCCESS"
                      : toast.type === "error"
                      ? "// ERROR"
                      : "// INFO"}
                  </span>
                  <p className="text-sm text-white">{toast.message}</p>
                </div>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="absolute top-3 right-3 text-neutral-600 hover:text-white transition-colors"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Progress bar */}
              <motion.div
                className={`absolute bottom-0 left-0 h-[2px] ${
                  toast.type === "success"
                    ? "bg-green-500"
                    : toast.type === "error"
                    ? "bg-red-500"
                    : "bg-blue-500"
                }`}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
