import React, { useEffect, useState } from "react";
import { addDays, subDays, format } from "date-fns";
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Meal from "../Components/Meal";

const Lunch = () => {
  const date = new Date(2023, 4, 17);
  const [lunchList, setLunchList] = useState([]);
  const [rightIndex, setRightIndex] = useState(1);
  const [leftIndex, setLeftIndex] = useState(1);

  const callLunch = (props) => {
    axios
      .get(
        "https://port-0-timetable-backend-kvmh2mlk183p67.sel4.cloudtype.app/lunch/mealinfo",
        {
          params: { date:null, start:props.start ? format(props.start, "yyyyMMdd") : null, end:props.end ? format(props.end, "yyyyMMdd") : null }
        }, 
      )
      .then((response) => {
        if (!props.date) {
          console.log(response.data)
          // response.data.map((value, index) =>{
          //   if (Number(value.date.month) == date.getMonth()+1 && Number(value.date.month) == date.getDay()){
          //     setLunchIndex(index)
          //   }
          // })
          return setLunchList(response.data);
        }
        if (!lunchList) {
          return console.log("유효하지 않은 요청입니다.");
        }
        if (!response.data) {
          console.log("급식 데이터가 없습니다.");
          return;
        }
        
      })
      .catch((error) => {
        console.log(error)
      });
      
  };

  useEffect(() => {
    callLunch({ start: subDays(date, 1), end: addDays(date, 1) });
    console.log(lunchList)
  }, []);

  useEffect(() => {
    callLunch({ start: subDays(date, rightIndex), end: addDays(date, leftIndex) });
    console.log(lunchList)
  }, [rightIndex, leftIndex]);
  
  return (
    <>
      <Header />
      <div className="lunchBox-container">
        <FiChevronLeft
          size={70}
          onClick={() => {setRightIndex(rightIndex+1);setLeftIndex(leftIndex-1)}}
        />
        <Meal
          meal={lunchList[0] ? lunchList[0] : null}
          onclick={() => {setRightIndex(rightIndex+1);setLeftIndex(leftIndex-1)}}
        />
        <Meal
          meal={lunchList[2] ? lunchList[2] : null}
          onclick={() => {setLeftIndex(leftIndex+1);setRightIndex(rightIndex-1);}}
        />
        <Meal meal={lunchList[1] ? lunchList[1] : null} />
        <FiChevronRight
          size={70}
          onClick={() => {setLeftIndex(leftIndex+1);setRightIndex(rightIndex-1);}}
        />
      </div>
      <Footer />
    </>
  );
};

export default Lunch;