import React, {useContext} from "react";
import { DappContext } from "../../contexts/MintContext";
import { DismissableMessage } from "./DismissableMessage";
import { NoWalletDetected } from "./NoWalletMessage";
import { WalletConnected } from "./ConnectedMessage";
import { Messages, MINT_IN_PROGRESS, MINT_SUCCESS_MESSAGE } from "../../common/constants";

export function MessageSwitch(): React.ReactElement {
  const { errorMessage, messageStatus } = useContext(DappContext);

  switch( messageStatus ){
    case Messages.WalletMissing: {
      return <NoWalletDetected />
    } 
    case Messages.NetworkError:
    case Messages.TransactionError: {
      return <DismissableMessage message={errorMessage as string} />
    }
    case Messages.TransactionPending: {
      return <DismissableMessage message={MINT_IN_PROGRESS} />
    }
    case Messages.WalletDisconnected: {
      return (
        <div className="message-wrapper" role="alert">
          <div className="message-text"> Please connect wallet. </div>
        </div>
      )
    }
    case Messages.WalletConnected: {
      return <WalletConnected />
    }
    case Messages.TransactionSuccess: {
      return <DismissableMessage message={MINT_SUCCESS_MESSAGE} />
    }
    default: {
      return (
        <div className="message-wrapper" role="alert">
          <div className="message-text no-messages"></div>
        </div>
      )
    }
  }
}
