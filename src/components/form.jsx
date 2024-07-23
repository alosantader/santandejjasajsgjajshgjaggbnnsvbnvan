import React from 'react';
import '../css/form.css';
import backgroundImg from '../img/fondopri.jpg'; // Asegúrate de que la ruta sea correcta
import logo from '../img/logo2.jpg'; // Asegúrate de tener el logo y la ruta correcta
import personImg from '../img/persona.png'; // Asegúrate de tener la imagen de la persona y la ruta correcta

const Form = () => {
  console.log(backgroundImg); // Agrega esto para verificar la ruta

  return (
    <div className="container">
      <div className="background">
        <img src="https://travelgrafia.co/wp-content/uploads/2023/08/Tour-Chichen-Itza-desde-Cancun.jpg" alt="Background" className="background-img" />
      </div>
      <div className="content">
        <img src={logo} alt="Logo" className="logo" />
        &nbsp;
        <h1 className="title">Bienvenido a SanTander</h1>
        &nbsp;
        &nbsp;
        <div className="form-group">
          <input type="text" placeholder="Nombres y Apellidos" className="input" />
          <div className="phone-input-container">
            <span className="country-code">+52</span>
            <input  type="tel" placeholder="Número de celular" className="input phone-input" maxLength={10} />
          </div>
        </div>
        <button className="btn">Iniciar</button>
        <p className="register">¿Eres nuevo? <a href="/register">Regístrate aquí</a></p>
      </div>
      <div className="banner">
        <div className="banner-text">
          Siempre innovando para ti, descubre lo nuevo de SuperMóvil.
        </div>
        <img src={personImg} alt="Person" className="person-img" />
      </div>
    </div>
  );
};

export default Form;
