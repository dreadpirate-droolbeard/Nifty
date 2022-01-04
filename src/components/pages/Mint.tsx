import React from "react";
import background from "../../resources/images/BUBO/cemetery.jpg";
import { Footer } from "../composites/Footer";

import { MintForm } from "../forms/MintForm";

export function Background(): React.ReactElement {

  return(
    <div className="background-wrapper">
      <img
        className="background-img"
        id="background-img"
        alt="background-img"
        src={background}
      />
      <MintForm/>
      <Footer >
        <div className="empty-footer-div"/>
      </Footer>
    </div>
  )
}
