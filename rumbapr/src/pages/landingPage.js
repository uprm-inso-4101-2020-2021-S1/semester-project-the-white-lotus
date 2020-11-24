import React, {Component, useEffect, useState} from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, DirectionsRenderer} from "react-google-maps";
import {NavLink} from 'react-router-dom';
import Popup from 'reactjs-popup';
import Button from 'react-bootstrap/Button';
import Header from '../components/header/Header';
import BurgerMenu from '../components/HamburgerMenu';
import './landingPage.css'
import * as data from '../dummy data/data.json';
import mapStyles from './mapStyle';
import 'reactjs-popup/dist/index.css';

let message = ``;
let count = 0;

class DirectionRender extends Component {
    state = {
        directions: null,
        error: null,
    }

    componentDidMount() {
        const {currentPosition, destinationLat, destinationLng} = this.props;

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
                    this.setState({error: result});
                }
            }
        );
    }

    render() {
        if (this.state.error) {
            return <h1>{this.state.error}</h1>
        }
        return (this.state.directions && <DirectionsRenderer directions={this.state.directions}/>)
    }
}


export const Map = () => {
    const [currentPosition, setCurrentPosition] = useState({});
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [appState, setAppState] = useState({locations: []});


    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    useEffect(() => {
        const apiUrl = 'http://localhost:5000/api/v2/place/all/';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((tests) => setAppState({locations: tests}))

    }, [count]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    })


    return (
        <GoogleMap
            defaultZoom={10.55}
            defaultCenter={{lat: 18.220833, lng: -66.590200}}
            //center= {new window.google.maps.LatLng(currentPosition.lat, currentPosition.lng)} // this works but fucks with the centering of the directions
            defaultOptions={{
                streetViewControl: false,
                draggable: true, // make map draggable
                zoomControlOptions: {position: 9},
                keyboardShortcuts: false, // disable keyboard shortcuts
                scaleControl: true, // allow scale control
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

            {appState.locations.map((location) => ( // for(appState: location)
                (location.category === "Nature" &&
                    <Marker
                        position={{lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)}}
                        onClick={() => {
                            setSelectedLocation(null)
                            setSelectedLocation(location)
                        }}
                        icon={{
                            url: "/images/beachLocation.png",
                            scaledSize: new window.google.maps.Size(50, 50),
                        }}/>
                    || location.category === "Hotel" &&
                    <Marker
                        position={{lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)}}
                        onClick={() => {
                            setSelectedLocation(null)
                            setSelectedLocation(location)
                        }}
                        icon={{
                            url: "/images/hotelLocation.png",
                            scaledSize: new window.google.maps.Size(50, 50),
                        }}/>
                        || location.category === "Food/Drinks" &&
                    <Marker
                        position={{lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)}}
                        onClick={() => {
                            setSelectedLocation(null)
                            setSelectedLocation(location)
                        }}
                        icon={{
                            url: "/images/foodLocation.png",
                            scaledSize: new window.google.maps.Size(50, 50),
                        }}/>

                )
            ))};

            {selectedLocation && (
                <DirectionRender currentPosition={currentPosition}
                                 destinationLat={parseFloat(selectedLocation.latitude)}
                                 destinationLng={parseFloat(selectedLocation.longitude)}
                />

            )}
        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));


export class MapContainer extends Component {

    onCreateEntry = () => {
        let info = {
            name: this.refs.name.value,
            email: this.refs.email.value,
            longitude: this.refs.longitude.value,
            latitude: this.refs.latitude.value,
            address: this.refs.address.value,
            city: this.refs.city.value,
            country: this.refs.country.value,
            mood: [],
            comments: [],
            hashtags: [],
            ambience: [],
            maximumPrice: " ",
            minimumPrice: " ",
            phone: " ",
            category: this.refs.category.value,
        };

        fetch('http://localhost:5000/api/v2/place/new/', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(info)
        }).then(r => r.json().then(res => {
            if (res) {
                message = 'Added!';
                count++;
            }
        }))
    }

    render() {
        return (
            <div className="landing_container">
                <div className="header_container">
                    <Header></Header>
                </div>
                <div className="map_container" style={{width: '94vm', height: '94vh'}}>
                    <WrappedMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCA2ZMGjdPdwHx6FLSnu0d2Nro6OoukJOA`}
                        loadingElement={<div style={{height: "100%"}}/>}
                        containerElement={<div style={{height: "100%"}}/>}
                        mapElement={<div style={{height: "100%"}}/>}
                    />
                </div>
                <BurgerMenu/>
                <Popup
                    trigger={
                        <Button variant="dark" className="top_button" type="button">
                            Try Out Adding
                        </Button>
                    }
                    position={['top center', 'bottom right', 'bottom left']}
                    closeOnDocumentClick
                >
                    <p>Please enter the place details</p>
                    <p><label>Name: </label><input type="text" ref="name"/></p>
                    <p><label>Email: </label><input type="text" ref="email"/></p>
                    <p><label>Latitude: </label><input type="text" ref="latitude"/></p>
                    <p><label>Longitude: </label><input type="text" ref="longitude"/></p>
                    <p><label>Address: </label><input type="text" ref="address"/></p>
                    <p><label>City: </label><input type="text" ref="city"/></p>
                    <p><label>Country: </label><input type="text" ref="country"/></p>
                    <p><label>Category: </label><input type="text" ref="category"/></p>
                    <Button variant="secondary" onClick={this.onCreateEntry}>Enter</Button>
                    <p>{message}</p>
                </Popup>
                <Button variant="dark" className="for_you_page"><NavLink className="nav_link" to="/foryou">For
                    You</NavLink></Button>
            </div>
        );
    }
}

export default MapContainer;