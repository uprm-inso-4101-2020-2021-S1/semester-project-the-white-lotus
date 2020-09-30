import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import HamburgerMenu from '../components/HamburgerMenu/HamburgerMenu';


const landingPage = () => {
    return(
        <div>
            <HamburgerMenu />
            <h1>Landing Page</h1>
            <p>Something something</p>
            <Button variant="secondary"><NavLink to="/foryou">For you</NavLink></Button>
        </div>
    )
}

export default landingPage;