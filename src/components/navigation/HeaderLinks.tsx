
import React from "react";
import { NavLink } from "react-router-dom";
import { urlBase } from "../../common/configs";

export function HeaderLinks({onClick}: {onClick?: () => void }): React.ReactElement {
  return(
    <div className="header-links"  onClick={ onClick ? onClick : ():void => {/*noOp*/} }>
      <a href={urlBase.toString()} className="header-link-button">
        Home
      </a>
      <NavLink onClick={ onClick } to={`/mint`} className="header-link-button">
        Mint
      </NavLink>
      <NavLink onClick={ onClick } to={`/wallet`} className="header-link-button">
        Wallet
      </NavLink>
      <NavLink onClick={ onClick } to={`/team`} className="header-link-button">
        Team
      </NavLink>
    </div>
    )
}