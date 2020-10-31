import React from 'react';
import {Link} from 'react-router-dom';
import './components/css/homePage.css';
import logo from './images/vita-log.png';

function Home() {
    return (
        <div className="homeHero">
            <div className="homePageNav">
                <img className="vitaLogo" src={logo} alt="logo" />
                <Link to="/login">
                    <button className="homeBtn" type="button">Sign In</button>
                </Link>
            </div>
            <div className="homeContent">
                <h2 className="homeMessage">Welcome to Vita</h2>
                <h1 className="homeHeading">Entertainment</h1>
                <h1 className="homeHeading">Without Limits</h1>
                <h2 className="homeMessage bottomMessage">Wanna watch movies, then do it right</h2>    
            </div>
            <Link to="/register">
                <button className="homeBtn mainSignup" type="button">Start Now</button>
            </Link>
        </div>
    )
}

export default Home
