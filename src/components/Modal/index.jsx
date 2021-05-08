import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

const Modal = ({ showModal, handleCloseModal, children }) => {
  if (!showModal) return null;

  return ReactDOM.createPortal(
    <div className="modal-outer-container">
      <div className="modal-inner-container">
        <span class="material-icons close-icon" onClick={handleCloseModal}>
          close
        </span>
        {children}
      </div>
    </div>,
    document.getElementById("root")
  );
};

export default Modal;
