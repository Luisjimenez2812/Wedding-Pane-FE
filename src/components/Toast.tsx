import React, { useEffect, useState } from 'react';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animación de entrada
    const enterTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Auto-dismiss
    const dismissTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose(id);
      }, 300); // Tiempo para la animación de salida
    }, duration);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(dismissTimer);
    };
  }, [id, duration, onClose]);

  const getToastStyles = () => {
    const baseStyles: React.CSSProperties = {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 10000,
      minWidth: '320px',
      maxWidth: '400px',
      width: 'auto',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(166, 124, 82, 0.15)',
      border: '1px solid rgba(166, 124, 82, 0.1)',
      padding: '16px 20px',
      transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.3s ease-in-out',
      backdropFilter: 'blur(10px)',
      boxSizing: 'border-box',
    };

    switch (type) {
      case 'success':
        return {
          ...baseStyles,
          borderLeft: '4px solid #a67c52',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
        };
      case 'error':
        return {
          ...baseStyles,
          borderLeft: '4px solid #dc2626',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
        };
      case 'warning':
        return {
          ...baseStyles,
          borderLeft: '4px solid #f59e0b',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
        };
      case 'info':
        return {
          ...baseStyles,
          borderLeft: '4px solid #3b82f6',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
        };
      default:
        return baseStyles;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✨';
      case 'error':
        return '💔';
      case 'warning':
        return '💫';
      case 'info':
        return '💌';
      default:
        return '💌';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return '#a67c52';
      case 'error':
        return '#dc2626';
      case 'warning':
        return '#f59e0b';
      case 'info':
        return '#3b82f6';
      default:
        return '#a67c52';
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  return (
    <div style={getToastStyles()}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        width: '100%',
      }}>
        <div style={{
          flexShrink: 0,
          fontSize: '18px',
          color: getIconColor(),
          filter: 'drop-shadow(0 1px 2px rgba(166, 124, 82, 0.2))',
          marginTop: '2px',
        }}>
          {getIcon()}
        </div>
        
        <div style={{
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
        }}>
          <h4 style={{
            margin: '0 0 4px 0',
            fontSize: '14px',
            fontWeight: 600,
            color: '#2d1810',
            fontFamily: 'Cormorant Garamond, serif',
            lineHeight: 1.2,
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}>
            {title}
          </h4>
          <p style={{
            margin: 0,
            fontSize: '12px',
            color: '#6b5b47',
            lineHeight: 1.3,
            fontFamily: 'Cormorant Garamond, serif',
            opacity: 0.8,
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}>
            {message}
          </p>
        </div>
        
        <button
          onClick={handleClose}
          style={{
            flexShrink: 0,
            background: 'none',
            border: 'none',
            fontSize: '16px',
            color: '#a67c52',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '20px',
            height: '20px',
            opacity: 0.6,
            marginTop: '2px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.backgroundColor = 'rgba(166, 124, 82, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.6';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};
