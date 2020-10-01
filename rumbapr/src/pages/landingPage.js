import React, { Component, useEffect, useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import Header from '../components/header/Header'
import BurgerMenu from '../components/HamburgerMenu'
import './landingPage.css'
import * as beachData from '../dummy data/beaches.json';


export const Map = () => {
    const [currentPosition, setCurrentPosition] = useState({});
    const [center, setCenter] = useState({lat: 18.220833, lng: -66.590200});
    

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    })


    return (
        <GoogleMap
            defaultZoom={10.55}
            defaultCenter={{lat: 18.220833, lng: -66.590200}}
        >
                <Marker 
                position={currentPosition} 
                icon={{
                    url: "/images/personLocation.png",
                    scaledSize: new window.google.maps.Size(50,50),
                }}
                />
                {beachData.features.map((beach) => (
                    <Marker key={beach.properties.BEACH_ID} 
                    position={{lat: beach.geometry.coordinates[0], lng: beach.geometry.coordinates[1]}}
                    icon={{
                        url: "/images/beachLocation.png",
                        scaledSize: new window.google.maps.Size(50,50),
                    }}
                    />
                ))}
        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));


export class MapContainer extends Component {
    render() {
        return (
            <div className="landing_container">
                <div className="header_container">
                    <Header ></Header>
                </div>
                <div className="map_container" style={{ width: '94vm', height: '94vh' }}>
                    <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCA2ZMGjdPdwHx6FLSnu0d2Nro6OoukJOA`}
                        loadingElement={<div style={{ height: "100%" }} />}
                        containerElement={<div style={{ height: "100%" }} />}
                        mapElement={<div style={{ height: "100%" }} />}
                    />
                </div>
                <BurgerMenu />
            </div>
        );
    }
}

export default MapContainer;