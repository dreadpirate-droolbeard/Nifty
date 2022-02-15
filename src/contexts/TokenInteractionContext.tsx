import React, { ReactElement, useState } from "react";
import { DegenBackgrounds } from "../common/constants";
import { eSortOptions } from "../common/types";
// import { createGenericContext } from "./GenericContext";

interface iFilterData {
  filter: [DegenBackgrounds | undefined, React.Dispatch<React.SetStateAction<DegenBackgrounds | undefined>>]
  sort: [eSortOptions | undefined, React.Dispatch<React.SetStateAction<eSortOptions | undefined>>];
  min: [number | undefined, React.Dispatch<React.SetStateAction<number | undefined>>];
  max: [number | undefined, React.Dispatch<React.SetStateAction<number | undefined>>];
}

// export const TokenInteractionContext = React.createContext< iFilterData | undefined>(undefined);
export const TokenInteractionContext = React.createContext<iFilterData>(undefined!);

export const TokenInteractionContextProvider = (props: React.PropsWithChildren<unknown>): ReactElement => {
  const [ filterSelection, setFilterSelection ] = useState<DegenBackgrounds | undefined>();
  const [ sortSelection, setSortSelection ] = useState<eSortOptions | undefined>();
  const [ minValue, setMinValue ] = useState<number>();
  const [ maxValue, setMaxValue ] = useState<number>();

  const dataStore: iFilterData = {
    filter: [ filterSelection, setFilterSelection ],
    sort: [ sortSelection, setSortSelection ],
    min: [ minValue, setMinValue ],
    max: [ maxValue, setMaxValue ],
  }

  return <TokenInteractionContext.Provider value={dataStore}>{props.children}</TokenInteractionContext.Provider>
}