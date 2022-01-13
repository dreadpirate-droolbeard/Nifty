import React from "react";
import token from "../../resources/logos/NFTL.png";

export function Loading(): React.ReactElement {
  return (
    <div key={1} className="loader-container">
      <img
        src={token}
        className="loader"
        role="status"
      />
      <div className="loader-text">Degens INCOMINING...</div>
    </div>
  );
}