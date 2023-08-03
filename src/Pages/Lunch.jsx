import { useState } from 'react';
import React, { useEffect } from 'react';
import axios from 'axios';

const Lunch = () => {
    const [lunchData, setLunchData] = useState();
    useEffect(() => {
        axios
            .post('https://port-0-timetable-backend-kvmh2mlk183p67.sel4.cloudtype.app/lunch/mealinfo', { month: 202304 })
            .then((response) => {
                setLunchData(response.data);
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error.message);
                } else {
                    console.log(error);
                }
            });
    }, []);
    console.log(lunchData)
    return (
        <>
            <div>하이</div>
            <div>
              {lunchData && lunchData.map((item) => (
                <>
                  <div>{item.date}</div>
                  <div>{item.lunch}</div>
                  <div>{item.calorie}</div>
                </>
              ))}
            </div>
        </>
    );
};

export default Lunch;
