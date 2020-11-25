import React from 'react';
import Header from '../components/header/Header';

const about = () => {
    return(
        <div>
            <Header />
            <body style={{backgroundColor: '#303639'}}>
                <br />
                <div className={"header"}>About Us</div>
                    <br />
                    <div style={{marginLeft:'28px', fontSize: '20px', textAlign: 'center'}}>
                        <p>
                            The White Lotus team was formed in August 2020 as part of a software design project for the
                            course “Introduction to Software”, led  by Prof. Marko Schütz from the University of Puerto Rico
                            at Mayagüez. This application is the result of the efforts of seven computer and software
                            engineering students from all over Puerto Rico seeking to contribute to their country by promoting
                            internal tourism.
                            <br />
                        </p>
                        <br />
                    </div>
            </body>
        </div>
    )
}

export default about;