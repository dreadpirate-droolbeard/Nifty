import React from "react";
import GITBOOK_LOGO from "../../resources/logos/gitbook.svg";

export function Footer(props: React.PropsWithChildren<unknown>): React.ReactElement {

return(
  <div className="footer" >
    <div className="company">
      PaulygonProgramming
    </div>
    <div className="documentation">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href=""
        >
          <img 
            className="gitbook-logo-img"
            src={GITBOOK_LOGO} 
            alt="Gitbook Logo"
          />
        </a>
      </div>
      {props.children}
    </div>
  )
}