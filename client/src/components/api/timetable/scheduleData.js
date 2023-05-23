import { useState ,useEffect } from "react";
import axios from "axios";


export const scheduleData = () => {
  const [scheduleData, setScheduleData] = useState();

  useEffect(() => {
  axios.get('http://localhost:8080/schedule')
    .then(response => {
      setScheduleData(response.data)
    })
    .catch(error => {
      console.error(error);
    });
}, [])
}