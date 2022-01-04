import React from "react";
import { DappContext } from "../../contexts/MintContext";

export function DismissableMessage(message:{message: string}): React.ReactElement {
  const { dismissMessage } = React.useContext(DappContext);

  return (

    <div className="message-wrapper" role="alert">
      <div className="message-text" role="alert">
        {message.message}
      </div>
      <button
        type="button"
        className="close-button"
        data-dismiss="alert"
        aria-label="Close"
        onClick={dismissMessage}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
