import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './Style.scss';

//Components
import TimeTable from './Pages/TimeTable';
import Lunch from './Pages/Lunch';

const App = () => {
    return (
        <Routes>
            <Route path='/' Component={TimeTable} />
            <Route path='/lunch' Component={Lunch} />
        </Routes>
    );
};

export default App;
