import React from 'react';
import './style.css'

// 요일 데이터를 HTML로 변환하여 반환하는 함수
const RenderDayData = ({timeTableData}) => {

  if (!timeTableData || !Array.isArray(timeTableData)) {
    return null; // 데이터가 없거나 배열이 아닐 경우 null 반환
  }

  return timeTableData.map((dayData, index) => (
    <>
      <div key={index}>
        <h1 className='day'>요일: {dayData[0].weekdayString}</h1>
        <table>
          <thead>
            <tr>
              <th>교시</th>
              <th>과목</th>
              <th>선생님</th>
            </tr>
          </thead>
          <tbody>
            {dayData.map((item, index) => (
              item.subject && (
                <tr key={index}>
                  <td>{item.classTime}</td>
                  <td>{item.subject}</td>
                  <td>{item.teacher}</td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </>
  ));
};

export default RenderDayData;