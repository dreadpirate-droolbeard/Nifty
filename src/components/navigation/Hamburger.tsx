import React from "react";

export type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Hamburger = (props: Props): React.ReactElement => (
  <button
    className={`hamburger ${props.open ? "open" : "closed"}`}
    onClick={():void => props.setOpen(!props.open)}
  >
    <div />
    <div />
    <div />
  </button>
);

export default Hamburger;
