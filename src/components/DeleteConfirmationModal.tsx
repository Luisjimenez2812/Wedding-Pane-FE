import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  guestName: string;
}

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({ isOpen, onClose, onConfirm, guestName }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          maxWidth: '400px',
          width: '100%',
          padding: '24px',
          transform: 'scale(1)',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗑️</div>
          <h3
            style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '8px',
              fontFamily: 'Great Vibes, cursive',
            }}
          >
            ¿Eliminar Invitado?
          </h3>
          <p
            style={{
              color: '#6b7280',
              marginBottom: '24px',
              fontSize: '16px',
              fontFamily: 'Cormorant Garamond, serif',
            }}
          >
            ¿Estás seguro de que deseas eliminar la invitación de{' '}
            <span style={{ fontWeight: '600', color: '#111827' }}>
              {guestName}
            </span>
            ? Esta acción no se puede deshacer.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <button
              onClick={onClose}
              style={{
                padding: '12px 24px',
                color: '#374151',
                backgroundColor: '#f3f4f6',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'Cormorant Garamond, serif',
              }}
              onMouseOver={e =>
                (e.currentTarget.style.backgroundColor = '#e5e7eb')
              }
              onMouseOut={e =>
                (e.currentTarget.style.backgroundColor = '#f3f4f6')
              }
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              style={{
                padding: '12px 24px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'Cormorant Garamond, serif',
              }}
              onMouseOver={e =>
                (e.currentTarget.style.backgroundColor = '#dc2626')
              }
              onMouseOut={e =>
                (e.currentTarget.style.backgroundColor = '#ef4444')
              }
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
