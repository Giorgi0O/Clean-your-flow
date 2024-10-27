import React from "react";

function Modal ({ id, onClose, children }) {

    return (
        <dialog id={id} className="modal">
            <div className="modal-box w-screen">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                {children}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    )
}

export default Modal;