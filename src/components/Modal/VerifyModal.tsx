import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface VerifyModalProps {
  title: string;
  label?: string;
  show: boolean;
  onDeleteClick: () => void;
  onCancelClick: () => void;
}

const VerifyModal: FC<VerifyModalProps> = ({
  show,
  title,
  label,
  onDeleteClick,
  onCancelClick,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? ReactDOM.createPortal(
        <div className={"modal " + (show && "is-active")}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{title}</p>
            </header>

            <section className="modal-card-body">{label}</section>

            <footer className="modal-card-foot">
              <button className="button is-danger" onClick={onDeleteClick}>
                Poista
              </button>
              <button className="button" onClick={onCancelClick}>
                Peruuta
              </button>
            </footer>
          </div>
        </div>,
        window.document.querySelector("body") as any,
      )
    : null;
};

export default VerifyModal;
