import React, {Component, useEffect, useState} from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, DirectionsRenderer} from "react-google-maps";
import {NavLink} from 'react-router-dom';
import Popup from 'reactjs-popup';
import Button from 'react-bootstrap/Button';
import Header from '../components/header/Header';
import BurgerMenu from '../components/HamburgerMenu';
import './landingPage.css'
import mapStyles from './mapStyle';
import 'reactjs-popup/dist/index.css';

let message = ``;


class DirectionRender extends Component {
    state = {
        directions: "",
        error: "",
    }

    componentDidMount() {

        const {currentPosition, destinationLat, destinationLng} = this.props;

        const destinationPosition = {
            lat: destinationLat,
            lng: destinationLng
        }

        let directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
            {
                origin: currentPosition,
                destination: destinationPosition,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (this.state.directions != null) {
                    this.setState({
                        directions: null,
                    })
                }
                if (status === window.google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });

                } else {
                    this.setState({error: result});
                }
            }
        );

        const loggedInUser = localStorage.getItem("user");
        console.log("current user from loading page: " + loggedInUser);

        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            console.log("current user from loading page: " + foundUser);
            // setUser(foundUser);
        }
    }

    render() {
        if (this.state.error) {
            return <h1>{this.state.error}</h1>
        }
        return (this.state.directions && <DirectionsRenderer
            options={{
                suppressMarkers: true,
                hideRouteList: true,
            }}
            directions={this.state.directions}
        />)
    }
}


export const Map = () => {
    const [currentPosition, setCurrentPosition] = useState({});
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [dataSet, setDataSet] = useState({locations: []});


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
            .then((tests) => setDataSet({locations: tests}))

    }, []);

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

            {dataSet.locations.map((location) => (
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

    render() {
        return (
            <div className="landing_container">
                <div className="header_container">
                    <Header></Header>
                </div>
                <div className="map_container" style={{width: '94vm', height: '100vh'}}>
                    <WrappedMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCA2ZMGjdPdwHx6FLSnu0d2Nro6OoukJOA`}
                        loadingElement={<div style={{height: "100%"}}/>}
                        containerElement={<div style={{height: "100%"}}/>}
                        mapElement={<div style={{height: "100%"}}/>}
                    />
                </div>
                <BurgerMenu/>
                <NavLink className="nav_link" to="/foryou"><Button variant="dark" className="top_button">For
                    You</Button></NavLink>
            </div>
        );
    }
}

export default MapContainer;