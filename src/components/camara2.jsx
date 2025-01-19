import React, { useState, useEffect, useRef } from 'react';
import '../css/camara.css';
import { useNavigate } from 'react-router-dom';
import { supabase } from './firebase'; // Supabase inicializado en firebase.js

const CameraComponent = () => {
  const [stream, setStream] = useState(null);
  const [photoSrc, setPhotoSrc] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(true); // Mostrar el primer modal al inicio
  const [imageBlob, setImageBlob] = useState(null); // Almacenar el blob de la imagen
  const [hasTakenPhoto, setHasTakenPhoto] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const constraints = { video: { facingMode: 'environment' }, audio: false };
        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      } catch (error) {
        console.error('Error al acceder a la cámara:', error);
      }
    };

    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const takePhoto = async () => {
    if (!hasTakenPhoto && stream) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'));
      const photoURL = URL.createObjectURL(photoBlob);

      setPhotoSrc(photoURL);
      setShowModal(true);
      setImageBlob(photoBlob); // Almacenar el blob de la imagen
      setHasTakenPhoto(true);
    }
  };

  const acceptPhoto = async () => {
    if (imageBlob) {
      try {
        const fileName = `photo-${Date.now()}.jpg`;
        const { data, error } = await supabase.storage
          .from('imgtarget') // Nombre del bucket en Supabase
          .upload(fileName, imageBlob, {
            contentType: 'image/jpeg',
          });

        if (error) {
          console.error('Error al subir la imagen:', error.message);
          alert('Error al guardar la imagen.');
        } else {
          console.log('Imagen subida correctamente:', data.path);
          alert('Imagen Guardada, Continuemos');
          navigate('/primerapag'); // Redirigir después de completar el proceso
        }
      } catch (error) {
        console.error('Error inesperado al guardar la imagen:', error);
        alert('Ocurrió un error al guardar la imagen.');
      }
    }

    setShowModal(false);
  };

  const cancelPhoto = () => {
    setShowModal(false);
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div className="camera-container">
      <h1>ENFOQUE LA PARTE TRASERA DE SU PLÁSTICO</h1>

      {showStartModal && (
        <div className="modal-background">
          <div className="modal-content">
            <img
              src={require('../targetback.jpg')} // Reemplazar por la ruta correcta
              alt="Tarjeta-back"
              className="modal-image"
            />
            <p className="modal-text">Fotografíe la parte trasera de su plástico</p>
            <button className="modal-close-button" onClick={() => setShowStartModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-background">
          <div className="modal-content">
            <img id="photo-preview" src={photoSrc} alt="Foto tomada" className="photo-preview" />
            <div className="buttons-container">
              <button className="button accept-button" onClick={acceptPhoto}>
                Aceptar
              </button>
              <button className="button cancel-button" onClick={cancelPhoto}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <video ref={videoRef} autoPlay playsInline className="video" />
      <button className="button take-photo-button" onClick={takePhoto}>
        TOMAR
      </button>
    </div>
  );
};

export default CameraComponent;
