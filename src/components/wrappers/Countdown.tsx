import React from 'react';
import { COUNTDOWN_COMPLETE_MESSAGE } from '../../common/constants';

interface iTimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(date: Date | undefined): iTimeLeft | undefined {
  let timeLeft: iTimeLeft | undefined;

  if( date === undefined){
    return timeLeft;
  }

  const difference = +date - +new Date();

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
}

export default function Countdown({dateTime}: {dateTime: Date | undefined}): React.ReactElement {
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft(dateTime));
  React.useEffect(() => {
    const id = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(dateTime));
    }, 1000);

    return (): void => {
      clearTimeout(id);
    };
  });

  const timerComponents = timeLeft && Object.keys(timeLeft).map((interval, idx) => {
    // note: this allows not rendering an interval if it's empty...
    // causes jumps when hour/minute/second is 0
    // if (!timeLeft[interval]) {
    //   return;
    // }
    const castInterval = interval as keyof iTimeLeft;

    const colon = interval !== "seconds" ? <div className="colon">:</div> : null;
    const paddedNumber = timeLeft[castInterval].toString().length < 2 ? `0${timeLeft[castInterval]}` : timeLeft[castInterval]

    return (
      <div className="interval-wrapper" key={idx}>
        <div className={`interval ${interval}`} key={interval}>
          <div className="numbers">{paddedNumber}</div>       
          <div className="text"> {`${interval}`}</div>
        </div>
        {colon}
      </div>
    );
  });

  return (
    <div className={"countdown-timer"}>
      {timerComponents ? timerComponents : <span>{COUNTDOWN_COMPLETE_MESSAGE}</span>}
    </div>
  );
}