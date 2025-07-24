import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { Header } from './component/header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './component/home/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Aboutus from './pages/aboutus/aboutus';
import Contactus from './pages/contactus/contactus';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
 <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<Contactus/>} />
       
        

      </Routes>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
