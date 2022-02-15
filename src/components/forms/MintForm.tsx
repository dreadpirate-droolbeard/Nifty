import React from "react";
import { DappContext } from "../../contexts/MintContext";
import { 
  CRYPTO_CURRENCY_TICKER,
  MINT_FORM_TITLE,
  MINT_QUANTITY_HELPER_MESSAGE,
  MINT_QUANTITY_MIN,
  MINT_QUANTITY_MAX,
  CRYPTO_CURRENCY_SYMBOL
} from "../../common/constants";
import { randomDisappointment } from "../../common/functions";
import { FilterDropdown } from "../buttons/FilterDropdown";

export function MintForm(): React.ReactElement {
  const { 
    totalMinted,
    maxSupply,
    setMintQuantity,
    setMintSubmit
  } = React.useContext(DappContext);

  function onSubmit(isFreeClaim: boolean, event: React.FormEvent): void {
    event.preventDefault();
    setMintSubmit(true, isFreeClaim);
  }

  function onCancel(): void {
    randomDisappointment();
    setMintQuantity(0);
    setMintSubmit(false, false);
  }

  return(
    <form 
      className="modal overlay mint-form"
      onSubmit= {(e): void => onSubmit(false, e)}
    >
      <div className="title">
        {MINT_FORM_TITLE}
      </div>
    
      <div className="row">
      </div>
      <div className="row">
        <div className="mint-count">
          {totalMinted} minted / {maxSupply} total supply
        </div>
      </div>
      <div className="row">
        <div className="buttons-wrapper">
          <button
            className={"cancel"}
            type="button"
            onClick={ onCancel }
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}