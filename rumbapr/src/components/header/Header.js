import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import { withRouter } from "react-router-dom";


class Header extends React.Component {
    state = {
        searchText: ""
    };

    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
    };

    handleSearchInput = event => {
        this.setState({
            searchText: event.target.value
        });
    };

    handleSearchSubmit = () => {
        if (this.state.searchText) {
            this.props.history.push({
                pathname: "/results",
                state: {
                    searchText: this.state.searchText
                }
            });
        } else {
            alert("Please enter some search text!");
        }
    };
    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark" fixed="top">
                    <Navbar.Brand href="#home"><NavLink to="/" className="nav_link">RumbaPR</NavLink></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="places">Places</Nav.Link>
                        <Nav.Link href="about">About</Nav.Link>
                        <Nav.Link href="contact">Contact</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl
                            onChange={this.handleSearchInput}
                            value={this.state.searchText}
                            type="text"
                            placeholder="Search place by name"
                            className="mr-sm-2"
                        />
                        <Button onClick={this.handleSearchSubmit} variant="outline-info">
                            Search
                        </Button>
                    </Form>
                    <NavDropdown title="User" id="dropdown-basic-button" drop="left">
                      <NavDropdown.Item href="#action/4.1">Profile</NavDropdown.Item>
                      <NavDropdown.Item href="#action/4.2">Preferences</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/4.3">Log-out</NavDropdown.Item>
                      <NavDropdown.Item href="register">Register</NavDropdown.Item>
                   </NavDropdown>
                </Navbar>
            </>
        );
    }
}
export default withRouter(Header);