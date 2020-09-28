import React from 'react';
import { NavLink } from 'react-router-dom'

const forYouPage = () => {
    return(
        <div>
            <h1>For You</h1>
            <p>Something something</p>
            <button><NavLink to="/">Home</NavLink></button>
        </div>
    )
}

export default forYouPage;