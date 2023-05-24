import React, { useEffect, useState } from "react";
import axios from 'axios';
import Select from "./components/Select";
import RenderDayData from "./components/RenderDayData";
import './App.css'
import { scheduleData  } from "./components/api/timetable/scheduleData";

const App = () => {
  const [timeTableData, setTimeTableData] = useState();
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

  // 시간표

  // 수업시간정보
  useEffect(() => {
    axios.get('http://localhost:8080/timetable')
      .then(response => {
        setTimeTableData(response.data[1]);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const storedGrade = localStorage.getItem('selectedGrade');
    const storedClass = localStorage.getItem('selectedClass');

    if (storedGrade && storedClass) {
      setSelectedGrade(storedGrade);
      setSelectedClass(storedClass);
    }
  }, []);

  return (
    <div>
      <Select 
      selectedClass = {selectedClass}
      selectedGrade = {selectedGrade}
      setSelectedClass = {setSelectedClass}
      setSelectedGrade = {setSelectedGrade}
      currentDateTime = {currentDateTime}
      setCurrentDateTime = {setCurrentDateTime}
      setTimeTableData = {setTimeTableData}
      />
      <div>
        <RenderDayData 
        timeTableData = {timeTableData}
        />
      </div>
    </div>
  );
}

export default App;
