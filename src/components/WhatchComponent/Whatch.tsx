import { useRef, useState, useEffect } from 'react';
import './whatch.css';
import 'moment/locale/ru';
import moment from "moment";


type WhatchProps = {
  title: string,
  timeZone: number,
  times: Time[],
  setTimes: (prev: Time[]) => void
}

const Whatch: React.FC<WhatchProps> = ({ title, timeZone, times, setTimes }) => {
  const hourEl = useRef(null);
  const minEl = useRef(null);
  const secEl = useRef(null);
  const [date, setDate] = useState(moment().utcOffset(Number.parseInt(timeZone)).format("LTS"));
  // console.log(date)
  const hour = Math.floor(((date / 1000 / 60 / 60) + timeZone) % 24);
  const min = Math.floor((date / 1000 / 60 ) % 60);
  const sec = Math.floor((date / 1000 ) % 60);
  const secDeg = sec / 60 * 360;
  const minDeg = min / 60 * 360 + secDeg / 60;
  const hourDeg = 90 + (hour / 12 * 360) + minDeg / 12;

  timeZone =4;
  
  // useEffect(() => {
  //   const timeId = setInterval(() => setDate(Date.now()), 1000);
  //   return () => clearInterval(timeId);
  // }, []);

  useEffect(() => {
    const timeId = setInterval(() => setDate(Date.now()), 1000);
    return () => clearInterval(timeId);
  }, []);

  const removeWhatch = () => {
    setTimes(times.filter(item => item.title !== title))
  }

  return (
    <div className='whatch'>
      <h3 className="whatch-title">{title}</h3>
      <span
        className="whatch-close"
        onClick={removeWhatch}
      >❎</span>
      <div className="clock-face">
        
        <div
          className="hour-hand"
          ref={hourEl}
          style={{transform: `rotate(${hourDeg}deg)`}}
        ></div>
        <div
          className="minute-hand"
          ref={minEl}
          style={{transform: `rotate(${minDeg}deg)`}}
        ></div>
        <div
          className="second-hand"
          ref={secEl}
          style={{transform: `rotate(${secDeg}deg)`}}
        ></div>
      
        </div>
        
      <div className="clock__num">
        {`${hour} : ${min} : ${sec}`}
      </div>
    </div>
  )
}

interface Time {
    title: string,
    timeZone: number
  }

export default Whatch