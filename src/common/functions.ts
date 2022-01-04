
import aww from "../resources/audio/trickortreat_aww_single.mp3";
import awwMan from "../resources/audio/trickortreat_awwman.mp3";
// import wheresMyCandy from "../resources/audio/trickortreat_heywheresmycandy.mp3";

export function soundTrigger(audioFile: string): Promise<void> {
  const audioObject = new Audio();
  const sourceObject = document.createElement("source");
  sourceObject.type = "audio/mpeg";
  sourceObject.src = audioFile;
  audioObject.appendChild(sourceObject);
  audioObject.volume = 0.5;
  return audioObject.play();
}

export function randNumber(max: number): number {
  const min = 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomDisappointment(): void {
  switch(randNumber(2)) {
    case 1: soundTrigger(aww); break;
    case 2: soundTrigger(awwMan); break;
    // case 3: soundTrigger(wheresMyCandy); break;
    default: break;
  }
}