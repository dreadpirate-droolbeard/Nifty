import React from "react";

export function NoWalletDetected(): React.ReactElement {

  return (
    <div className="message-wrapper" role="alert">
      <div className="message-text no-wallet-detected" role="alert">
        {`No wallet detected. Install: \n`}
          <a
            href="http://metamask.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            MetaMask
          </a>
      </div>
    </div>
  );
}
