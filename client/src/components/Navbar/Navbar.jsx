import React from 'react';
import {Link }from 'react-router-dom';

function Navbar() {
    return(
        <div className="landing-page-navbar">
            <h3>Chat App</h3>
            <ul>
                <li> 
                    <Link to="/login">
                        Login
                    </Link>
                </li>
                <li>
                    <Link to="/register">
                        Sign Up
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;