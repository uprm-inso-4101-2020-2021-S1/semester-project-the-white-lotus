import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from '../components/MapContainer'
import Header from '../components/header/Header'
import HamburgerMenu from '../components/HamburgerMenu'

import './landingPage.css'


const personLocation = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
const locations = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';


export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        return (
            <div className="landing_container">
                <div className="header_container">
                    <Header ></Header>
                </div>
                <div className="map_container">
                    <CurrentLocation
                        centerAroundCurrentLocation
                        google={this.props.google}
                    >
                        <Marker
                            onClick={this.onMarkerClick}
                            name={'Current Location'}
                            icon={personLocation}
                        />
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onClose}
                        >
                            <div>
                                <h4>{this.state.selectedPlace.name}</h4>
                            </div>
                        </InfoWindow>
                    </CurrentLocation>
                    <HamburgerMenu />
                </div>
            </div>
        );
    }
}


export default GoogleApiWrapper(
    (props) => ({
        apiKey: 'AIzaSyCA2ZMGjdPdwHx6FLSnu0d2Nro6OoukJOA'
    }
    ))(MapContainer)