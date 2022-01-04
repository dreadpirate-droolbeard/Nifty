/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import token from "../../resources/images/BUBO/BLOOD.png";

export interface ActionButtonProps {
  disabled: boolean,
  onClick: () => void,
  image: any,
  title: string,
  label: string,
  price: number,
}

//TODO simplify this component... use the Label for ID and as part of passback of onClick function
export function ActionButton(props: ActionButtonProps): React.ReactElement {

  return (
    <div className="action-wrapper">
      <button 
        disabled={ props.disabled }
        title={ props.title }
        className="action-button"
        onClick={ props.onClick } 
      >
        <div className="action-image-wrapper"> 
          <img
            className="infect-img"
            id="infect-img"
            alt="infect-img"
            src={props.image}
          />
        </div>
        <div className="action-text-wrapper">
          <div className="action-text">{props.label}</div>
          <div className="price-wrapper">
            <img
              className="blood-token-img"
              id="blood-token-img"
              alt="blood-token-img"
              src={token}
            />
            <div className="price">
              {props.price}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
