import React from 'react';
import Header from '../components/header/Header';
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import './forYouPage.css';
import SimpleSlide from '../components/carousel/ForYourCar.js'

const forYouPage = () => {
    return(
        <div className="for_container">
            <div className="header_container">
                <Header />
            </div>
                <MDBContainer className="mt-3">
                        <SimpleSlide/>
                    <p />
                        <SimpleSlide/>
                    <p />
                        <SimpleSlide/>
                    <p />
                        <SimpleSlide/>
                </MDBContainer>
        </div>
    )
}

export default forYouPage;