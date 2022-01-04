import React from "react";
import { ApproveToken } from "../buttons/ApproveToken";
import { ClaimToken } from "../buttons/ClaimToken";
import { SMALL_SCREEN_VARIABLE_NAME } from "../../common/constants";
import { AllowanceBalance } from "../messages/AllowanceBalance";

export function TokenInteractions(): React.ReactElement {

function renderButtons(): React.ReactElement {
  const smallScreen = getComputedStyle(document.documentElement).getPropertyValue(SMALL_SCREEN_VARIABLE_NAME);

  if(window.matchMedia(`(max-width: ${smallScreen})`).matches) {
    return <></>
  } else{
    return(
      <>
        <ApproveToken />
        <ClaimToken />
      </>
    )
  }
}

return(
  <>
    <div className="plague-pit-status-wrapper">
      </div>
    <div className="token-interaction-wrapper">
      <AllowanceBalance />
      {renderButtons()}
    </div>
  </>
  )
}