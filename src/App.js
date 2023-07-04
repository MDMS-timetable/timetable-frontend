import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [timeTableData, setTimeTableData] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const cancelToken = useRef(null);

  const handleSelectChange = (event) => {
    const selectedGrade = event.slice(0, 1);
    const selectedClass = event.slice(1, 2);

    setSelectedGrade(selectedGrade);
    setSelectedClass(selectedClass);
  };

  useEffect(() => {
    const storedGrade = localStorage.getItem("selectedGrade");
    const storedClass = localStorage.getItem("selectedClass");

    if (storedGrade && storedClass) {
      setSelectedGrade(storedGrade);
      setSelectedClass(storedClass);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedGrade", selectedGrade);
    localStorage.setItem("selectedClass", selectedClass);

    if (cancelToken.current) {
      cancelToken.current.cancel("Previous request canceled");
    }

    cancelToken.current = axios.CancelToken.source();

    if (selectedGrade && selectedClass) {
      axios
        .post(
          "https://mdms-server.loca.lt/viewtimetable",
          { grade: selectedGrade, class: selectedClass },
          { cancelToken: cancelToken.current.token }
        )
        .then((response) => {
          setTimeTableData(response.data);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else {
            console.log(error);
          }
        });
    }

    return () => {
      cancelToken.current.cancel("Cleanup on unmount");
    };
  }, [selectedGrade, selectedClass]);

  const selectMenuClass = () => {
    return (
      <div className="dropdown-menu" ref={dropdownRef}>
        <div className="dropdown-header" onClick={handleHeaderClick}>
          {selectedGrade && selectedClass ? `${selectedGrade}-${selectedClass}` : '선택'}
        </div>
        {isOpen && (
          <ul className="dropdown-list">
            <li
              className="dropdown-item"
              onClick={() => handleSelectChange("11")}
            >
              1-1
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleSelectChange("12")}
            >
              1-2
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleSelectChange("13")}
            >
              1-3
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleSelectChange("14")}
            >
              1-4
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleSelectChange("15")}
            >
              1-5
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleSelectChange("21")}
            >
              2-1
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleSelectChange("22")}
            >
              2-2
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleSelectChange("23")}
            >
              2-3
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleSelectChange("24")}
            >
              2-4
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleSelectChange("25")}
            >
              2-5
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleSelectChange("26")}
            >
              2-6
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleSelectChange("27")}
            >
              2-7
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleSelectChange("31")}
            >
              3-1
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleSelectChange("32")}
            >
              3-2
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleSelectChange("33")}
            >
              3-3
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleSelectChange("34")}
            >
              3-4
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleSelectChange("35")}
            >
              3-5
            </li>
          </ul>
        )}
      </div>
    );
  };

  const renderDayData = () => {
    if (!Array.isArray(timeTableData) || timeTableData.length === 0) {
      return null;
    }

    return (
      <div>
        <table className="schedule-table">
          <thead>
            <tr className="th-color">
              <th>교시</th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((classTime, index) => (
              <tr key={index}>
                <td>{classTime + 1}</td>
                {[0, 1, 2, 3, 4].map((weekday, index) => (
                  <td key={index}>
                    {timeTableData[weekday].map((schedule, index) => {
                      if (schedule.classTime === classTime + 1) {
                        return (
                          <div key={index} className="schedule-item">
                            <div>{schedule.subject}</div>
                            <div>{schedule.teacher}</div>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleHeaderClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="title">
        <div className="title-size">
          MDMS {selectedGrade}-{selectedClass} Timetable
        </div>
        <div className="class">
          <span id="class-text">학급 : </span>
          {selectMenuClass()}
        </div>
      </div>
      <div>{renderDayData()}</div>
    </div>
  );
};

export default App;
