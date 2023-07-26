import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const overlayClass = isOpen ? 'fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50' : 'hidden';
  const modalClass = isOpen ? 'modal-container' : 'hidden';

  return (
    <>
    
    <div  className={overlayClass}>
      <div className={modalClass}>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-[40px]" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
  
      </div>
    </div>
    </>
  );
};
export default Modal