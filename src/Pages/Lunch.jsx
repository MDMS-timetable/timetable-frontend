import { useState } from 'react';
import React, { useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import axios from 'axios';
import Header from "../Components/Header"
import Footer from "../Components/Footer";
function LunchBox(props) {
  const info = props.data
  const days = props.day
  let menu = "";
  let menu_list = []
  let year = "";
  let month = "";
  let day = "";
  let kcal = 0
  let kcal_num = 0
  let kcalColor = ''
  console.log(days)
  if (info!=undefined){
    console.log(info[0].date)
    menu = info[0].lunch
    console.log(menu)
    menu_list = menu.split(' ');
    year = days.getFullYear()
    month = info[0].date.month
    day = info[0].date.day
    kcal = info[0].calorie
    kcal_num = Number(info[0].calorie.replace(" Kcal", ""))
    if (kcal_num >= 900){
      kcalColor = 'red'
    }
    else if (kcal_num >= 800){
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
          <span>{Number(month)}월 {Number(day)}일 </span>
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

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

const Lunch = () => {
  const todayDate = new Date("2023 05 10")
  const [leftDate, setLeftDate] = useState(todayDate)
  const [rightDate, setRightDate] = useState(todayDate)
  const [needDate, setNeedDate] = useState(todayDate)
  const [lunchData, setLunchData] = useState();
  const [lunchDataList, setLunchDataList] = useState([]);
  const [state, setState] = useState(1)
  function getLunchInfo(month_, isPush=true) {
    axios
      .post(
        "https://port-0-timetable-backend-kvmh2mlk183p67.sel4.cloudtype.app/lunch/mealinfo",
        { month: month_ },
      )
      .then((response) => {
        setLunchData(response.data)
        if (isPush){
          lunchDataList.push(response.data);
        }
        else{
          lunchDataList.unshift(response.data);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log(error);
        }
        
      });
      setLunchDataList(lunchDataList);
  }
  function changeNeedTime(number) {
    if (state+2 >= lunchDataList.length && number==1){
      var needDate_ = new Date(needDate)
      var needDate_ = new Date(needDate_.getTime() + 24 * 60 * 60 * 1000 * number);
      var needDate_temp = new Date(needDate_.getTime() + 24 * 60 * 60 * 1000 * number);
      var dateString = needDate_temp.toLocaleDateString('ko-KR', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/[^0-9]/g, '');
      getLunchInfo(dateString)
      SetNeedDate(needDate_)
      setState(state+1)
    }
    else if (state <= 1 && number==-1){
      var needDate_ = new Date(needDate)
      var needDate_ = new Date(needDate_.getTime() + 24 * 60 * 60 * 1000 * number);
      var needDate_temp = new Date(needDate_.getTime() + 24 * 60 * 60 * 1000 * number);
      var dateString = needDate_temp.toLocaleDateString('ko-KR', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/[^0-9]/g, '');
      getLunchInfo(dateString, false)
      SetNeedDate(needDate_)
    }
    else{
      setState(state+number)
    }
    console.log(lunchDataList)
  }
  useEffect(() => {
    var needDate_ = new Date(needDate)
    needDate_ = new Date(needDate_.getTime() + 24 * 60 * 60 * 1000 * -1);
    for (let i=0; i<3; i++){
      console.log(needDate_)
      var dateString = needDate_.toLocaleDateString('ko-KR', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/[^0-9]/g, '');
      getLunchInfo(dateString)
      needDate_ = new Date(needDate_.getTime() + 24 * 60 * 60 * 1000);
      console.log(needDate_)
      // changeNeedTime(-1)
      console.log(dateString)
      console.log("lunchDataList:")
      console.log(lunchDataList)
      sleep(80)
    }
  }, []);
  
  return (
    <>
      <Header/>
      <div className='lunchBox-container'>
        <FiChevronLeft size={70} onClick={()=>{changeNeedTime(-1)}}/>
        <LunchBox day={Date(needDate.getTime() + 24 * 60 * 60 * 1000 * -1)} data={lunchDataList ? lunchDataList[state-1] : null} onClick={()=>{changeNeedTime(-1)}}/>
        <LunchBox day={Date(needDate.getTime() + 24 * 60 * 60 * 1000 * +1)} data={lunchDataList ? lunchDataList[state+1] : null} onClick={()=>{changeNeedTime(+1)}}/>
        <LunchBox day={needDate} data={lunchDataList ? lunchDataList[state] : null } onClick={()=>{}}/>
        <FiChevronRight size={70} onClick={()=>{changeNeedTime(+1)}}/>
      </div>
        <Footer />
    </>
  );
};

export default Lunch;
