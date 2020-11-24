import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom'


function Header() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home"><NavLink to="/" className="nav_link">RumbaPR</NavLink></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="places">Places</Nav.Link>
                    <Nav.Link href="contact">Contact Us</Nav.Link>
                    <Nav.Link href="about">About</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
                <NavDropdown title="User" id="dropdown-basic-button">
                    <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Preferences</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.3">Log-out</NavDropdown.Item>
                </NavDropdown>
            </Navbar>
        </div>   
    );
}

export default Header;
