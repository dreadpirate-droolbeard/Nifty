import React from "react";
import { ApproveToken } from "../buttons/ApproveToken";
import { ClaimToken } from "../buttons/ClaimToken";
import { SMALL_SCREEN_VARIABLE_NAME } from "../../common/constants";
import { AllowanceBalance } from "../messages/AllowanceBalance";
import { FilterDropdown } from "../buttons/FilterDropdown";
import { SortDropdown } from "../buttons/SortDropdown";

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
    <div className="search-inputs-wrapper">
      <FilterDropdown />
      <SortDropdown />
    </div>
    <div className="token-interaction-wrapper">
      <AllowanceBalance />
      {renderButtons()}
    </div>
  </>
  )
}