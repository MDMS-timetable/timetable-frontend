import React, { useEffect, useState } from "react";
import axios from 'axios';

  
    
const App = () => {
  const [timeTableData, setTimeTableData] = useState(null) // 수업시간정보
  const [scheduleData, setScheduleData] = useState(null) // 시간표

  // 수업시간정보
  useEffect(() => {
    axios.get('http://localhost:2500/timetable')
      .then(response => {
        setTimeTableData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // 시간표
  useEffect(() => {
    axios.get('http://localhost:2500/schedule')
      .then(response => {
        setScheduleData(response.data);
        console.log(response.data);
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
