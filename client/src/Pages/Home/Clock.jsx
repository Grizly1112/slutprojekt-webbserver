import React, { useState, useEffect } from 'react';
import './css/Clock.css'
import { FaCircle } from 'react-icons/fa';
import Utils from '../../assets/functiions/Utils';

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [clockView, setClockView] = useState('1');


  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  const year =  time.getFullYear();
  const seconds = time.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;

  const mins = time.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;

  const hour = time.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;


  const AnalogClock = () => {
    return(
      <div className="clock-1">
      <div className="outer-clock-face">
        <div className="hand hour-hand" style={{ transform: `rotate(${hourDegrees}deg)` }}></div>
        <div className="hand min-hand" style={{ transform: `rotate(${minsDegrees}deg)` }}></div>
        <div className="hand second-hand" style={{ transform: `rotate(${secondsDegrees}deg)` }}></div>
        <div className="inner-clock-face"></div>
        <div className="marking marking-one"></div>
        <div className="marking marking-two"></div>
        <div className="marking marking-three"></div>
        <div className="marking marking-four"></div>
      </div>
    </div>
    )
  }

  const DigitalTime = () => {
    let DTHours = ('0' + hour).slice(-2);
    let DTMinutes = ('0' + mins).slice(-2);
    let DTseconds = ('0' + seconds).slice(-2);
    let DTtime = `${DTHours}:${DTMinutes}:${DTseconds}`;


    const zeroPadding = (num, places) => String(num).padStart(places, '0');
    
    const week = ['Sön', 'Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör'];
    
    const date = `${time.getFullYear()}-${('0' + (time.getMonth() +1)).slice(-2)}-${('0' + time.getDate()).slice(-2)} ${week[time.getDay()]}`;
    

    return (
      <>
      <div className='clock-2' >
        <h2 className="digitalTime" data-time={DTtime}>
          {DTtime}
        </h2>
        <h3>{date}</h3>
      </div>
      </>
    );
  };

  return (
    <div className='clock-container'>
      <div className="clock">

      {
        clockView === '1' && <AnalogClock />
      }
      {
        clockView === '2' && <DigitalTime />
      }
      </div>
    

    <div className="toggle-clock-view">
      <FaCircle className={clockView === "1" ? 'disabled': null} onClick={() => setClockView('1')} />
      <FaCircle className={clockView === "2" ? 'disabled': null} onClick={() => setClockView('2')} />
    </div>

    </div>
  );
}