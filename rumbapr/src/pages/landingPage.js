import React, { Component, useEffect, useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import Header from '../components/header/Header'
import './landingPage.css'


export const Map = () => {
    const [currentPosition, setCurrentPosition] = useState({});

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
            defaultZoom={12}
            center={currentPosition}>
                <Marker 
                position={currentPosition} 
                icon={{
                    url: "/images/personLocation.png",
                    scaledSize: new window.google.maps.Size(50,50),
                }}
                />
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
                <div className="map_container" style={{ width: '75vm', height: '75vh' }}>
                    <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCA2ZMGjdPdwHx6FLSnu0d2Nro6OoukJOA`}
                        loadingElement={<div style={{ height: "100%" }} />}
                        containerElement={<div style={{ height: "100%" }} />}
                        mapElement={<div style={{ height: "100%" }} />}
                    />
                </div>
            </div>
        );
    }
}

export default MapContainer;