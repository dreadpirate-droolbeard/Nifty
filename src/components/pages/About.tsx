import React from "react";
import { PAINTSWAP_URL, PAINTSWAP_LOGO } from "../../common/constants";
import { DappContext } from "../../contexts/MintContext";
import { Socials } from "../composites/Socials";
// import Countdown from "./Countdown";
// import { getMintCountDownMessage } from "../common/constants";

export function About(): React.ReactElement {
  // const [ countDownTime, setCountDownTime ] = React.useState<Date>();
  // const { startTime, endTime, isMintLive } = React.useContext(DappContextProvider);
  const { totalMinted, maxSupply } = React.useContext(DappContext);

  // React.useEffect( () => {
  //   setCountDownTime(isMintLive ? endTime : startTime)
  // }, [ [], isMintLive, endTime, startTime]);

  return(
    <div className="about-page">
      <div className="video-wrapper">
        <iframe 
          src="https://www.youtube-nocookie.com/embed/tg2wU3DLEcw"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="about-content">
        {/* <div className="countdown-timer-wrapper">
          <div className="countdown-message">{getMintCountDownMessage(isMintLive, startTime, endTime)}</div>
          <Countdown dateTime={s countDownTime } />
        </div> */}
        <div className="mint-count">
          {totalMinted} minted / {maxSupply} total supply
        </div>
        <div className="social-media-wrapper">
          <div className="social-media-title"> Join us. If you dare...</div>
          <Socials />
          <a 
            className="paintswap-svg"
            rel="noopener noreferrer"
            target="_blank"
            href={PAINTSWAP_URL}
          >
            <img 
              src={PAINTSWAP_LOGO} 
              alt="Paintswap Logo"
            />
          </a>
        </div>
      </div>
    </div>
  )
  
}
