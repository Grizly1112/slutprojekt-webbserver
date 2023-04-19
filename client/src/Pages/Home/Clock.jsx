import React, { useState, useEffect, useMemo } from 'react';
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

  const hourDegrees = useMemo(() => {
    const hour = time.getHours();
    const mins = time.getMinutes();
    return ((hour / 12) * 360) + ((mins/60)*30) + 90;
  }, [time]);

  const minsDegrees = useMemo(() => {
    const mins = time.getMinutes();
    const seconds = time.getSeconds();
    return ((mins / 60) * 360) + ((seconds/60)*6) + 90;
  }, [time]);

  const secondsDegrees = useMemo(() => {
    const seconds = time.getSeconds();
    return ((seconds / 60) * 360) + 90;
  }, [time]);

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
    let DTHours = ('0' + time.getHours()).slice(-2);
    let DTMinutes = ('0' + time.getMinutes()).slice(-2);
    let DTseconds = ('0' + time.getSeconds()).slice(-2);
    let DTtime = `${DTHours}:${DTMinutes}:${DTseconds}`;

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

  function renderClock(clockView) {
    switch (clockView) {
      case '1':
        return <DigitalTime />;
      case '2':
        return <AnalogClock />;
      default:
        return null;
    }
  }
  
  function renderCircle(number) {
    const isDisabled = clockView === number;
    return (
      <FaCircle
        className={isDisabled ? 'disabled' : null}
        onClick={() => setClockView(number)}
      />
    );
  }
  
  return (
    <div className='clock-container'>
      <div className="clock">
        {renderClock(clockView)}
      </div>
  
      <div className="toggle-clock-view">
        {renderCircle('1')}
        {renderCircle('2')}
      </div>
    </div>
  );
}