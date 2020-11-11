import React from 'react';
import Header from '../components/header/Header';
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import './about.css';

const about = () => {
    return(
        <div className="for_container">
            <div className="header_container">
                <Header />
                <h1>The White Lotus</h1>
                <p>Members:</p>
                <div>
                    <p>M.Alejandra</p>
                    <p>Fher</p>
                    <p>Héctor</p>
                    <p>Jean</p>
                    <p>Diego</p>
                    <p>Jomar</p>
                    <p>Alondra</p>
                </div>
            </div>
        </div>
    )
}

export default about;

