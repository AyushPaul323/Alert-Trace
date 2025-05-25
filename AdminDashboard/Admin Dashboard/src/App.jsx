import React from 'react';
import './App.css';
import Member from './pages/member';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Member />
        </Router>
    );
}

export default App;

