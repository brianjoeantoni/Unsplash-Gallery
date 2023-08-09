import React from "react";

const Modal = ({ isOpen, onClose, imageUrl, altText }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black bg-opacity-75">
      <div className="max-w-3xl mx-auto p-14 bg-white rounded-lg shadow-lg relative">
        <button
          className="absolute bg-blue-600 text-white px-2 py-1 rounded-lg top-3 right-3"
          onClick={onClose}
        >
          Close
        </button>
        <img src={imageUrl} alt={altText} className="w-full max-h-[35rem]" />
      </div>
    </div>
  );
};

export default Modal;
