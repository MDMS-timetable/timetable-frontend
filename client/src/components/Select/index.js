import React from 'react';

const Select = ({setSelectedClass,setSelectedGrade,selectedClass,selectedGrade}) => {




  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedGrade = selectedValue.slice(0, 1);
    const selectedClass = selectedValue.slice(1, 2);

    setSelectedGrade(selectedGrade);
    setSelectedClass(selectedClass);
  };

  return (
    <>
      <label htmlFor="mySelect">Select an option: </label>
      <select id="mySelect" onChange={handleSelectChange} value={selectedGrade + selectedClass}>
        <option value="11">1-1</option>
        <option value="12">1-2</option>
        <option value="13">1-3</option>
        <option value="14">1-4</option>
        <option value="15">1-5</option>
        <option value="21">2-1</option>
        <option value="22">2-2</option>
        <option value="23">2-3</option>
        <option value="24">2-4</option>
        <option value="25">2-5</option>
        <option value="31">3-1</option>
        <option value="32">3-2</option>
        <option value="33">3-3</option>
        <option value="34">3-4</option>
        <option value="35">3-5</option>
      </select>
      <p>Selected grade: {selectedGrade}</p>
      <p>Selected class: {selectedClass}</p>
    </>
  );
};

export default Select;