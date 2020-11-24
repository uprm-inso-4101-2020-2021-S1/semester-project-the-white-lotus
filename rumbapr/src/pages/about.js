import React from 'react';
import Header from '../components/header/Header';
import './about.css';

const about = () => {
    return(
        <div className="about_container">
            <Header />
            <div className={"header"}>The White Lotus</div>
            <div style={{marginLeft:'28px'}}>
                <p>Something about us</p>
            </div>
        </div>
    )
}

export default about;