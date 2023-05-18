import React, { useEffect, useState } from "react";
import axios from 'axios';
import Select from "./components/Select";
import RenderDayData from "./components/RenderDayData";
import './App.css'

const App = () => {
  const [timeTableData, setTimeTableData] = useState();
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [cancelToken, setCancelToken] = useState(null); // 요청 취소 토큰
  const [scheduleData, setScheduleData] = useState();

  // 시간표
  useEffect(() => {
    axios.get('http://localhost:8080/schedule')
      .then(response => {
        setScheduleData(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, [])

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

  useEffect(() => {
    // 선택 값이 변경될 때마다 로컬 스토리지에 저장
    localStorage.setItem('selectedGrade', selectedGrade);
    localStorage.setItem('selectedClass', selectedClass);

    // 이전 요청 취소
    if (cancelToken) {
      cancelToken.cancel('Previous request canceled');
    }

    // 요청 취소 토큰 생성
    const source = axios.CancelToken.source();
    setCancelToken(source);

    // 선택 값이 존재할 경우에만 요청 보냄
    if (selectedGrade && selectedClass) {
      axios
        .post('http://localhost:8080/viewtimetable', { grade: selectedGrade, class: selectedClass }, { cancelToken: source.token })
        .then(response => {
          setTimeTableData(response.data);
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
          } else {
            console.log(error);
          }
        });
    }
  }, [selectedGrade, selectedClass]);


  return (
    <div>
      <Select 
      selectedClass = {selectedClass}
      selectedGrade = {selectedGrade}
      setSelectedClass = {setSelectedClass}
      setSelectedGrade = {setSelectedGrade}
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
