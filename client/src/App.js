import React, { useEffect, useState } from "react";
import axios from 'axios';

const App = () => {
  const [timeTableData, setTimeTableData] = useState(null)

  const fetchData = async() => {
    setTimeTableData(null);
    const response = await axios.get('http://localhost:2500/timetable')
    setTimeTableData(response.data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  console.log(timeTableData && timeTableData[1][1][0][0].teacher)

  return (
    <div>
      
    </div>
  )
  
}

export default App
