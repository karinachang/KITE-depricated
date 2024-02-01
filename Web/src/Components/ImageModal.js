import React from "react";
import "../CSS/ImageModal.css";

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <img src={imageUrl} alt="Zoomed In" className="modal-image" />
        <button onClick={onClose} className="close-button">
          X
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
