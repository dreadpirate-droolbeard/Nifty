import React, {useContext, useState} from "react";
// import { DappContext } from "../../contexts/MintContext";
import { DegenBackgrounds } from "../../common/constants";
import { DappContext } from "../../contexts/MintContext";

export function enumKeys<O extends Record<string, unknown>, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
}

// interface iFilterProps {
//   setSelected: (selection: string[]) => void;
// }

// export function FilterDropdown(props: iFilterProps): React.ReactElement {
export function FilterDropdown(): React.ReactElement {
  const { setFilterSelection } = useContext(DappContext);

  function updateSelection(evt: React.ChangeEvent<HTMLSelectElement>): void {
    const values = Array.from(evt.currentTarget.selectedOptions).map( el => el.value as DegenBackgrounds);
    setFilterSelection(values)
  }

  return (
    <div className="filter-dropdown-wrapper">
      <select 
        name="filter-dropdown"
        // defaultValue={"Select Option"}
        multiple
        onChange={(evt):void => { updateSelection(evt) } 
      }
      >
        {/* <option value="" disabled  hidden>Select Option</option> */}
        {
          enumKeys(DegenBackgrounds).map(key => {
            return (
              <option
                key={key}
                value={key}
              >
                {DegenBackgrounds[key]}
              </option>
            )
          })
        }
      </select>
    </div>
  );
}
