import { addDays, subDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Meal from "../Components/Meal";
import useLunchQuery from "../Hooks/useLunchQuery";
import axios from "axios";

const Lunch = () => {
  const [lunchDate, setLunchDate] = useState(new Date());
  const { data: lunchList } = useLunchQuery(lunchDate);

  useEffect(() => {
    axios.get(
      "https://port-0-timetable-backend-kvmh2mlk183p67.sel4.cloudtype.app/hits/meal",
    );
  }, []);

  const postNextLunch = () => {
    setLunchDate(addDays(lunchDate, 1));
  };

  const postPrevLunch = () => {
    setLunchDate(subDays(lunchDate, 1));
  };

  console.log(lunchDate.getMonth() + 1, lunchDate.getDate());

  return (
    <>
      <Header />
      <div className="lunchBox-container">
        <FiChevronLeft size={70} onClick={postPrevLunch} />
        <Meal meal={lunchList?.[0]} />
        <Meal meal={lunchList?.[2]} />
        <Meal meal={lunchList?.[1]} />
        <FiChevronRight size={70} onClick={postNextLunch} />
      </div>
      <Footer />
    </>
  );
};

export default Lunch;
