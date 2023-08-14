import React from "react";

const Meal = ({ meal }) => {
  console.log(meal);
  let kcalColor = "";
  let kcal_num = 0;
  let menu_list = ["정보가 없습니다"];

  if (meal) {
    kcal_num = Number(meal.calorie.replace(" Kcal", ""));
    menu_list = meal.lunch.split(" ");

    if (kcal_num >= 900) {
      kcalColor = "red";
    } else if (kcal_num >= 800) {
      kcalColor = "yellow";
    } else {
      kcalColor = "green";
    }
  }

  return (
    <div className={`lunchBox`}>
      {/* 요일, 칼로리 */}
      <div className={`${kcalColor} dayandKcal`}>
        <span>
          {Number(meal ? meal.date.month : 0)}월{" "}
          {Number(meal ? meal.date.day : 0)}일{" "} 
        </span>
        <span>{meal ? meal.calorie : "0 kcal"}</span>
      </div>
      <div className={"menu_container"}>
        <div className={"menu"}>
          {menu_list.map((item, index) => <p key={index}>{item}</p>)}
        </div>
      </div>
    </div>
  );
};

export default Meal;
