import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export interface iMate {
  image: string;
  title: string | JSX.Element; 
  twitter: string;
  description: string; 
}

export function Teammate({mate}: {mate: iMate}): React.ReactElement {
  return (
    <div className="teammate"> 
      <div className="title">
        {mate.title}
      </div>
      <div className="twitter">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://twitter.com/${mate.twitter}`}
      >
        <FontAwesomeIcon icon={faTwitter} />
        {mate.twitter}
        </a>
      </div>
      <img 
        className={"image"}
        src= {mate.image}
        alt={mate.image.toString()}
      />
      <div className="description">
        {mate.description}
      </div>
    </div>
  );
}
