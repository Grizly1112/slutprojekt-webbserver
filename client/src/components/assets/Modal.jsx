// Källa: https://codesandbox.io/s/friendly-hofstadter-qtrtn?file=/src/index.js
import React, { useEffect, useRef, useState } from "react";
import Tooltip from "./Tooltip";

const Modal = ({ openState = false, tooltip, btnClass, activeClass, btnLabel, func, children }) => {
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
      setShowModal(false);
    }
  };

  const handleClick = () => {
    setShowModal(!showModal);
    if (func) {
      setTimeout(() => {
        func();
      }, 100);
    }
  };

  return (
    <div ref={modalRef}>
      <Tooltip label={tooltip}>
        <span onClick={handleClick} className={`${btnClass} ${showModal ? activeClass : ""}`}>
          {btnLabel}
        </span>
      </Tooltip>
      {showModal && children}
    </div>
  );
};


export default Modal;