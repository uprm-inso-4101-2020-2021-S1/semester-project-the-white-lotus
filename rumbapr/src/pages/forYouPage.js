import React from 'react';
import { NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const forYouPage = () => {
    return(
        <div>
            <h1>For You</h1>
            <p>Something something</p>
            <Button><NavLink to="/">Home</NavLink></Button>
        </div>
    )
}

export default forYouPage;