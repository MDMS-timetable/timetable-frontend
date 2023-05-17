import React, { useEffect, useRef } from "react";
import axios from 'axios';

const App = () => {
  const timeTableData = useRef();
  const scheduleData = useRef();

  // 수업시간정보
  useEffect(() => {
    axios.get('http://localhost:2500/timetable')
      .then(response => {
        timeTableData.current = (response.data);
        console.log(timeTableData.current);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // 시간표
  useEffect(() => {
    axios.get('http://localhost:2500/schedule')
      .then(response => {
        scheduleData.current = (response.data);
        console.log(scheduleData.current);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  // timeTableData[학년][반][요일][교시]
  // console.log(timeTableData && timeTableData[1][1][0][0]);

  return (
    <div>
      
    </div>
  )
  
}

export default App
