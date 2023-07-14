import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./App.css";
import expend from "./img/expend.svg";
import github from "./img/github-mark.svg";
import instagram from "./img/Instagram_logo.svg";
import anys from "./img/anys_logo.svg";

const App = () => {
  const [timeTableData, setTimeTableData] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const cancelToken = useRef(null);
  const dropdownRef = useRef(null);

  const handleSelectChange = (event) => {
    const selectedGrade = event.slice(0, 1);
    const selectedClass = event.slice(1, 2);

    setSelectedGrade(selectedGrade);
    setSelectedClass(selectedClass);
    setIsOpen(false);
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
          "https://mdms-backend.bssm.kro.kr/viewtimetable",
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
          <div className="dropdown-text">
            <div>
              {selectedGrade && selectedClass
                ? `${selectedGrade}-${selectedClass}`
                : "선택"}
            </div>
            <img className="expend" src={expend} alt="" />
          </div>
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
              <th id="th-period">교시</th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3, 4, 5, 6].map((classTime, index) => (
              <tr key={index}>
                <td className="period">{classTime + 1}</td>
                {[0, 1, 2, 3, 4].map((weekday, index) => (
                  <td key={index}>
                    {timeTableData[weekday].map((schedule, index) => {
                      if (schedule.classTime === classTime + 1) {
                        return (
                          <div key={index} className="schedule-item">
                            <div>{schedule.subject}</div>
                            <div id="teacher">{schedule.teacher}</div>
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
      <Helmet>
        <meta charset="utf-8" />
        <link rel="icon" href="/mdms_logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="만덕중학교 시간표를 확인할 수 있습니다."
        />
        <meta
          name="keywords"
          content="시간표, 만덕중학교, 만덕중학교 시간표, 만중 시간표, 만덕중 시간표, 만덕중"
        />
        <meta name="author" content="An Ye Seong" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Subject" content="시간표" />
        <meta http-equiv="Generator" content="Visual Studio Code" />
        <meta http-equiv="Reply-To" content="anyeseong34@gmail.com" />
        <meta http-equiv="Email" content="anyeseong34@gmail.com" />
        <meta
          name="naver-site-verification"
          content="2e101387f0b84083998fc732518bcff395bbf211"
        />
        <meta
          name="google-site-verification"
          content="9uyD9o32V55EODSQUiQcY-pi4YOjA7VG6M6sPg-lsp8"
        />
        <meta name="og:site_name" content="만덕중 시간표" />
        <meta name="og:title" content="만덕중학교 시간표" />
        <meta name="og:description" content="만덕중학교 시간표입니다." />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://mdms.bssm.kro.kr" />
        <meta name="og:image" />
      </Helmet>

      <div className="title">
        <div className="title-size">
          MDMS {selectedGrade}-{selectedClass} 시간표
        </div>

        <div className="class">
          <span id="class-text">학급 : </span>
          {selectMenuClass()}
        </div>
      </div>

      <div>{renderDayData()}</div>

      <div>
        <hr />
        <div>
          <div className="info">
            <div>Developer</div>
            <div>안예성</div>
            <div>Info</div>
          </div>

          <div className="link">
            <a
              href="https://www.instagram.com/an.ys_34/"
              target="_blank"
              rel="noreferrer"
            >
              <img className="insta" src={instagram} alt=""></img>
            </a>
            <div className="line"></div>
            <a
              href="https://github.com/anys34"
              target="_blank"
              rel="noreferrer"
            >
              <img className="github" src={github} alt=""></img>
            </a>
          </div>

          <div className="last-text">
            <div>@2023 MDMS-TimeTalbe from</div>
            <div className="anys">
              <img src={anys} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
