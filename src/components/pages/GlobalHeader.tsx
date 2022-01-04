import React from "react";
import { 
  // headerIcon,
  SMALL_SCREEN_VARIABLE_NAME } from "../../common/constants";
import MusicHook from "../wrappers/Music";
import { ConnectWallet } from "../buttons/ConnectWallet";
import { MessageSwitch } from "../messages/MessageSwitch";
import { HeaderLinks } from "../navigation/HeaderLinks";
import Menu from "../navigation/Menu";

export function GlobalHeader(): React.ReactElement {
  const smallScreen = getComputedStyle(document.documentElement).getPropertyValue(SMALL_SCREEN_VARIABLE_NAME);

  if(window.matchMedia(`(max-width: ${smallScreen})`).matches) {
    return (
      <div className="global-header">
        <div className="header left"> 
          <Menu />
        </div>
        <div className="header right">     
          <div className="dapp-information">
            <MessageSwitch />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="global-header">
        <div className="header left"> 
          <HeaderLinks />
        </div>
        <div className="header center">
          <div className="header-thumbnail">
            {/* <img 
              className={"header-thumbnail-gif"}
              src={headerIcon}
              alt={"Header Icon"} 
            /> */}
          </div>
        </div>
        <div className="header right">     
          <div className="dapp-information">
            <MessageSwitch />
          </div>
          <div className="wallet-button-wrapper">
            <ConnectWallet />
          </div>
          <MusicHook />
        </div>
      </div>
    )
  }
}