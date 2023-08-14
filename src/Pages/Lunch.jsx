import React, { useEffect, useState } from "react";
import { addDays, subDays, format } from "date-fns";
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Meal from "../Components/Meal";

const Lunch = () => {
  const date = new Date(2023, 5, 14);
  const [lunchList, setLunchList] = useState([]);
  const [lunchIndex, setLunchIndex] = useState(1);

  const callLunch = (props) => {
    axios
      .post(
        "https://port-0-timetable-backend-kvmh2mlk183p67.sel4.cloudtype.app/lunch/mealinfo",
        {
          start: props.start ? format(props.start, "yyyyMMdd") : null,
          end: props.end ? format(props.end, "yyyyMMdd") : null,
          date: props.date ? format(props.date, "yyyyMMdd") : null,
        },
      )
      .then((response) => {
        if (!props.date) {
          return setLunchList(response.data);
        }
        if (!lunchList) {
          return console.log("유효하지 않은 요청입니다.");
        }
        if (!response.data) {
          console.log("급식 데이터가 없습니다.");
          return;
        }

        if (lunchIndex === 0) {
          setLunchList(lunchList.unshift(response.data));
          return setLunchIndex(1);
        } else {
          return setLunchList(lunchList.push(response.data));
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    callLunch({ start: subDays(date, 1), end: addDays(date, 1) });
  }, []);

  useEffect(() => {
    if (!lunchList[lunchIndex + 1] && lunchList[lunchIndex]) {
      const lunchDate = lunchList[lunchIndex].date;
      callLunch({
        date: addDays(
          new Date(
            lunchDate.year,
            Number(lunchDate.month),
            Number(lunchDate.day),
          ),
          1,
        ),
      });
    } else if (lunchIndex === 0 && lunchList[0]) {
      const lunchDate = lunchList[0].date;
      callLunch({
        date: subDays(
          new Date(
            lunchDate.year,
            Number(lunchDate.month),
            Number(lunchDate.day),
          ),
          1,
        ),
      });
    }
  }, [lunchIndex]);

  return (
    <>
      <Header />
      <div className="lunchBox-container">
        <FiChevronLeft
          size={70}
          onClick={() => setLunchIndex(lunchIndex - 1)}
        />
        <Meal
          meal={lunchList[lunchIndex - 1] ? lunchList[lunchIndex - 1] : null}
          onClick={() => setLunchIndex(lunchIndex - 1)}
        />
        <Meal
          meal={lunchList[lunchIndex + 1] ? lunchList[lunchIndex + 1] : null}
          onClick={() => setLunchIndex(lunchIndex + 1)}
        />
        <Meal meal={lunchList[lunchIndex] ? lunchList[lunchIndex] : null} />
        <FiChevronRight
          size={70}
          onClick={() => setLunchIndex(lunchIndex + 1)}
        />
      </div>
      <Footer />
    </>
  );
};

export default Lunch;
