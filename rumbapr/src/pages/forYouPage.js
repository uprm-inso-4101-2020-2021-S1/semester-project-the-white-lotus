import React, {useEffect, useState} from 'react';
import Header from '../components/header/Header';
import './forYouPage.css';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import {GoogleMap, Marker} from "react-google-maps";

const FlippyStyle = {
    width: '380px',
    height: '280px',
    textAlign: 'center',
    color: '#FFF',
    fontSize: '30px',
    justifyContent: 'center'
}


const DefaultCardContents = ({ children, image, name, ambiance1, ambiance2, email, phone, address, category}) => (
    <React.Fragment>
        <FrontSide
            style={{
                backgroundColor: '#41669d',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            <img
                src="https://thumbs.dreamstime.com/b/charming-beautiful-waterfall-selfoss-iceland-rainbow-exotic-countries-amazing-places-popular-tourist-atraction-154603711.jpg"
                style={{ maxWidth: '100%', maxHeight: '90%' }}
            />
            <span
                style={{
                    fontSize:'13px',
                    position: 'absolute',
                    bottom: '10px',
                    width: '100%'
                }}>
                <div className="flippy_front">
                <b>Name: </b>{name}<br/>
                <b>Ambiance: </b>{ambiance1}, {ambiance2}
                </div>
            </span>
        </FrontSide>
        <BackSide
            style={{
                backgroundColor: '#175852',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
            <span
                style={{
                    fontSize:'12px',
                    position: 'absolute',
                    top: '10px',
                    width: '100%'
                }}>
                <div className="flippy_front">
                    <b>Email: </b>{email}<br/>
                    <b>Phone: </b>{phone}<br/>
                    <b>Address: </b>{address}<br/>
                    <b>Category: </b>{category}<br/>
                </div>
      </span>
        </BackSide>
    </React.Fragment>);



export const FlippyOnHover = () => {
   let [dataSet, setDataSet] = useState({locations:[]})


    useEffect(() => {
        const apiUrl = 'http://localhost:5000/api/v2/place/all/';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((test) => setDataSet({locations: test}))

    }, []);


   return(
       <div className="for_container">
       <div className="card_container">
           {dataSet.locations.map((location, index) => (
                (index < 12 &&
                    <Flippy
                        flipOnClick={true}
                        flipDirection='vertical'
                        style={FlippyStyle}>
                        <DefaultCardContents name={location.name} ambiance1={location.ambience[0]} ambiance2={location.ambience[1]} email={location.email} phone={location.phone}
                        address={location.address} category={location.category}>
                            I flip and this is a check
                        </DefaultCardContents>
                    </Flippy>
        )
    ))}
       </div>
       </div>
    )
};


const ForYouPage = () => {
    return(
        <div>
            <div className="header_container">
                <Header />
            </div>
            <div className="row for_container" style={{padding: '25px'}}>
                <FlippyOnHover/>
            </div>
        </div>
    )
}

export default ForYouPage;