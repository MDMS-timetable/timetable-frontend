import { useState } from 'react';
import React, { useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import axios from 'axios';

function LunchBox(props) {
  const info = props.data
  let menu = "";
  let menu_list = []
  let day = "";
  let kcal = 0
  let kcalColor = ''
  if (info){
    console.log(props.data)
    menu = info.lunch
    console.log(menu)
    menu_list = menu.split(' ');
    day = info.date
    kcal = info.calorie.replace("Kcal", "")
    if (Number(kcal) >= 900){
      kcalColor = 'red'
    }
    else if (Number(kcal) >= 800){
      kcalColor = 'yellow'
    }
    else {
      kcalColor = 'green'
    }
  }
  else{
    menu_list = ["정보가 없습니다"];
  }

  console.log(menu_list)
  return (
    <div onClick={()=>props.onClick()} className={`lunchBox`}>
      {/* 요일, 칼로리 */}
      <div className={`${kcalColor} dayandKcal`}>
          <span>{day}</span>
          <span>{kcal}</span>
      </div>
      <div className={"menu_container"}>
        <div className={"menu"}>
            {menu_list.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
        </div>
      </div>
    </div>

  )
}

const Lunch = () => {
  let today_date = new Date()
  let _year = String(today_date.getFullYear());	
  let _month = String(today_date.getMonth()+1).padStart(2, "0");	
  let _date = String(today_date.getDate());
  const [lunchData, setLunchData] = useState();
  const [currentDate, setCurrentDate] = useState(_year+_month+_date);
  const [state, setState] = useState(0)
  console.log(currentDate.slice(0, 6))
  useEffect(() => {
    axios
      .post(
        "https://port-0-timetable-backend-kvmh2mlk183p67.sel4.cloudtype.app/lunch/mealinfo",
        { month:  currentDate.slice(0, 6) },
      )
      .then((response) => {
        setLunchData(response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log(error);
        }
      });
  }, []);
  // console.log(lunchData)
  // let nextMonthLastDate = new Date(
  //   Number(_year), 
  //   Number(_month)
  //   , 0
  // )
  // console.log("length"+(nextMonthLastDate.getDate()-lunchData.length))
  // console.log(nextMonthLastDate.getDate())
  // console.log(today_date.getMonth())
  // console.log(today_date.getDate())
  // console.log((today_date.getDate()+1))
  return (
    <>
      
      <div className='lunchBox-container'>
        <FiChevronLeft size={70} onClick={()=>{setState(state-1)}}/>
        <LunchBox data={lunchData ? lunchData[state-1] : null} onClick={()=>{setState(state-1)}}/>
        <LunchBox data={lunchData ? lunchData[state+1] : null} onClick={()=>{setState(state+1)}}/>
        <LunchBox data={lunchData ? lunchData[state] : null } onClick={()=>{}}/>
        <FiChevronRight size={70} onClick={()=>{setState(state+1)}}/>
      </div>
      
        
        {/* {lunchData &&
          lunchData.map((item, index) => (
            <div key={index}>
              <div>{item.date}</div>
              <div>{item.lunch}</div>
              <div>{item.calorie}</div>
              <br></br>
            </div>
        ))}  */}
    </>
  );
};

export default Lunch;
