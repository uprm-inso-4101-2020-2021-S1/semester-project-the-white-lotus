import React, { Component, useEffect, useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, DirectionsRenderer } from "react-google-maps";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Header from '../components/header/Header'
import BurgerMenu from '../components/HamburgerMenu'
import './landingPage.css'
import * as data from '../dummy data/data.json';
import mapStyles from './mapStyle';

let message = ``;
let count = 0;

class DirectionRender extends Component {
    state = {
        directions: null,
        error: null,
    }

    componentDidMount() {
        const { currentPosition, destinationLat, destinationLng } = this.props;

        const destinationPosition = {
            lat: destinationLat,
            lng: destinationLng
        }
        var directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
            {
                origin: currentPosition,
                destination: destinationPosition,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } else {
                    this.setState({ error: result });
                }
            }
        );
    }

    render() {
        if (this.state.error) {
            return <h1>{this.state.error}</h1>
        }
        return (this.state.directions && <DirectionsRenderer directions={this.state.directions} />)
    }
}


export const Map = () => {
    const [currentPosition, setCurrentPosition] = useState({});
    const [selectedLocation, setSelectedLocation] = useState(null);


    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    useEffect( () => {
        const apiUrl = 'http://localhost:5000/api/v2/posts';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => console.log('This is your data', data));
    }, [count])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    })


    return (
        <GoogleMap
            defaultZoom={10.55}
            defaultCenter={{ lat: 18.220833, lng: -66.590200 }}
            // center= {new window.google.maps.LatLng(currentPosition.lat, currentPosition.lng)} // this works but fucks with the centering of the directions
            defaultOptions={{
                streetViewControl: false,
                draggable: true, // make map draggable
                zoomControlOptions: { position: 9 },
                keyboardShortcuts: false, // disable keyboard shortcuts
                scaleControl: true, // allow scale controle
                scrollwheel: true, // allow scroll wheel
                styles: mapStyles, // changes the styling of the map
                mapTypeControl: false, // hides the type of type of maps at the top

            }}
        >
            <Marker
                position={currentPosition}
                icon={{
                    url: "/images/personLocation.png",
                    scaledSize: new window.google.maps.Size(50, 50),
                }}
            />
            {data.features.map((location) => (
                (location.properties.NOTES === "Beaches" &&
                    <Marker key={location.properties.LOCATION_ID}
                        onClick={() => {
                            setSelectedLocation(null);
                            setSelectedLocation(location);
                        }}
                        position={{ lat: location.geometry.coordinates[0], lng: location.geometry.coordinates[1] }}
                        icon={{
                            url: "/images/beachLocation.png",
                            scaledSize: new window.google.maps.Size(50, 50),
                        }}
                    />
                || location.properties.NOTES === "Hotels" &&
                    <Marker key={location.properties.LOCATION_ID}
                        onClick={() => {
                            setSelectedLocation(null);
                            setSelectedLocation(location);
                        }}
                        position={{ lat: location.geometry.coordinates[0], lng: location.geometry.coordinates[1] }}
                        icon={{
                            url: "/images/hotelLocation.png",
                            scaledSize: new window.google.maps.Size(50, 50),
                        }}
                    />
                )
            ))}
            {selectedLocation && (
                <DirectionRender currentPosition={currentPosition}
                    destinationLat={selectedLocation.geometry.coordinates[0]}
                    destinationLng={selectedLocation.geometry.coordinates[1]}
                />

            )}
        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));


export class MapContainer extends Component {

    onCreateEntry = () => {
        let info = {
            title: this.refs.title.value,
            content: this.refs.content.value
        };

        fetch('http://localhost:5000/api/v2/posts', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(info)
        }).then(r=> r.json().then(res=> {
            if(res) {
                message = 'Added!';
                count++;
            }
        }))
    }

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
                <Popup
                    trigger={
                        <button type="button" className="button">
                            Try Out Adding
                        </button>
                    }
                    position={['top center', 'bottom right', 'bottom left']}
                    closeOnDocumentClick
                >
                    <p>Please enter the place details</p>
                    <p><label>Title: </label><input type="text" ref="title" /></p>
                    <p><label>Content: </label><input type="text" ref="content" /></p>
                    <button onClick={this.onCreateEntry}>Done</button>
                    <p>{message}</p>
                </Popup>

            </div>
        );
    }
}

export default MapContainer;