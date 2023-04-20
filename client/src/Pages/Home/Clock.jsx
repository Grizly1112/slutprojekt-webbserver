import React, { useState, useEffect, useMemo } from 'react';
import './css/Clock.css'
import { FaCircle } from 'react-icons/fa';

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [clockView, setClockView] = useState('1');

  /* `useEffect` update time eveery second */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Delete current instance of setInterval
    return () => clearInterval(intervalId);
  }, []);

 

  // JSX - Analog
  const AnalogClock = () => {
     /*
      Using useMemo here optimizes the calculation of secondsDegrees by memoizing the -
      value and only recalculating when time changes, improving the performance of the component.
    */
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

    // Define variables
    const DTHours = ('0' + time.getHours()).slice(-2);
    const DTMinutes = ('0' + time.getMinutes()).slice(-2);
    const DTseconds = ('0' + time.getSeconds()).slice(-2);
    const DTtime = `${DTHours}:${DTMinutes}:${DTseconds}`;

    // Weekday short, array
    const week = ['Sön', 'Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör'];
    
    // Format date string
    const date = `${time.getFullYear()}-${('0' + (time.getMonth() +1)).slice(-2)}-${('0' + time.getDate()).slice(-2)} ${week[time.getDay()]}`;

    return (
      <div className='clock-2' >
        <h2 className="digitalTime" data-time={DTtime}>
          {DTtime}
        </h2>
        <h3>{date}</h3>
      </div>
    );
  };

  // Function to display toggled clockView
  function renderClock(clockView) {
    const ClockViews = {
      '1': <DigitalTime />,
      '2': <AnalogClock />,
    };
    return ClockViews[clockView] || null;
  }
  
  // Toggle circleView cirlce-icon
  function renderCircle(number) {
    const isDisabled = clockView === number;
    return (
      <FaCircle
        className={isDisabled ? 'disabled' : null}
        onClick={() => setClockView(number)}
      />
    );
  }
  
  // ClockViews Body
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