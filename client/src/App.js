import React, { useEffect, useState } from "react";
import axios from 'axios';

const App = () => {
  const [timeTableData, setTimeTableData] = useState();
  // const [scheduleData, setScheduleData] = useState();
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [cancelToken, setCancelToken] = useState(null); // 요청 취소 토큰

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

  // 시간표
  // useEffect(() => {
  //   axios.get('http://localhost:8080/schedule')
  //     .then(response => {
  //       setScheduleData(response.data[1])
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, [])

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedGrade = selectedValue.slice(0, 1);
    const selectedClass = selectedValue.slice(1, 2);

    setSelectedGrade(selectedGrade);
    setSelectedClass(selectedClass);
  };

  // 데이터 요소를 HTML로 변환하여 반환하는 함수
  const renderTableData = (data) => {
    return data.map((item, index) => (
      item.subject && (
        <tr key={index}>
          <td>{item.classTime}</td>
          <td>{item.subject}</td>
          <td>{item.teacher}</td>
        </tr>
      )
    ));
  };

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

  // 요일 데이터를 HTML로 변환하여 반환하는 함수
  const renderDayData = () => {
    if (!timeTableData || !Array.isArray(timeTableData)) {
      return null; // 데이터가 없거나 배열이 아닐 경우 null 반환
    }

    return timeTableData.map((dayData, index) => (
      <div key={index}>
        <h2>요일: {dayData[0].weekdayString}</h2>
        <table>
          <thead>
            <tr>
              <th>교시</th>
              <th>과목</th>
              <th>선생님</th>
            </tr>
          </thead>
          <tbody>
            {renderTableData(dayData)}
          </tbody>
        </table>
      </div>
    ));
  };

  return (
    <div>
      <label htmlFor="mySelect">Select an option: </label>
      <select id="mySelect" onChange={handleSelectChange} value={selectedGrade + selectedClass}>
        <option value="11">1-1</option>
        <option value="12">1-2</option>
        <option value="13">1-3</option>
        <option value="14">1-4</option>
        <option value="15">1-5</option>
        <option value="21">2-1</option>
        <option value="22">2-2</option>
        <option value="23">2-3</option>
        <option value="24">2-4</option>
        <option value="25">2-5</option>
        <option value="31">3-1</option>
        <option value="32">3-2</option>
        <option value="33">3-3</option>
        <option value="34">3-4</option>
        <option value="35">3-5</option>
      </select>
      <p>Selected grade: {selectedGrade}</p>
      <p>Selected class: {selectedClass}</p>

      <div>
        {renderDayData()}
      </div>
    </div>
  );
}

export default App;
