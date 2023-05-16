import React, { useEffect, useState } from "react";
import axios from 'axios';

function App() {

  const [timetalbeData, setTimetableData] = useState(null)

  const fetchData = async() => {
    setTimetableData(null);
    const response = await axios.get('http://localhost:2500/timetable')
    setTimetableData(response.data);
  }

  useEffect(() => {
    fetchData();
  }, [])

}

export default App
