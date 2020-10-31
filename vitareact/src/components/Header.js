import React, {useState, useRef} from 'react';
import style from './css/header.module.css';
import {Link, useHistory} from 'react-router-dom';
import checkLoggedIn from '../components/auth/checkLoggedIn';
import checkAdminLoggedIn from '../components/auth/checkAdminLoggedIn';
import logo from '../images/vita-log.png';

function Header() {
    const history = useHistory();
    const [burger, setBurger] = useState(true);
    const navbarRef = useRef(null);
    /* 
        toggle navbar burger click
    */
    const handleOpenNav = () => {
        let el = navbarRef.current;
        el.style.width = (el.style.width == '100%') ? '0' : '100%';
        setBurger(!burger);
    }
    /* 
        when width < 900px
    */
    const handlePageChange = () => {
        if(!burger) {
            handleOpenNav();
        }
    }
    /* 
        go home
    */
    const redirectHome = () => {
         history.push('/home');
    }

    return (
        <>
        <div className={style.header}>
            <img 
                className={style.logo}
                src={logo}
                onClick={redirectHome}
            />
            
            {/* burgur */}
            <span 
                className={style.openbtn}
                onClick={handleOpenNav}
            >
                {
                    (burger)
                    ? (<i className="fa fa-bars"></i>)
                    : (<i className="fa fa-times"></i>)
                }
            </span>

            <div className={style.navbar} ref={navbarRef}>
                <div className={style.navbarLinkContainer}>
                    
                    <Link to="/search">
                        <div className={style.navbarLink} onClick={handlePageChange}>
                            <span className={style.navItem}>
                                <i className={`fa fa-search ${style.icon}`}></i>
                                Search
                            </span>
                        </div>
                    </Link>

                    <Link to="/categories">
                        <div className={style.navbarLink} onClick={handlePageChange}>
                            <span className={style.navItem}>
                                <i className={`fa fa-film ${style.icon}`}></i>
                                Categories
                            </span>
                        </div>
                    </Link>

                    <Link to="/subscribe">
                        <div className={style.navbarLink} onClick={handlePageChange}>
                            <span className={style.navItem}>
                                <i className={`fa fa-star-o ${style.icon}`}></i>
                                Subscribe
                            </span>
                        </div>
                    </Link>
                    
                    {
                        (checkLoggedIn())
                        ? (
                            <>
                            <div className={style.navbarLink} onClick={handlePageChange}>
                                {
                                    (checkAdminLoggedIn())
                                    ? (
                                        <Link to="/admin">
                                            <span className={style.navItem}>
                                                <i className={`fa fa-user-cog ${style.icon}`}></i>
                                                Admin
                                            </span>
                                        </Link>
                                    ): (
                                        <Link to="/profile">
                                            <span className={style.navItem}>
                                                <i className={`fa fa-user ${style.icon}`}></i>
                                                Profile
                                            </span>
                                        </Link>
                                    ) 
                                }
                            </div>
                                
                            <Link to="/logout">
                                <div className={style.navbarLink} onClick={handlePageChange}>
                                    <span className={style.navItem}>
                                        Logout
                                    </span>
                                </div>
                            </Link>
                            </>
                        ) : (
                            <Link to="/login">
                                <div className={style.navbarLink} onClick={handlePageChange}>
                                    <span className={style.navItem}>
                                        Login
                                    </span>
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
        <div className={style.mainContent}>
        #
        </div>
        </>

        // <div className="topnav">
        //     <Link 
        //         className='active'
        //         to="/"
        //         color="textPrimary"
        //     >
        //         Home
        //     </Link>
            
        //     {/* login, logout, register */}
        //     <AuthControl />

        // </div>
    );
}
    
export default Header
    