import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './Style.scss';

//Components
import TimeTable from './Pages/TimeTable';
import Lunch from './Pages/Lunch';
import Footer from './Components/Footer';

const App = () => {
    return (
        <Routes>
            <Route path='/' Component={TimeTable} />
            <Route path='/lunch' Component={Lunch} />
            <Route path='/info' Component={Footer} />
        </Routes>
    );
};

export default App;
