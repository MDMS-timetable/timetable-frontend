import React from "react";
import './Style.scss';

//Components
import Footer from "./Components/Footer";
import TimeTable from "./Pages/TimeTable";

const App = () => {
  return (
    <div>
      <TimeTable/>
      <Footer/>
    </div>
  );
}

export default App;
