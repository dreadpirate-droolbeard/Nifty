import React from "react";
import { DappContext } from "../../contexts/MintContext";
import token from "../../resources/logos/NFTL.png";

export function AllowanceBalance(): React.ReactElement {
  const { allowance } = React.useContext(DappContext);

  return (
    <div className="token-approved-balance-wrapper">
    <div className="token-approved-balance" title="Values may be delayed until transactions complete.">
      Allowance: {allowance}
    </div>
    <img
      className="blood-token-img"
      id="blood-token-img"
      alt="blood-token-img"
      src={token}
    />
  </div>
  );
}
