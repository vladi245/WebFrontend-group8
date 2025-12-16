import styles from './Toast.module.css';
import type { ToastTone } from '../../context/ToastContext';

interface ToastProps {
  id: string;
  title?: string;
  message: string;
  tone?: ToastTone;
}

interface ToastContainerProps {
  toasts: ToastProps[];
  onDismiss: (id: string) => void;
}

const toneClassMap: Record<ToastTone, string> = {
  info: styles.info,
  warning: styles.warning,
  success: styles.success,
};

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className={styles.stack} aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} className={`${styles.toast} ${toneClassMap[toast.tone || 'info']}`} role="status">
          <div className={styles.content}>
            {toast.title && <p className={styles.title}>{toast.title}</p>}
            <p className={styles.message}>{toast.message}</p>
          </div>
          <button
            aria-label="Dismiss notification"
            className={styles.close}
            onClick={() => onDismiss(toast.id)}
            type="button"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

