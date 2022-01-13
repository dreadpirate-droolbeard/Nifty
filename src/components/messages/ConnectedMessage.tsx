import React from "react";
import { pathDegen } from "../../common/configs";
import { CRYPTO_CURRENCY_SYMBOL } from "../../common/constants";
import token from "../../resources/logos/NFTL.png";
import { DappContext } from "../../contexts/MintContext";
import { TokenDataContext } from "../../contexts/SecondDappContext";
import { tokenNames } from "../../contexts/types";

export function WalletConnected(): React.ReactElement {
  const { userAddress, userBalance } = React.useContext(DappContext);
  const { tokenBalances } = React.useContext(TokenDataContext);
  const truncatedAddress = `${userAddress?.substring(0,3)}...${userAddress?.substring(userAddress.length-3)}`;
  
  const isBuboWallet =  document.URL.includes(`${pathDegen}/wallet`);
  
  const balanceNFTL =  tokenBalances?.find(o => o.token === tokenNames.NFTL)?.balance ?? 0; 
  
  const roundedBalance = isBuboWallet ? Math.round(balanceNFTL / 1000000000000000000 ): Math.round(userBalance *100)/100;
  // const tokenSymbol = isBuboWallet ? token : CRYPTO_CURRENCY_SYMBOL;

  return (
    <div className="message-wrapper">
      <div className="message-text"> 
        {`${truncatedAddress} | ${roundedBalance}`}
      </div>
      <img 
        className={"crypto-symbol"}
        src= {token}
        alt={"crypto-symbol"}
      />
    </div>
  );
}
