import React, { useState, useEffect } from 'react';

export interface Guest {
  id: number;
  name: string;
  phone: string;
  status: 'confirmed' | 'pending' | 'declined';
  totalGuests: number;
  additionalGuests: string[];
  invitationId: string;
  confirmedGuests?: number;
}

interface GuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (guest: Omit<Guest, 'id'>) => void;
  guest?: Guest | null;
  mode: 'create' | 'edit';
}

export const GuestModal: React.FC<GuestModalProps> = ({
  isOpen,
  onClose,
  onSave,
  guest,
  mode,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    status: 'pending' as 'confirmed' | 'pending' | 'declined',
    totalGuests: 1,
    additionalGuests: [] as string[],
    invitationId: '',
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [additionalGuestInput, setAdditionalGuestInput] = useState('');

  useEffect(() => {
    if (guest && mode === 'edit') {
      setFormData({
        name: guest.name,
        phone: guest.phone,
        status: guest.status,
        totalGuests: guest.totalGuests,
        additionalGuests: guest.additionalGuests,
        invitationId: guest.invitationId,
      });
    } else {
      setFormData({
        name: '',
        phone: '',
        status: 'pending',
        totalGuests: 1,
        additionalGuests: [],
        invitationId: generateInvitationId(),
      });
    }
  }, [guest, mode, isOpen]);

  const generateInvitationId = () => {
    return 'INV' + Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addAdditionalGuest = () => {
    if (additionalGuestInput.trim()) {
      setFormData(prev => ({
        ...prev,
        additionalGuests: [
          ...prev.additionalGuests,
          additionalGuestInput.trim(),
        ],
      }));
      setAdditionalGuestInput('');
    }
  };

  const removeAdditionalGuest = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalGuests: prev.additionalGuests.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const confirmSave = () => {
    onSave(formData);
    setShowConfirmation(false);
    onClose();
  };

  const cancelSave = () => {
    setShowConfirmation(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
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
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            transform: 'scale(1)',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Modal Header */}
          <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <div style={{ fontSize: '24px' }}>
                  {mode === 'create' ? '👥' : '✏️'}
                </div>
                <div>
                  <h2
                    style={{
                      fontSize: '24px',
                      fontWeight: '600',
                      color: '#111827',
                      margin: '0 0 4px 0',
                      fontFamily: 'Great Vibes, cursive',
                    }}
                  >
                    {mode === 'create' ? 'Agregar Invitado' : 'Editar Invitado'}
                  </h2>
                  <p
                    style={{
                      color: '#6b7280',
                      margin: '0',
                      fontSize: '14px',
                      fontFamily: 'Cormorant Garamond, serif',
                    }}
                  >
                    {mode === 'create'
                      ? 'Crear una nueva invitación'
                      : 'Modificar información del invitado'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  fontSize: '24px',
                  padding: '4px',
                  borderRadius: '4px',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={e => (e.currentTarget.style.color = '#4b5563')}
                onMouseOut={e => (e.currentTarget.style.color = '#9ca3af')}
              >
                ×
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div style={{ padding: '24px' }}>
            {/* Información Principal */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '24px',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px',
                    fontFamily: 'Cormorant Garamond, serif',
                  }}
                >
                  Nombre del Invitado Principal *
                </label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontFamily: 'Cormorant Garamond, serif',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    backgroundColor: 'white',
                    color: '#374151',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = '#a67c52';
                    e.target.style.boxShadow =
                      '0 0 0 3px rgba(166, 124, 82, 0.1)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder='Nombre y apellido'
                  required
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px',
                    fontFamily: 'Cormorant Garamond, serif',
                  }}
                >
                  Teléfono *
                </label>
                <input
                  type='tel'
                  value={formData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontFamily: 'Cormorant Garamond, serif',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    backgroundColor: 'white',
                    color: '#374151',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = '#a67c52';
                    e.target.style.boxShadow =
                      '0 0 0 3px rgba(166, 124, 82, 0.1)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder='+504 0000-0000'
                  required
                />
              </div>
            </div>

            {/* Estado y Total de Invitados */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '24px',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px',
                    fontFamily: 'Cormorant Garamond, serif',
                  }}
                >
                  Estado
                </label>
                <select
                  value={formData.status}
                  onChange={e => handleInputChange('status', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontFamily: 'Cormorant Garamond, serif',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    backgroundColor: 'white',
                    color: '#374151',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = '#a67c52';
                    e.target.style.boxShadow =
                      '0 0 0 3px rgba(166, 124, 82, 0.1)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value='pending'>Pendiente</option>
                  <option value='confirmed'>Confirmado</option>
                  <option value='declined'>Declinado</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px',
                    fontFamily: 'Cormorant Garamond, serif',
                  }}
                >
                  Total de Invitados *
                </label>
                <input
                  type='number'
                  min='1'
                  value={formData.totalGuests}
                  onChange={e =>
                    handleInputChange('totalGuests', parseInt(e.target.value))
                  }
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontFamily: 'Cormorant Garamond, serif',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    backgroundColor: 'white',
                    color: '#374151',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = '#a67c52';
                    e.target.style.boxShadow =
                      '0 0 0 3px rgba(166, 124, 82, 0.1)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>
            </div>

            {/* ID de Invitación */}
            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px',
                  fontFamily: 'Cormorant Garamond, serif',
                }}
              >
                ID de Invitación
              </label>
              <input
                type='text'
                value={formData.invitationId}
                onChange={e =>
                  handleInputChange('invitationId', e.target.value)
                }
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontFamily: 'Cormorant Garamond, serif',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  backgroundColor: mode === 'edit' ? '#f9fafb' : 'white',
                  color: '#374151',
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#a67c52';
                  e.target.style.boxShadow =
                    '0 0 0 3px rgba(166, 124, 82, 0.1)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder='ID único de la invitación'
                readOnly={mode === 'edit'}
              />
            </div>

            {/* Invitados Adicionales */}
            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px',
                  fontFamily: 'Cormorant Garamond, serif',
                }}
              >
                Invitados Adicionales
              </label>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type='text'
                    value={additionalGuestInput}
                    onChange={e => setAdditionalGuestInput(e.target.value)}
                    style={{
                      flex: '1',
                      padding: '12px 16px',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontFamily: 'Cormorant Garamond, serif',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                      backgroundColor: 'white',
                      color: '#374151',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = '#a67c52';
                      e.target.style.boxShadow =
                        '0 0 0 3px rgba(166, 124, 82, 0.1)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder='Nombre del invitado adicional'
                    onKeyPress={e => e.key === 'Enter' && addAdditionalGuest()}
                  />
                  <button
                    type='button'
                    onClick={addAdditionalGuest}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: !additionalGuestInput.trim()
                        ? '#9ca3af'
                        : '#a67c52',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: !additionalGuestInput.trim()
                        ? 'not-allowed'
                        : 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'Cormorant Garamond, serif',
                    }}
                    onMouseOver={e => {
                      if (additionalGuestInput.trim()) {
                        e.currentTarget.style.backgroundColor = '#8b6b3f';
                      }
                    }}
                    onMouseOut={e => {
                      if (additionalGuestInput.trim()) {
                        e.currentTarget.style.backgroundColor = '#a67c52';
                      }
                    }}
                    disabled={!additionalGuestInput.trim()}
                  >
                    Agregar
                  </button>
                </div>

                {formData.additionalGuests.length > 0 && (
                  <div style={{ marginTop: '12px' }}>
                    {formData.additionalGuests.map((guest, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: '#f9fafb',
                          padding: '12px',
                          borderRadius: '8px',
                          marginBottom: '8px',
                        }}
                      >
                        <span
                          style={{
                            color: '#374151',
                            fontFamily: 'Cormorant Garamond, serif',
                          }}
                        >
                          {guest}
                        </span>
                        <button
                          type='button'
                          onClick={() => removeAdditionalGuest(index)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontSize: '18px',
                            padding: '4px',
                            borderRadius: '4px',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseOver={e =>
                            (e.currentTarget.style.color = '#dc2626')
                          }
                          onMouseOut={e =>
                            (e.currentTarget.style.color = '#ef4444')
                          }
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div
            style={{
              padding: '24px',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'flex-end',
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
              onClick={handleSubmit}
              style={{
                padding: '12px 24px',
                backgroundColor:
                  !formData.name || !formData.phone ? '#9ca3af' : '#a67c52',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor:
                  !formData.name || !formData.phone ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'Cormorant Garamond, serif',
              }}
              onMouseOver={e => {
                if (formData.name && formData.phone) {
                  e.currentTarget.style.backgroundColor = '#8b6b3f';
                }
              }}
              onMouseOut={e => {
                if (formData.name && formData.phone) {
                  e.currentTarget.style.backgroundColor = '#a67c52';
                }
              }}
              disabled={!formData.name || !formData.phone}
            >
              {mode === 'create' ? 'Crear Invitado' : 'Guardar Cambios'}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            zIndex: 10000,
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
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤔</div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '8px',
                  fontFamily: 'Great Vibes, cursive',
                }}
              >
                ¿Estás seguro?
              </h3>
              <p
                style={{
                  color: '#6b7280',
                  marginBottom: '24px',
                  fontSize: '16px',
                  fontFamily: 'Cormorant Garamond, serif',
                }}
              >
                {mode === 'create'
                  ? '¿Deseas crear esta invitación con la información proporcionada?'
                  : '¿Deseas guardar los cambios realizados?'}
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                }}
              >
                <button
                  onClick={cancelSave}
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
                  onClick={confirmSave}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#10b981',
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
                    (e.currentTarget.style.backgroundColor = '#059669')
                  }
                  onMouseOut={e =>
                    (e.currentTarget.style.backgroundColor = '#10b981')
                  }
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
