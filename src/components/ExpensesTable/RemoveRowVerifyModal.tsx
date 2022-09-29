import { Entry } from "../../common/types";
import React, { FC, useEffect, useState } from "react";
import { DateTime } from "luxon";
import ReactDOM from "react-dom";

interface RemoveRowVerifyModalProps {
  itemToRemove?: Entry;
  show: boolean;
  deleteEntry: (id: string) => void;
  cancel: () => void;
}

const RemoveRowVerifyModal: FC<RemoveRowVerifyModalProps> = (props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const { itemToRemove } = props;
  const dateTime =
    itemToRemove?.date && DateTime.fromJSDate(itemToRemove.date).toLocal();
  const label = `${dateTime && dateTime.toLocaleString()} | ${
    itemToRemove?.transceiver
  } | ${itemToRemove?.amount && itemToRemove.amount.toFixed(2)}€`;

  return mounted
    ? ReactDOM.createPortal(
        <div className={"modal " + (props.show && "is-active")}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">
                Haluatko varmasti poistaa rivin?
              </p>
            </header>

            <section className="modal-card-body">{label}</section>

            <footer className="modal-card-foot">
              <button
                className="button is-danger"
                onClick={() => {
                  props.itemToRemove?.id &&
                    props.deleteEntry(props.itemToRemove.id);
                }}
              >
                Poista
              </button>
              <button className="button" onClick={props.cancel}>
                Peruuta
              </button>
            </footer>
          </div>
        </div>,
        window.document.querySelector("body") as any,
      )
    : null;
};

export default RemoveRowVerifyModal;
