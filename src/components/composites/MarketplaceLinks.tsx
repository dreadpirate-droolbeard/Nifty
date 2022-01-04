import React from "react";
import { PAINTSWAP_URL, PAINTSWAP_LOGO, NFTKEY_URL, NFTKEY_LOGO } from "../../common/constants";

export function MarketplaceLinks(): React.ReactElement {
  return (
    <div className="marketplace-wrapper">
      <div className="marketplace-label"> 
        Marketplace:
      </div>
      <div className="marketplace-links-wrapper">
        <a 
          className="paintswap-logo-anchor"
          rel="noopener noreferrer"
          target="_blank"
          href={PAINTSWAP_URL}
        >
          <img 
            className="paintswap-logo-img"
            src={PAINTSWAP_LOGO} 
            alt="Marketplace Logo"
          />
        </a>
        <a 
          className="nftkey-logo-anchor"
          rel="noopener noreferrer"
          target="_blank"
          href={NFTKEY_URL}
        >
          <img 
            className="nftkey-logo-img"
            src={NFTKEY_LOGO} 
            alt="Marketplace Logo"
          />
        </a>
      </div>
    </div>
  )
}