import React from "react";
import { useState } from 'react';
// import ReactDOM from 'react-dom/client';
// import reportWebVitals from './reportWebVitals';
import Sidebar from '../layout/Sidebar/Sidebar';
import Content from '../layout/Content/Content';
// import './admin.css'

function Admin(){
    const [tt, setT] = useState(0);
    const main = (tab) => {
        setT(tab);
    }
    return(
        <div className="app">
                <Sidebar main={main} />
                <Content main={tt} />
                </div>
     );
 }
 export default Admin;