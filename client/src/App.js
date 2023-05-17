import React, { useEffect, useState } from "react";
import axios from 'axios';

const App = () => {
  const [timeTableData, setTimeTableData] = useState();
  const [scheduleData,setScheduleData] = useState();

  // 수업시간정보
  useEffect(() => {
    axios.get('http://localhost:8080/timetable')
      .then(response => {
        setTimeTableData(response.data[1]);
      })
      .catch(error => {
        console.error(error);
      });
  },[]);
  

  // 시간표
  useEffect(() => {
    axios.get('http://localhost:8080/schedule')
    .then(response => {
      setScheduleData(response.data[1])
    })
    .catch(error => {
      console.error(error);
    });
  },[])
  
  const data = {
    grade : 3,
    class : 3,
  }

  const onHandle1_1 = () => {
    axios.post('http://localhost:8080/viewtimetable', data)
      .then(response => {
        setTimeTableData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      <button onClick={onHandle1_1}>1학년 1반</button>
      <h2></h2>
    </div>
  )
  
}

export default App
