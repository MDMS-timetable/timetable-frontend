import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';

//Components
import expend from '../img/expend.svg';
import mdms from '../img/mdms_logo.svg';
import Footer from '../Components/Footer';

const TimeTable = () => {
    const [timeTableData, setTimeTableData] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [timer, setTimer] = useState('00:00:00');
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
        const storedGrade = localStorage.getItem('selectedGrade');
        const storedClass = localStorage.getItem('selectedClass');

        if (storedGrade && storedClass) {
            setSelectedGrade(storedGrade);
            setSelectedClass(storedClass);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedGrade', selectedGrade);
        localStorage.setItem('selectedClass', selectedClass);

        if (cancelToken.current) {
            cancelToken.current.cancel('Previous request canceled');
        }

        cancelToken.current = axios.CancelToken.source();

        if (selectedGrade && selectedClass) {
            axios
                .post('https://port-0-timetable-backend-kvmh2mlk183p67.sel4.cloudtype.app/viewtimetable', { grade: selectedGrade, class: selectedClass }, { cancelToken: cancelToken.current.token })
                .then((response) => {
                    setTimeTableData(response.data);
                })
                .catch((error) => {
                    if (axios.isCancel(error)) {
                        console.log('Request canceled', error.message);
                    } else {
                        console.log(error);
                    }
                });
        }

        axios
            .get('https://port-0-timetable-backend-kvmh2mlk183p67.sel4.cloudtype.app/schedule')
            .then((response) => {
                let newData = response.data.map((item) => item.split('('));
                setScheduleData(newData);
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error.message);
                } else {
                    console.log(error);
                }
            });

        return () => {
            cancelToken.current.cancel('Cleanup on unmount');
        };
    }, [selectedGrade, selectedClass]);

    const currentTimer = () => {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const todayMonth = String(date.getMonth() + 1);
        const todayDate = String(date.getDate());
        setTimer(`${todayMonth}월${todayDate}일   ${hours}:${minutes}:${seconds}`);
    };

    const startTimer = () => {
        setInterval(currentTimer, 1000);
    };

    startTimer();

    const selectMenuClass = () => {
        return (
            <div className='Dropdown_Menu' ref={dropdownRef}>
                <div className='Dropdown_header' onClick={handleHeaderClick}>
                    <div className='Dropdown_text'>
                        <div>
                            {selectedGrade && selectedClass ? `${selectedGrade} - ${selectedClass}` : '선택'}
                            <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 35 28' fill='none'>
                                <path
                                    d='M0.971201 1.53474C0.549854 0.868905 1.02827 0 1.81622 0H33.2077C33.9906 0 34.4698 0.858978 34.0587 1.52521L18.5591 26.6384C18.171 27.2673 17.2583 27.2724 16.8631 26.6479L0.971201 1.53474Z'
                                    fill='black'
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <ul className='Dropdown_list'>
                        <li className='Dropdown_item' onClick={() => handleSelectChange('11')}>
                            1 - 1
                        </li>
                        <li className='Dropdown_item' onClick={() => handleSelectChange('12')}>
                            1 - 2
                        </li>
                        <li className='Dropdown_item' onClick={() => handleSelectChange('13')}>
                            1 - 3
                        </li>
                        <li className='Dropdown_item' onClick={() => handleSelectChange('14')}>
                            1 - 4
                        </li>
                        <li className='Dropdown_item' onClick={() => handleSelectChange('14')}>
                            1 - 5
                        </li>
                        <li className='Dropdown_item' onClick={() => handleSelectChange('27')}>
                            2 - 1
                        </li>
                        <li className='Dropdown_item' onClick={() => handleSelectChange('27')}>
                            2 - 2
                        </li>
                        <li className='Dropdown_item' onClick={() => handleSelectChange('27')}>
                            2 - 3
                        </li>
                        <li className='Dropdown_item' onClick={() => handleSelectChange('27')}>
                            2 - 4
                        </li>
                        <li className='Dropdown_item' onClick={() => handleSelectChange('27')}>
                            2 - 5
                        </li>
                        <li className='Dropdown_item' onClick={() => handleSelectChange('27')}>
                            2 - 6
                        </li>
                        <li className='Dropdown_item' onClick={() => handleSelectChange('27')}>
                            2 - 7
                        </li>
                        <li className='Dropdown_item' onClick={() => handleSelectChange('31')}>
                            3 - 1
                        </li>
                        <li className='Dropdown_item' onClick={() => handleSelectChange('32')}>
                            3 - 2
                        </li>
                        <li className='Dropdown_item' onClick={() => handleSelectChange('33')}>
                            3 - 3
                        </li>
                        <li className='Dropdown_item' onClick={() => handleSelectChange('34')}>
                            3 - 4
                        </li>
                        <li className='Dropdown_item' onClick={() => handleSelectChange('35')}>
                            3 - 5
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
                <table className='schedule-table'>
                    <thead>
                        <tr className='th-color'>
                            <th id='th-period'>교시</th>
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
                                <td className='period'>
                                    <p>{scheduleData[classTime][0]}</p>
                                    <p className='period-last-child'>{'(' + scheduleData[classTime][1]}</p>
                                </td>
                                {[0, 1, 2, 3, 4].map((weekday, index) => (
                                    <td key={index}>
                                        {timeTableData[weekday].map((schedule, index) => {
                                            if (schedule.classTime === classTime + 1) {
                                                return (
                                                    <div key={index} className='schedule-item'>
                                                        <div>{schedule.subject}</div>
                                                        <div id='teacher'>{schedule.teacher}</div>
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
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleHeaderClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='TimeTable_Container'>
            <Helmet>
                <link rel='icon' href={mdms} />
                <meta name='description' content='만덕중학교 시간표를 확인할 수 있습니다.' />
                <meta name='keywords' content='시간표, 만덕중학교, 만덕중학교 시간표, 만중 시간표, 만덕중 시간표, 만덕중' />
                <meta name='author' content='An Ye Seong' />
                <meta name='robots' content='index, follow' />
                <meta http-equiv='Subject' content='시간표' />
                <meta http-equiv='Generator' content='Visual Studio Code' />
                <meta http-equiv='Reply-To' content='anyeseong34@gmail.com' />
                <meta http-equiv='Email' content='anyeseong34@gmail.com' />
                <meta name='google-site-verification' content='9uyD9o32V55EODSQUiQcY-pi4YOjA7VG6M6sPg-lsp8' />
                <meta name='og:site_name' content='만덕중 시간표' />
                <meta name='og:title' content='만덕중 시간표' />
                <meta name='og:description' content='만덕중학교 시간표를 확인할 수 있습니다.' />
                <meta name='og:type' content='website' />
                <meta name='og:url' content='https://mdms.bssm.kro.kr' />
                <meta name='og:image' content={mdms} />
            </Helmet>

            <div className='Main_Header'>
                <span id='Header_School'>만덕중</span>
                <div id='DropMenu'>{selectMenuClass()}</div>
                {/*<span>{timer}</span>*/}
            </div>

            <div>{renderDayData()}</div>
        </div>
    );
};

export default TimeTable;
