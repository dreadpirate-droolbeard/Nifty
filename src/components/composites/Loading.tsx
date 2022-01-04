import React from "react";

export function Loading(): React.ReactElement {
  return (
    <div key={1} className="loader-container">
      <div className="loader" role="status"/>
      <div className="loader-text">Loading Your Bubos...</div>
    </div>
  );
}