import React from "react";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`} role="dialog">
      <div
        className="modal-overlay fixed  bg-black bg-opacity-50" // add inset-0 ; closes by bg
        onClick={() => setModalOpen(false)}
      ></div>

      <div
        className={`modal-box bg-white rounded-lg p-6 transform transition-transform ${
          modalOpen ? "scale-100" : "scale-0"
        }`}
      >
        <p className="py-4">{children}</p>
        <div className="modal-action">
          <button onClick={() => setModalOpen(false)} className="btn">
            Close!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
