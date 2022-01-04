import React from "react";
import { soundTrigger } from "../../common/functions";

export interface iInteractiveAudio{
  className: string;
  audio: string;
}

export function MouseOverAudio({className, audio}: iInteractiveAudio ): React.ReactElement {

  function triggerAudio(): void {
    soundTrigger(audio);
  }

  return (
    <div 
      className={ `${className} mouse-over-audio` }
      onMouseOver={ triggerAudio }
    />
  );
}
