import React from 'react';
import Header from '../components/header/Header';
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";

const forYouPage = () => {
    return(
        <div className="for_you_container">
            <div className="header_container">
                <Header />
            </div>
                <MDBContainer className="container_cards">
                    <MDBRow>
                        <MDBCol md="3">
                            <MDBView hover>
                                <img src="https://mdbootstrap.com/img/Others/documentation/forest-sm-mini.jpg"
                                     className="img-fluid"
                                     alt=""
                                />
                                <MDBMask className="flex-center" overlay="teal-light">
                                    <p className="white-text">Testing</p>
                                </MDBMask>
                            </MDBView>
                        </MDBCol>
                        <MDBCol md="3">
                            <MDBView hover>
                                <img src="https://mdbootstrap.com/img/Others/documentation/forest-sm-mini.jpg"
                                     className="img-fluid"
                                     alt=""
                                />
                                <MDBMask className="flex-center" overlay="teal-light">
                                    <p className="white-text">Testing</p>
                                </MDBMask>
                            </MDBView>
                        </MDBCol>
                        <MDBCol md="3">
                            <MDBView hover>
                                <img src="https://mdbootstrap.com/img/Others/documentation/forest-sm-mini.jpg"
                                     className="img-fluid"
                                     alt=""
                                />
                                <MDBMask className="flex-center" overlay="teal-light">
                                    <p className="white-text">Testing</p>
                                </MDBMask>
                            </MDBView>
                        </MDBCol>
                        <MDBCol md="3">
                            <MDBView hover>
                                <img src="https://mdbootstrap.com/img/Others/documentation/forest-sm-mini.jpg"
                                     className="img-fluid"
                                     alt=""
                                />
                                <MDBMask className="flex-center" overlay="teal-light">
                                    <p className="white-text">Testing</p>
                                </MDBMask>
                            </MDBView>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
        </div>
    )
}

export default forYouPage;