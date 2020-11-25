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

const getLocations = dataSet => {
    let content =[];
    for(let i = 0; i < 12; i++){
         const item = dataSet[i];
         content.push(
             <Flippy flipOnHover={true}
                              flipDirection='vertical'
                              style={FlippyStyle}>
                 <DefaultCardContents>
                     I flip verticaly on hover
                 </DefaultCardContents>
            </Flippy>)
    }
    return content;
}

const FlippyOnHover = () => {
    const [dataSet, setDataSet] = useState({locations: []});


    useEffect(() => {
        const apiUrl = 'http://localhost:5000/api/v2/place/all/';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((databaseInfo) => setDataSet({locations: databaseInfo}))

    }, []);
    return (
        getLocations(dataSet)
    )};


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