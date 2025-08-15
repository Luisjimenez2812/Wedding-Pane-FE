import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { GuestModal } from '../components/GuestModal';
import type { Guest } from '../components/GuestModal';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { ToastContainer, useToasts } from '../components/ToastContainer';

export const Route = createFileRoute('/guests')({
  component: GuestsPage,
});

function GuestsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [guests, setGuests] = useState<Guest[]>([
    {
      id: 1,
      name: 'Ana García',
      phone: '+504 9999-8888',
      status: 'confirmed',
      totalGuests: 2,
      additionalGuests: ['Carlos García'],
      invitationId: 'ABC123',
      confirmedGuests: 2,
    },
    {
      id: 2,
      name: 'María López',
      phone: '+504 8888-7777',
      status: 'pending',
      totalGuests: 1,
      additionalGuests: [],
      invitationId: 'DEF456',
    },
    {
      id: 3,
      name: 'Juan Pérez',
      phone: '+504 7777-6666',
      status: 'declined',
      totalGuests: 3,
      additionalGuests: ['Laura Pérez', 'Pedro Pérez'],
      invitationId: 'GHI789',
      confirmedGuests: 0,
    },
    {
      id: 4,
      name: 'Sofía Rodríguez',
      phone: '+504 6666-5555',
      status: 'confirmed',
      totalGuests: 2,
      additionalGuests: ['Miguel Rodríguez'],
      invitationId: 'JKL012',
      confirmedGuests: 1,
    },
    {
      id: 5,
      name: 'Roberto Martínez',
      phone: '+504 5555-4444',
      status: 'pending',
      totalGuests: 4,
      additionalGuests: ['Carmen Martínez', 'Diego Martínez', 'Elena Martínez'],
      invitationId: 'MNO345',
    },
  ]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [guestToDelete, setGuestToDelete] = useState<Guest | null>(null);

  // Toast management
  const { toasts, removeToast, showSuccess, showWarning } =
    useToasts();

  // Modal handlers
  const handleOpenCreateModal = () => {
    setModalMode('create');
    setSelectedGuest(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (guest: Guest) => {
    setModalMode('edit');
    setSelectedGuest(guest);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (guest: Guest) => {
    setGuestToDelete(guest);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGuest(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setGuestToDelete(null);
  };

  // CRUD operations
  const handleSaveGuest = (guestData: Omit<Guest, 'id'>) => {
    if (modalMode === 'create') {
      const newGuest: Guest = {
        ...guestData,
        id: Math.max(...guests.map(g => g.id)) + 1,
      };
      setGuests(prev => [...prev, newGuest]);
      showSuccess(
        'Invitado Creado',
        `Se ha creado exitosamente la invitación para ${guestData.name}`
      );
    } else {
      setGuests(prev =>
        prev.map(g =>
          g.id === selectedGuest?.id
            ? { ...guestData, id: g.id, confirmedGuests: g.confirmedGuests }
            : g
        )
      );
      showSuccess(
        'Invitado Actualizado',
        `Se han guardado los cambios para ${guestData.name}`
      );
    }
  };

  const handleDeleteGuest = () => {
    if (guestToDelete) {
      setGuests(prev => prev.filter(g => g.id !== guestToDelete.id));
      showWarning(
        'Invitado Eliminado',
        `Se ha eliminado la invitación de ${guestToDelete.name}`
      );
      handleCloseDeleteModal();
    }
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch =
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.invitationId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' || guest.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { text: 'Confirmado', class: 'status-confirmed' },
      pending: { text: 'Pendiente', class: 'status-pending' },
      declined: { text: 'Declinado', class: 'status-declined' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`status-badge ${config.class}`}>{config.text}</span>
    );
  };

  const getTotalConfirmedGuests = () => {
    return guests.reduce((total, guest) => {
      return total + (guest.confirmedGuests || 0);
    }, 0);
  };

  const getTotalInvitedGuests = () => {
    return guests.reduce((total, guest) => {
      return total + guest.totalGuests;
    }, 0);
  };

  return (
    <div className='guests-page'>
      <div className='guests-background'>
        <div className='guests-overlay'></div>
      </div>

      {/* Navbar Superior */}
      <nav className='dashboard-navbar'>
        <div className='navbar-container'>
          <div className='navbar-brand'>
            <div className='brand-icon'>👰🤵</div>
            <div className='brand-text'>
              <h2>Luis & Rosa</h2>
              <span>Panel de Administración</span>
            </div>
          </div>

          <div className='navbar-links'>
            <Link to='/' className='nav-link'>
              <span className='link-icon'>🏠</span>
              <span className='link-text'>Inicio</span>
            </Link>
            <Link to='/dashboard' className='nav-link'>
              <span className='link-icon'>📊</span>
              <span className='link-text'>Dashboard</span>
            </Link>
            <Link to='/guests' className='nav-link active'>
              <span className='link-icon'>👥</span>
              <span className='link-text'>Invitados</span>
            </Link>
            <Link to='/login' className='nav-link logout'>
              <span className='link-icon'>🚪</span>
              <span className='link-text'>Cerrar Sesión</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className='guests-container'>
        <header className='guests-header'>
          <div className='header-content'>
            <h1 className='guests-title'>Control de Invitados</h1>
            <p className='guests-subtitle'>
              Invitaciones de Luis & Rosa
            </p>
          </div>
          
          <div className='header-controls'>
            <div className='search-container'>
              <div className='search-icon'>🔍</div>
                              <input
                  type='text'
                  placeholder='Buscar por nombre, teléfono o ID...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='search-input'
                />
            </div>

            <button className='add-guest-button' onClick={handleOpenCreateModal}>
              <span className='button-icon'>+</span>
              <span className='button-text'>Agregar Invitado</span>
            </button>
          </div>
        </header>

        <div className='guests-stats'>
          <div className='stat-card'>
            <div className='stat-icon'>📋</div>
            <div className='stat-content'>
              <span className='stat-number'>{guests.length}</span>
              <span className='stat-label'>Invitaciones</span>
            </div>
          </div>
          <div className='stat-card'>
            <div className='stat-icon'>✅</div>
            <div className='stat-content'>
              <span className='stat-number'>
                {guests.filter(g => g.status === 'confirmed').length}
              </span>
              <span className='stat-label'>Confirmadas</span>
            </div>
          </div>
          <div className='stat-card'>
            <div className='stat-icon'>⏳</div>
            <div className='stat-content'>
              <span className='stat-number'>
                {guests.filter(g => g.status === 'pending').length}
              </span>
              <span className='stat-label'>Pendientes</span>
            </div>
          </div>
          <div className='stat-card'>
            <div className='stat-icon'>👥</div>
            <div className='stat-content'>
              <span className='stat-number'>{getTotalInvitedGuests()}</span>
              <span className='stat-label'>Invitados Totales</span>
            </div>
          </div>
          <div className='stat-card'>
            <div className='stat-icon'>🎉</div>
            <div className='stat-content'>
              <span className='stat-number'>{getTotalConfirmedGuests()}</span>
              <span className='stat-label'>Asistirán</span>
            </div>
          </div>
        </div>

        <div className='guests-table-container'>
          <div className='table-header'>
            <h3 className='table-title'>
              Lista de Invitados
              <span className='table-count'>
                ({filteredGuests.length} invitaciones)
              </span>
            </h3>
            <div className='table-filter'>
              <div className='filter-container'>
                <div className='filter-icon'>📊</div>
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className='filter-select'
                >
                  <option value='all'>Todos los estados</option>
                  <option value='confirmed'>Confirmados</option>
                  <option value='pending'>Pendientes</option>
                  <option value='declined'>Declinados</option>
                </select>
              </div>
            </div>
          </div>

          <div className='table-responsive'>
            <table className='guests-table'>
              <thead>
                <tr>
                  <th>Invitado Principal</th>
                  <th>Teléfono</th>
                  <th>Invitados Totales</th>
                  <th>Invitados Adicionales</th>
                  <th>Estado</th>
                  <th>ID Invitación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map(guest => (
                  <tr key={guest.id} className='guest-row'>
                    <td className='guest-name'>
                      <div className='name-container'>
                        <div className='name-icon'>👤</div>
                        <span>{guest.name}</span>
                      </div>
                    </td>
                    <td className='guest-phone'>{guest.phone}</td>
                    <td className='guest-total'>
                      <div className='total-container'>
                        <span className='total-number'>
                          {guest.totalGuests}
                        </span>
                        <span className='total-label'>personas</span>
                      </div>
                    </td>
                    <td className='guest-additional'>
                      {guest.additionalGuests.length > 0 ? (
                        <div className='additional-list'>
                          {guest.additionalGuests.map((name, index) => (
                            <span key={index} className='additional-name'>
                              {name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className='no-additional'>Sin acompañantes</span>
                      )}
                    </td>
                    <td className='guest-status'>
                      {getStatusBadge(guest.status)}
                    </td>
                    <td className='guest-invitation'>
                      <Link
                        to='/invitation/$invitationId'
                        params={{ invitationId: guest.invitationId }}
                        className='invitation-link'
                      >
                        <span className='invitation-icon'>🎫</span>
                        {guest.invitationId}
                      </Link>
                    </td>
                    <td className='guest-actions'>
                      <div className='action-buttons'>
                        <button
                          className='action-btn edit'
                          title='Editar invitado'
                          onClick={() => handleOpenEditModal(guest)}
                        >
                          <span className='action-icon'>✏️</span>
                        </button>
                        <button
                          className='action-btn delete'
                          title='Eliminar invitado'
                          onClick={() => handleOpenDeleteModal(guest)}
                        >
                          <span className='action-icon'>🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Vista de Tarjetas para Tablets y Móviles */}
          <div className='guests-cards'>
            {filteredGuests.map(guest => (
              <div key={guest.id} className='guest-card'>
                <div className='guest-card-header'>
                  <div className='guest-card-name'>
                    <span className='guest-card-name-icon'>👤</span>
                    <span>{guest.name}</span>
                  </div>
                  <div className='guest-card-actions'>
                    <button
                      className='guest-card-action-btn edit'
                      title='Editar invitado'
                      onClick={() => handleOpenEditModal(guest)}
                    >
                      ✏️
                    </button>
                    <button
                      className='guest-card-action-btn delete'
                      title='Eliminar invitado'
                      onClick={() => handleOpenDeleteModal(guest)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                <div className='guest-card-content'>
                  <div className='guest-card-field half-width'>
                    <span className='guest-card-label'>Teléfono</span>
                    <span className='guest-card-value guest-card-phone'>{guest.phone}</span>
                  </div>
                  
                  <div className='guest-card-field half-width'>
                    <span className='guest-card-label'>Invitados Totales</span>
                    <div className='guest-card-total'>
                      <span className='guest-card-total-number'>{guest.totalGuests}</span>
                      <span className='guest-card-total-label'>personas</span>
                    </div>
                  </div>
                  
                  <div className='guest-card-field full-width'>
                    <span className='guest-card-label'>Invitados Adicionales</span>
                    {guest.additionalGuests.length > 0 ? (
                      <div className='guest-card-additional'>
                        {guest.additionalGuests.map((name, index) => (
                          <span key={index} className='guest-card-additional-name'>
                            {name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className='guest-card-no-additional'>Sin acompañantes</span>
                    )}
                  </div>
                  
                  <div className='guest-card-field full-width'>
                    <span className='guest-card-label'>Estado</span>
                    <div className='guest-card-status-row'>
                      <div className='guest-card-status'>
                        {getStatusBadge(guest.status)}
                      </div>
                      <div className='guest-card-invitation'>
                        <Link
                          to='/invitation/$invitationId'
                          params={{ invitationId: guest.invitationId }}
                          className='guest-card-invitation-link'
                        >
                          <span>🎫</span>
                          {guest.invitationId}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <GuestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveGuest}
        guest={selectedGuest}
        mode={modalMode}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteGuest}
        guestName={guestToDelete?.name || ''}
      />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}
