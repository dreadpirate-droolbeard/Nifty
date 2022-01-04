
import React from "react";
import antidote from "../../resources/images/BUBO/antidote.png";
import infect from "../../resources/images/BUBO/needle.png";

export function DisconnectedWallet(): React.ReactElement {

  return (
    <div className="wallet-disconnected-container"> 
      <div className="wallet-disconnected-message">
        Connect your wallet to fight in the Plague Pits
      </div>
      <div className="images">
        <img
          className="needle-gif"
          id="needle-gif"
          alt="needle-gif"
          src={infect}
        />
        <img
          className="potion-gif"
          id="potion-gif"
          alt="potion-gif"
          src={antidote}
        />
        <img
          className="needle-gif"
          id="needle-gif"
          alt="needle-gif"
          src={infect}
        />
      </div>
  </div>
  )
}