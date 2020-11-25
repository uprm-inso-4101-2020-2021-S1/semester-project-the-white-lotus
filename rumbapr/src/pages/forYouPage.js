import React, {useEffect, useState} from 'react';
import Header from '../components/header/Header';
import './forYouPage.css';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

const FlippyStyle = {
    width: '380px',
    height: '280px',
    textAlign: 'center',
    color: '#FFF',
    fontSize: '30px',
    justifyContent: 'center'
}


const DefaultCardContents = ({ children, image, name, ambiance, about}) => (
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
                style={{ maxWidth: '95%', maxHeight: '95%' }}
            />
            <span
                style={{
                    fontSize:'12px',
                    position: 'absolute',
                    bottom: '10px',
                    width: '100%'
                }}>
        {children}<br />
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
            ROCKS
            <span
                style={{
                    fontSize:'12px',
                    position: 'absolute',
                    bottom: '10px',
                    width: '100%'
                }}>
        {children}<br />
        (BACK SIDE)
      </span>
        </BackSide>
    </React.Fragment>);

const FlippyOnHover = ({ flipDirection = 'vertical' }) => {
    const [dataSet, setDataSet] = useState({locations: []});

    useEffect(() => {
        const apiUrl = 'http://localhost:5000/api/v2/place/all/';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((databaseInfo) => setDataSet({locations: databaseInfo}))

    }, []);
    return (
    <Flippy
        flipOnHover={true}
        flipDirection={flipDirection}
        style={FlippyStyle}
    >
        <DefaultCardContents>
            I flip {flipDirection}ly on hover
        </DefaultCardContents>
    </Flippy>
    )};


const ForYouPage = () => {
    return(
        <div>
            <div className="header_container">
                <Header />
            </div>
            <div className="row for_container" style={{padding: '25px'}}>
                <FlippyOnHover/>
                <FlippyOnHover/>
                <FlippyOnHover/>
                <FlippyOnHover/>
                <FlippyOnHover/>
                <FlippyOnHover/>
                <FlippyOnHover/>
                <FlippyOnHover/>
                <FlippyOnHover/>
                <FlippyOnHover/>
                <FlippyOnHover/>
                <FlippyOnHover/>
                <FlippyOnHover/>
                <FlippyOnHover/>
                <FlippyOnHover/>
                <FlippyOnHover/>
                <FlippyOnHover/>
                <FlippyOnHover/>
            </div>
        </div>
    )
}

export default ForYouPage;