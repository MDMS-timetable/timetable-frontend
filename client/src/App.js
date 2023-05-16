import React, { useEffect, useState } from "react";
import axios from 'axios';

function App() {

  const [timetalbeData, setTimetableData] = useState(null)
  const [scheduleData, setScheduleData] = useState(null)

  const fetchTimeTableData = async() => {
    setTimetableData(null);
    const response = await axios.get('http://localhost:2500/timetable')
    setTimetableData(response.data);
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

}

export default App
