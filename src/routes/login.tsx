import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className='login-page'>
      <div className='login-background'>
        <div className='login-overlay'></div>
      </div>

      <div className='login-container'>
        <div className='login-card'>
          <div className='login-header'>
            <div className='login-icon'>💍</div>
            <h2 className='login-title'>Acceso Administrativo</h2>
            <p className='login-subtitle'>Solo para Luis & Rosa</p>
          </div>

          <form onSubmit={handleSubmit} className='login-form'>
            <div className='form-group'>
              <div className='input-container'>
                <div className='input-icon'>📧</div>
                <input
                  type='email'
                  id='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder='Correo electrónico'
                  className='login-input'
                />
              </div>
            </div>

            <div className='form-group'>
              <div className='input-container'>
                <div className='input-icon'>🔒</div>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder='Contraseña'
                  className='login-input'
                />
              </div>
            </div>

            <button type='submit' className='login-button'>
              <span className='button-text'>Iniciar Sesión</span>
              <span className='button-icon'>→</span>
            </button>
          </form>

          <div className='back-link'>
            <a href='/' className='back-link-text'>
              <span className='back-icon'>←</span>
              Volver a la página principal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
