import React,{useEffect} from 'react';

const Date = ({setCurrentDateTime,currentDateTime}) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const dayOfWeek = now.toLocaleString('default', { weekday: 'long' });
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const dateTimeString = `${year}년 ${month}월 ${day}일 (${dayOfWeek}) ${hours}:${minutes}`;
      setCurrentDateTime(dateTimeString);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
};

export default Date;