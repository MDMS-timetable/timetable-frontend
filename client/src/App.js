import React, { useEffect, useState } from "react";
import axios from 'axios';

  
    
const App = () => {
  const [timeTableData, setTimeTableData] = useState(null)
  const [scheduleData, setScheduleData] = useState(null)

  const fetchTimeTableData = async() => {
    setTimeTableData(null);
    const response = await axios.get('http://localhost:2500/timetable')
    setTimeTableData(response.data);
  }

  const fetchScheduleData = async() => {
    setScheduleData(null);
    const response = await axios.get('http://localhost:2500/schedule')
    setScheduleData(response.data);
  }
  
  useEffect(() => {
    fetchTimeTableData();
  }, [])

  useEffect(() => {
    fetchScheduleData();
  }, [])

  console.log(timeTableData && timeTableData[1][1][0][0].teacher)

  return (
    <div>
      
    </div>
  )
  
}

export default App
