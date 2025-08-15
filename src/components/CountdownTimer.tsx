import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className='countdown-timer'>
      <div className='countdown-item'>
        <span className='countdown-number'>
          {timeLeft.days.toString().padStart(2, '0')}
        </span>
        <span className='countdown-label'>Días</span>
      </div>
      <div className='countdown-item'>
        <span className='countdown-number'>
          {timeLeft.hours.toString().padStart(2, '0')}
        </span>
        <span className='countdown-label'>Horas</span>
      </div>
      <div className='countdown-item'>
        <span className='countdown-number'>
          {timeLeft.minutes.toString().padStart(2, '0')}
        </span>
        <span className='countdown-label'>Minutos</span>
      </div>
      <div className='countdown-item'>
        <span className='countdown-number'>
          {timeLeft.seconds.toString().padStart(2, '0')}
        </span>
        <span className='countdown-label'>Segundos</span>
      </div>
    </div>
  );
};
