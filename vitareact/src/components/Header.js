import React, {useState} from 'react'
import '../components/css/header.css'
import {Link, useHistory} from 'react-router-dom'

function Header() {

    let history = useHistory();
    const [data, setData] = useState({search: ''});

    const handleChange = (e) => {
        // update state from value of input 
        setData({
            ...data,
            search: e.target.value
        })
    }

    const handleSubmit = (e) => {
        console.log(data);
        history.push({
            pathname: `/search/`,
            search: `?search=${data.search}`
        });
        // reload is necessary to tell browser 
        // we have arrived to this page 
        window.location.reload();
    }

    return (
        <div className="topnav">
            <Link 
                className='active'
                to="/"
                color="textPrimary"
            >
                Home
            </Link>
            <Link 
                to="/register"
            >
                Register
            </Link>
            <Link 
                to="/login"
            >
                Login
            </Link>
            <Link 
                to="/logout"
            >
                Logout
            </Link>

            <div id='search-container'>
                <input 
                    id='searchbox'
                    type='text' 
                    name='searchbox' 
                    onChange={handleChange}
                    placeholder='Search Posts'
                />
                <button 
                    id='submit'
                    type='submit'
                    onClick={handleSubmit}
                >
                    Serach
                </button>
            </div>
        </div>
    );
}
    
export default Header
    