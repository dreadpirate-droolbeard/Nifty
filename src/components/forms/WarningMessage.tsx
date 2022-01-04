import React from "react";
import { DappContext } from "../../contexts/MintContext";
import { MINT_IN_PROGRESS } from '../../common/constants';
import { ModalWrapper } from "../wrappers/ModalWrapper";

export function WarningMessage(): React.ReactElement {
  const { warningMessage, setWarningMessage } = React.useContext(DappContext);

  function onOk(): void {
    setWarningMessage(undefined);
  }

  return(
    <ModalWrapper displayModal={warningMessage !== undefined && warningMessage !== MINT_IN_PROGRESS}>
      <form className="warning-form">
        <div className="title">
          Beware:
        </div>
        <div>
          {warningMessage}
        </div>
        <div className="buttons-wrapper">
          <button
            className={"ok"}
            onClick={ onOk }
            >
            Ok
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}