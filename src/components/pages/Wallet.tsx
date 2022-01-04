import React from "react";
import { DappContext } from "../../contexts/MintContext";
import { Degens } from "../composites/Degens";
import { TokenInteractions } from "../composites/TokenInteractions";
import { Footer } from "../composites/Footer";


export function Wallet(): React.ReactElement {
  const { userAddress } = React.useContext(DappContext);
  const isConnected = userAddress !== undefined;
  
  function renderWalletContainer(): React.ReactElement {

    // if( isConnected ) {
      return <Degens />
    // }
    
    // return <DisconnectedWallet />
  }

  return(
    <div className="wallet-container">
      <div className="token-interaction-container">
        {isConnected && <TokenInteractions /> }
      </div>
      {/* <img
        className="wallet-background"
        id="wallet-background"
        alt="wallet-background"
        src={red_background}
      /> */}
      <div className="wallet-inner-container">
        {renderWalletContainer()}
      </div>
      <Footer>
        <div className="empty-footer-div"/>
      </Footer>
    </div>
  )
}
