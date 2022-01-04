import React from "react";
import { iMate, Teammate } from "../composites/Teammate";

import DreadPirateDB from "../../resources/images/Team/Dread_Pirate_Drool_Beard.png";
import { Footer } from "../composites/Footer";


const dreadPirateDB: iMate = { 
  image: DreadPirateDB, 
  title: <div className="title-wrapper"><div className="title-super">The Dread Pirate</div><div>Drool Beard</div></div>, 
  // title: "Dread Pirate Drool Beard", 
  twitter: "DreadPirateDB",
  description: "React Dev \n& Content Creator"
};

export class Team extends React.Component {
  
  render(): React.ReactElement {
    return(
      <div className="team-page">
        <div className="members">
          <div className="main">
            <Teammate mate={dreadPirateDB} />
          </div>
        </div>
        <Footer>
          <div className="empty-footer-div"/>
        </Footer>
      </div>
    )
  }
}