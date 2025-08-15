import { createFileRoute, useParams } from '@tanstack/react-router';
import { useState } from 'react';
import { CouplePhoto } from '../components/CouplePhoto';
import { CountdownTimer } from '../components/CountdownTimer';

export const Route = createFileRoute('/invitation/$invitationId')({
  component: InvitationPage,
});

function InvitationPage() {
  const { invitationId } = useParams({ from: '/invitation/$invitationId' });
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<'confirmed' | 'declined' | null>(null);
  const [confirmedGuests, setConfirmedGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Datos de ejemplo - en una app real esto vendría de una API
  const invitationData = {
    id: invitationId,
    guestName: 'Ana García',
    totalGuests: 2,
    additionalGuests: ['Carlos García'],
    status: 'pending' as 'pending' | 'confirmed' | 'declined',
  };

  const handleRSVP = (status: 'confirmed' | 'declined') => {
    setRsvpStatus(status);
    setShowRSVPModal(true);
  };

  const handleSubmitRSVP = () => {
    setIsSubmitting(true);
    // Simular envío
    setTimeout(() => {
      setIsSubmitting(false);
      setShowRSVPModal(false);
      // Aquí iría la lógica para enviar la confirmación
      console.log('RSVP submitted:', {
        invitationId,
        status: rsvpStatus,
        confirmedGuests,
      });
    }, 2000);
  };

  const handleCancelRSVP = () => {
    setShowRSVPModal(false);
    setRsvpStatus(null);
    setConfirmedGuests(1);
  };

  return (
    <div className='landing-page'>
      <header className='hero-section'>
        <div className='hero-background'>
          <CouplePhoto />
        </div>
        <div className='hero-overlay'>
          <div className='hero-content'>
            <h1 className='main-title'>¡Nos Casamos!</h1>
            <div className='couple-info'>
              <h2 className='couple-names'>Luis & Rosa</h2>
              <p className='date'>25 de Octubre, 2025</p>
            </div>
            <CountdownTimer targetDate={new Date('2025-10-25T18:00:00')} />
          </div>
        </div>
      </header>

      <section className='love-story'>
        <div className='container'>
          <div className='story-content'>
            <p className='story-paragraph'>
              Dicen que cuando encuentras a tu persona, lo sabes. Nosotros lo
              supimos desde el primer momento: queríamos que cada día fuera
              juntos, que cada historia tuviera nuestros nombres entrelazados.
              Hoy damos ese paso hacia para siempre.
            </p>

            <p className='story-paragraph'>
              Con corazones llenos de gratitud y la bendición de Dios, invitamos
              a quienes amamos a ser testigos de nuestro sí. Porque el amor se
              celebra mejor cuando se comparte, y tu presencia hará de este día
              algo verdaderamente mágico.
            </p>

            <p className='story-paragraph'>
              Este 27 de julio no solo unimos nuestras vidas, unimos familias,
              historias y sueños. Vengan a celebrar con nosotros el comienzo de
              nuestra propia historia de amor.
            </p>
          </div>
        </div>
      </section>

      <section className='wedding-schedule'>
        <div className='container'>
          <h2 className='schedule-title'>Programa de la Boda</h2>
          <div className='schedule-card'>
            <div className='schedule-step'>
              <div className='step-number'>1</div>
              <div className='step-content'>
                <h3 className='step-name'>
                  <span className='step-name-text'>Boda</span>
                  <span className='step-icon'>⛪</span>
                </h3>
                <p className='step-time'>6:00 p.m.</p>
                <p className='step-description'>
                  Ceremonia civil donde Luis y Rosa unirán sus vidas para
                  siempre.
                </p>
              </div>
            </div>

            <div className='schedule-step'>
              <div className='step-number'>2</div>
              <div className='step-content'>
                <h3 className='step-name'>
                  <span className='step-name-text'>Recepción</span>
                  <span className='step-icon'>💌</span>
                </h3>
                <p className='step-time'>8:00 p.m.</p>
                <p className='step-description'>
                  Bienvenida a todos nuestros invitados con cocteles y
                  aperitivos.
                </p>
              </div>
            </div>

            <div className='schedule-step'>
              <div className='step-number'>3</div>
              <div className='step-content'>
                <h3 className='step-name'>
                  <span className='step-name-text'>Brindis</span>
                  <span className='step-icon'>🥂</span>
                </h3>
                <p className='step-time'>8:10 p.m.</p>
                <p className='step-description'>
                  Momentos de palabras y brindis especiales de nuestros seres
                  queridos.
                </p>
              </div>
            </div>

            <div className='schedule-step'>
              <div className='step-number'>4</div>
              <div className='step-content'>
                <h3 className='step-name'>
                  <span className='step-name-text'>Fotos</span>
                  <span className='step-icon'>📸</span>
                </h3>
                <p className='step-time'>8:20 p.m.</p>
                <p className='step-description'>
                  Sesión de fotos grupales y familiares para recordar por
                  siempre.
                </p>
              </div>
            </div>

            <div className='schedule-step'>
              <div className='step-number'>5</div>
              <div className='step-content'>
                <h3 className='step-name'>
                  <span className='step-name-text'>Cena</span>
                  <span className='step-icon'>🍽️</span>
                </h3>
                <p className='step-time'>9:30 p.m.</p>
                <p className='step-description'>
                  Cena elegante con menú especial preparado con amor.
                </p>
              </div>
            </div>

            <div className='schedule-step'>
              <div className='step-number'>6</div>
              <div className='step-content'>
                <h3 className='step-name'>
                  <span className='step-name-text'>Party</span>
                  <span className='step-icon'>🎵</span>
                </h3>
                <p className='step-time'>10:30 p.m.</p>
                <p className='step-description'>
                  ¡Es hora de bailar y celebrar! Música en vivo y DJ.
                </p>
              </div>
            </div>

            <div className='schedule-step'>
              <div className='step-number'>7</div>
              <div className='step-content'>
                <h3 className='step-name'>
                  <span className='step-name-text'>Pastel</span>
                  <span className='step-icon'>🎂</span>
                </h3>
                <p className='step-time'>1:15 a.m.</p>
                <p className='step-description'>
                  Corte del pastel de bodas y postres especiales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='location-section'>
        <div className='container'>
          <h2 className='location-title'>Ubicaciones</h2>
          <div className='locations-grid'>
            <div className='location-card'>
              <div className='location-header'>
                <div className='location-icon'>⛪</div>
                <h3 className='location-name'>Ceremonia</h3>
              </div>
              <div className='location-content'>
                <p className='location-venue'>Instituto María Auxiliadora</p>
                <p className='location-address'>
                  Tegucigalpa, Francisco Morazán, Honduras
                </p>
                <div className='map-container'>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5!2d-87.2167!3d14.0723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDA0JzIwLjMiTiA4N8KwMTMnMDAuMCJX!5e0!3m2!1ses!2shn!4v1234567890'
                    width='100%'
                    height='200'
                    style={{ border: 0 }}
                    allowFullScreen
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                    title='Ubicación de la Ceremonia'
                  ></iframe>
                </div>
                <a
                  href='https://maps.google.com/?q=Instituto+María+Auxiliadora+Tegucigalpa+Honduras'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='location-link'
                >
                  Ver en Google Maps
                </a>
              </div>
            </div>

            <div className='location-card'>
              <div className='location-header'>
                <div className='location-icon'>🏨</div>
                <h3 className='location-name'>Recepción</h3>
              </div>
              <div className='location-content'>
                <p className='location-venue'>Hotel Alameda</p>
                <p className='location-address'>
                  Tegucigalpa, Francisco Morazán, Honduras
                </p>
                <div className='map-container'>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5!2d-87.2167!3d14.0723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDA0JzIwLjMiTiA4N8KwMTMnMDAuMCJX!5e0!3m2!1ses!2shn!4v1234567890'
                    width='100%'
                    height='200'
                    style={{ border: 0 }}
                    allowFullScreen
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                    title='Ubicación de la Recepción'
                  ></iframe>
                </div>
                <a
                  href='https://maps.google.com/?q=Hotel+Alameda+Tegucigalpa+Honduras'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='location-link'
                >
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* RSVP Section */}
          <div className='rsvp-section'>
            <div className='rsvp-container'>
              <h3 className='rsvp-title'>Confirma tu Asistencia</h3>
              <p className='rsvp-subtitle'>
                Por favor, confirma si podrás acompañarnos en nuestra celebración
              </p>
              <div className='rsvp-buttons'>
                <button
                  className='rsvp-btn confirm'
                  onClick={() => handleRSVP('confirmed')}
                >
                  <span className='btn-icon'>✅</span>
                  <span className='btn-text'>¡Sí, asistiré!</span>
                </button>
                <button
                  className='rsvp-btn decline'
                  onClick={() => handleRSVP('declined')}
                >
                  <span className='btn-icon'>💔</span>
                  <span className='btn-text'>No puedo asistir</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className='footer'>
        <p>© 2025 Luis & Rosa - Nuestra Boda</p>
      </footer>

      {/* RSVP Modal */}
      {showRSVPModal && (
        <div className='rsvp-modal-overlay'>
          <div className='rsvp-modal'>
            <div className='rsvp-modal-header'>
              <h3 className='rsvp-modal-title'>
                {rsvpStatus === 'confirmed' ? '¡Confirmar Asistencia!' : 'Confirmar Ausencia'}
              </h3>
              <button 
                className='rsvp-modal-close'
                onClick={handleCancelRSVP}
              >
                ×
              </button>
            </div>

            <div className='rsvp-modal-content'>
              {rsvpStatus === 'confirmed' ? (
                <>
                  <p className='rsvp-modal-text'>
                    ¡Nos hace muy feliz que puedas acompañarnos!
                  </p>
                  
                  {invitationData.totalGuests > 1 && (
                    <div className='guests-confirmation'>
                      <label className='guests-label'>
                        ¿Cuántas personas asistirán?
                      </label>
                      <select
                        value={confirmedGuests}
                        onChange={(e) => setConfirmedGuests(Number(e.target.value))}
                        className='guests-select'
                      >
                        {Array.from({ length: invitationData.totalGuests }, (_, i) => i + 1).map(num => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'persona' : 'personas'}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </>
              ) : (
                <p className='rsvp-modal-text'>
                  Lamentamos que no puedas acompañarnos, pero agradecemos tu respuesta.
                </p>
              )}
            </div>

            <div className='rsvp-modal-footer'>
              <button 
                className='rsvp-modal-btn cancel'
                onClick={handleCancelRSVP}
              >
                Cancelar
              </button>
              <button 
                className={`rsvp-modal-btn confirm ${isSubmitting ? 'loading' : ''}`}
                onClick={handleSubmitRSVP}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
