import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './Style.scss';

//Components
import TimeTable from './Pages/TimeTable';
import Lunch from './Pages/Lunch';
import Info from './Pages/Info';
import Footer from './Components/Footer';

const App = () => {
    return (
        <Routes>
            <Route path='/' Component={Footer} />
            <Route path='/lunch' Component={Lunch} />
            <Route path='/info' Component={Info} />
        </Routes>
    );
};

export default App;
