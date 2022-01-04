import React from "react";
import { SMALL_SCREEN_VARIABLE_NAME } from "../../common/constants";
import { DappContext } from "../../contexts/MintContext";

// TODO: Make this a "logout" button
export function ConnectedWallet({address}: {address: string}): React.ReactElement | null {
  const smallScreen = getComputedStyle(document.documentElement).getPropertyValue(SMALL_SCREEN_VARIABLE_NAME);
  const { disconnectWallet } = React.useContext(DappContext);
  const disconnectText = window.matchMedia(`(max-width: ${smallScreen})`).matches ? "Disconnect Wallet" : "Disconnect";

  if(!address) {
    // an issue with function components re-rendering before setState is complete,
    // by the time this component gets called, the "address" might be undefined
    return null;
  }
  
  return (
    <div className="disconnect-wallet-button-wrapper">
      <button
        className="connected-wallet-button"
        type="button"
        title={address}
        onClick={ disconnectWallet }
        >
        {disconnectText}
      </button>
    </div>
  );
}
