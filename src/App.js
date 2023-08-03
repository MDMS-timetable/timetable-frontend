import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './Style.scss';

//Components
import TimeTable from './Pages/TimeTable';
import Launch from './Pages/Launch';

const App = () => {
    return (
        <Routes>
            <Route path='/' Component={TimeTable} />
            <Route path='/launch' Component={Launch} />
        </Routes>
    );
};

export default App;
