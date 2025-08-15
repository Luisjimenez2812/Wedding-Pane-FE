import React from 'react';
import { Toast, type ToastProps } from './Toast';

export interface ToastData {
  id: string;
  type: ToastProps['type'];
  title: string;
  message: string;
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastData[];
  onRemoveToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemoveToast,
}) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      pointerEvents: 'none',
      maxWidth: 'calc(100vw - 40px)',
    }}>
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{
            pointerEvents: 'auto',
            transform: `translateY(${index * 80}px)`,
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <Toast
            id={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            duration={toast.duration}
            onClose={onRemoveToast}
          />
        </div>
      ))}
    </div>
  );
};

// Hook para manejar toasts
export const useToasts = () => {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = React.useCallback(
    (title: string, message: string) => {
      addToast({ type: 'success', title, message });
    },
    [addToast]
  );

  const showError = React.useCallback(
    (title: string, message: string) => {
      addToast({ type: 'error', title, message });
    },
    [addToast]
  );

  const showWarning = React.useCallback(
    (title: string, message: string) => {
      addToast({ type: 'warning', title, message });
    },
    [addToast]
  );

  const showInfo = React.useCallback(
    (title: string, message: string) => {
      addToast({ type: 'info', title, message });
    },
    [addToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
