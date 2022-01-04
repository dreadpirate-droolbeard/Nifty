import React from "react";
import ReactModal from "react-modal";

export interface ModalProps {
  displayModal: boolean;
}

export function ModalWrapper(props: React.PropsWithChildren<ModalProps>): React.ReactElement {

  return(
    <ReactModal 
      isOpen={props.displayModal} 
      ariaHideApp={false}
      className="modal"
      overlayClassName="overlay"
    >
      {props.children}
    </ReactModal>
  )
}