import React, { useEffect, useState } from "react";
import axios from 'axios';

  
    
const App = () => {
  const [timeTableData, setTimeTableData] = useState(null) // 수업시간정보
  const [scheduleData, setScheduleData] = useState(null) // 시간표

  // 수업시간정보
  const fetchTimeTableData = async() => {
    setTimeTableData(null);
    const response = await axios.get('http://localhost:2500/timetable')
    setTimeTableData(response.data);
  }

  // 시간표
  const fetchScheduleData = async() => {
    setScheduleData(null);
    const response = await axios.get('http://localhost:2500/schedule')
    setScheduleData(response.data);
  }

  // 수업시간정보
  useEffect(() => {
    fetchTimeTableData();
  }, [])

  // 시간표
  useEffect(() => {
    fetchScheduleData();
  }, [])

  // timeTableData[학년][반][요일][교시]
  console.log(timeTableData && timeTableData[1][1][0][0].teacher)

  return (
    <div>
      
    </div>
  )
  
}

export default App
