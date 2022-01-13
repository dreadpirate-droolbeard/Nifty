import React, {useContext} from "react";
// import { DappContext } from "../../contexts/MintContext";
import { eSortOptions } from "../../common/types";
import { DappContext } from "../../contexts/MintContext";
import { TokenInteractionContext } from "../../contexts/TokenInteractionContext";

export function SortDropdown(): React.ReactElement {
  const { setSortSelection } = useContext(DappContext);
  const { min: [minValue, setMinValue], max: [maxValue, setMaxValue] } = useContext(TokenInteractionContext);

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
      <label htmlFor="sort-min">Min:</label>
      <input
        className="sort-min"
        id="sort-min"
        type="number"
        min={0}
        value={minValue}
        onChange={(evt):void => setMinValue(evt.currentTarget.valueAsNumber)}
      />
      <label htmlFor="sort-max">Max:</label>
      <input
        className="sort-max"
        id="sort-max"
        type="number"
        min={0}
        value={maxValue}
        onChange={(evt):void => setMaxValue(evt.currentTarget.valueAsNumber)}
      />
    </div>
  );
}
