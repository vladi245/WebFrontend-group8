import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import ToastContainer from '../components/Notifications/ToastContainer';

export type ToastTone = 'info' | 'warning' | 'success';

export interface ToastOptions {
  title?: string;
  message: string;
  tone?: ToastTone;
  durationMs?: number;
}

interface Toast extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  addToast: (options: ToastOptions) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev: Toast[]) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    ({ title, message, tone = 'info', durationMs = 9000 }: ToastOptions) => {
      const id = generateId();
      setToasts((prev: Toast[]) => [...prev, { id, title, message, tone, durationMs }]);

      window.setTimeout(() => removeToast(id), durationMs);
      return id;
    },
    [removeToast],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      addToast,
      removeToast,
    }),
    [addToast, removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

