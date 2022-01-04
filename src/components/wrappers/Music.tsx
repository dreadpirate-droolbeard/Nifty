import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef } from 'react';
import { music } from "../../common/constants";
import { DappContext } from '../../contexts/MintContext';

function MusicHook(): React.ReactElement {
  const audioRef = useRef(new Audio(music));
  const { playMusic, toggleMusic } = React.useContext(DappContext);

  // load audio file on component load
  useEffect(() => {
    audioRef.current.volume = 0.25;
    audioRef.current.loop = true;
    audioRef.current.load();

    return (): void => audioRef.current.pause();
  }, [])

  useEffect(() => {
    if(playMusic) {
      audioRef.current.play()
    } else {
      audioRef.current.pause();
    }

    return (): void => audioRef.current.pause();
  }, [playMusic])
  
  return (
    <div className="music-button-wrapper">
      <FontAwesomeIcon
        className={"music-button"}
        icon={playMusic ? faVolumeUp : faVolumeMute }
        onClick={  (): void => toggleMusic(!playMusic) }
      />
    </div>
  );
}

export default MusicHook;