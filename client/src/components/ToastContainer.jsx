import { AlertCircle, CheckCircle, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import '../styles/toast.css';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <div className="toast-content">
            {toast.type === 'error' ? (
              <AlertCircle size={18} className="toast-icon toast-icon-error" />
            ) : (
              <CheckCircle size={18} className="toast-icon toast-icon-success" />
            )}
            <span>{toast.message}</span>
          </div>
          <button onClick={() => removeToast(toast.id)} className="toast-close" aria-label="Close notification">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
