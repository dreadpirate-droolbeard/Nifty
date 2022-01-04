import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

export function Socials(): React.ReactElement {
  return(
    <div className="social-media-links">
      <a 
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/twistedtechnfts"
      >
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://discord.gg/fY7QE43VYM"
      >
        <FontAwesomeIcon icon={faDiscord} />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.gocomics.com/liz-climo-cartoons/2018/09/28"
      >
        <FontAwesomeIcon icon={faFacebook} />
      </a>
    </div>
  )
}