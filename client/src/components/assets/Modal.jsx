import React, { useEffect, useRef, useState } from "react";
import Tooltip from "./Tooltip";
import { FaMinusCircle } from "react-icons/fa";

const Modal = ({ openState = false, tooltip, btnClass, modalClass, activeClass, btnLabel, func, buttonClose, children }) => {
  const [showModal, setShowModal] = useState(openState);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("keydown", handleEscKey, false);
      document.addEventListener("click", handleOutsideClick, false);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey, false);
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, [showModal]);

  const handleOutsideClick = (event) => {
    if (!modalRef.current.contains(event.target)) {
      // Do nothing if the modal is already closed
      if (showModal) {
        setShowModal(false);
      }
    }
  };

  const handleClick = () => {
    setShowModal(!showModal);
    if (func) {
      setTimeout(() => {
        func();
      }, 200);
    }
  };

  return (
    <div ref={modalRef}>
      <Tooltip label={tooltip}>
        <span onClick={handleClick} className={`${btnClass} ${showModal ? activeClass : ""}`}>
          {btnLabel}
        </span>
      </Tooltip>
      {showModal && (
        buttonClose ? 
        (
          <div className={"modal " + modalClass}>
            <div className='modal-close' onClick={() => setShowModal(false)}>
              <FaMinusCircle />
              <h6>ESC</h6>
            </div>
            {children}
          </div>
        )
        :
          <div className={"modal " + modalClass}>
            {children}
          </div>
        )
      }
    </div>
  );
};

export default Modal;