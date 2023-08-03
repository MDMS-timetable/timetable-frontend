import { useState } from "react";
import React, { useEffect } from "react";
import axios from "axios";

const Lunch = () => {
  const [lunchData, setLunchData] = useState([]);
  useEffect(() => {
    axios
      .post(
        "https://port-0-timetable-backend-kvmh2mlk183p67.sel4.cloudtype.app/viewtimetable",
        { date: 20230511 },
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
  return (
    <div>
      <div>하이</div>
        <div>{lunchData.row.ORPLC_INFO}</div>
        <div>{lunchData.row.CAL_INFO}</div>
    </div>
  );
};

export default Lunch;
