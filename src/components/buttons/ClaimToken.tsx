import React, { useContext, useEffect, useState } from "react";
import { DappContext } from "../../contexts/MintContext";
import { TokenDataContext } from "../../contexts/SecondDappContext";
import token from "../../resources/logos/NFTL.png";

export function ClaimToken(): React.ReactElement {
  const [ tokenIds, setTokenIds ] = useState<number[]>([]);
  const [ accumulated, setAccumulated ] = useState<number>(0);
  const { unclaimed, claimToken } = useContext(DappContext);
  const { tokenURIs } = useContext(TokenDataContext);

  useEffect( () => {
    if( tokenURIs !== undefined && tokenURIs.length > 0) {
      getUnclaimed();
      setTokenIds(tokenURIs.map( token => token.tokenId));
    } else {
      setTokenIds([])
    }
  }, [tokenURIs])


  async function getUnclaimed(): Promise<void> {
    const unclaimedTokens = Math.round(await unclaimed(tokenIds)*100)/100;    
    setAccumulated(unclaimedTokens);
  }

  function claim(): void {
    claimToken(tokenIds);
  }

  return (
    <div className="claim-token-wrapper">
      <div className="claim-token-message"> Unclaimed: {accumulated} </div>
      <img
        className="token-img"
        id="token-img"
        alt="token-img"
        src={token}
      />
      <button
        disabled={ tokenIds !== undefined && tokenIds.length <= 0 }
        className="claim-token-button"
        type="button"
        onClick={claim}
      >
          Claim
      </button>
  </div>
  );
}
