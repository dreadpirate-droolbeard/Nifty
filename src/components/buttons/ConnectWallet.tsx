import React from "react";
import { DappContext } from "../../contexts/MintContext";
import { ConnectedWallet} from "./ConnectedWallet";
import { Messages, METAMASK_MISSING_MESSAGE, SMALL_SCREEN_VARIABLE_NAME } from "../../common/constants";

export function ConnectWallet(): React.ReactElement {
  const smallScreen = getComputedStyle(document.documentElement).getPropertyValue(SMALL_SCREEN_VARIABLE_NAME);
  const { messageStatus, connectWallet, userAddress, setWarningMessage } = React.useContext(DappContext);
  const isAddressDefined = userAddress !== undefined;
  const disableConnectButton = messageStatus === Messages.WalletMissing;
  const connectText = window.matchMedia(`(max-width: ${smallScreen})`).matches ? "Connect Wallet" : "Connect";

  function connectDisabledClick(): void {
    setWarningMessage("Install Metamask please.");
  }

  if(isAddressDefined){
    return(
      <ConnectedWallet address={userAddress}/>
    )
  }

  return (
    <div className="connect-wallet-button-wrapper"   
      title={ disableConnectButton ? METAMASK_MISSING_MESSAGE : "" } 
      onClick={ disableConnectButton ? connectDisabledClick : (): void => {/*noOp*/} }
    >
      <button
        disabled={ disableConnectButton }
        className="connect-wallet-button"
        type="button"
        onClick={connectWallet}
      >
        {connectText}
      </button>
    </div>
  );
}
