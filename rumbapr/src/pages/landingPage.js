import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const landingPage = () => {
    return(
        <div>
            <h1>Landing Page</h1>
            <p>Something something</p>
            <Button variant="secondary"><NavLink to="/foryou">For you</NavLink></Button>
        </div>
    )
}

export default landingPage;