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

var place = '';
var ambience = [];
var mood = [];
var category = []
var distance = 0;
var price = [];     //value at pos 0 is min and value at pos 1 is max

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
                if(this.state.directions != null) {
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

            {dataSet.locations.map((location) => ( // for(appState: location)
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
            mood: this.state.mood,
            comments: [],
            hashtags: [],
            ambience: this.state.ambience,
            price: this.state.price,// An array which pos 0 is min value and pos 1 is max value
            categoryFilter: this.state.category,
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
            }
        }))
    }
    
    constructor(props) {
        super(props);
        this.state = {
          place: 'Any',
          ambience: [],
          mood: [],
          category: [],
          distance: 20,
          price: [0,20]
    
        };
    
    
        // Binding method
        this.setPlace = this.setPlace.bind(this);
        this.setAmb = this.setAmb.bind(this);
        this.setMood = this.setMood.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.setDistance = this.setDistance.bind(this);
      }

      setPlace(e) {
        console.log("Place Selected!!");
        //this.setState({place:e})
        this.state.place=e
        place = e
        console.log(this.state.place)
      }
    
    
      setAmb(e) {
        console.log("Ambience Updated!!");
        this.state.ambience=e
        ambience = e
        console.log(this.state.ambience)
      }
    
      setMood(e) {
        console.log("Mood Updated!!");
        this.state.mood=e
        mood = e
        console.log(this.state.mood)
      }
    
      setCategory(e) {
        console.log("Category Updated!!");
        this.state.category=e
        category = e
        console.log(this.state.category)
      }
    
      setDistance(e) {
        console.log("Distance Updated!!");
        this.state.distance=e
        distance = e
        console.log(this.state.distance)
      }

      setPrice(e) {
          console.log("Price Updated!!");
          this.state.price=e
          price = e
          console.log(this.state.price)
      }

      //Starting funtion for setting distance and price values
      handleDistance = (event, newValue) => {
        this.setDistance(newValue);
      };

      value = [0,20]

      handlePrice = (event, newValue) => {
        this.setPrice(newValue);
        this.value = newValue
      };
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
                <BurgerMenu
                    setPlace ={this.setPlace}
                    setAmb ={this.setAmb}
                    setMood = {this.setMood}       
                    setCategory = {this.setCategory}        
                    setDistance = {this.handleDistance}   
                    setPrice = {this.handlePrice}     
                    //value = {this.value}
                />
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