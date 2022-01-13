import React, {useContext, useState} from "react";
// import { DappContext } from "../../contexts/MintContext";
import { eSortOptions } from "../../common/types";
import { DappContext } from "../../contexts/MintContext";

export function SortDropdown(): React.ReactElement {
  const { setSortSelection } = useContext(DappContext);

  function updateSelection(evt: React.ChangeEvent<HTMLSelectElement>): void {
    setSortSelection(evt.currentTarget.value as eSortOptions)
  }

  return (
    <div className="sort-dropdown-wrapper">
      <select 
        name="sort-dropdown"
        defaultValue={eSortOptions.TOKENID_L2H}
        onChange={(evt):void => { updateSelection(evt) } 
      }
      >
        <option value={eSortOptions.TOKENID_L2H}>{eSortOptions.TOKENID_L2H}</option>
        <option value={eSortOptions.TOKENID_H2L}>{eSortOptions.TOKENID_H2L}</option>
        <option value={eSortOptions.ACCUMULATED_H2L}>{eSortOptions.ACCUMULATED_H2L}</option>
      </select>
    </div>
  );
}
