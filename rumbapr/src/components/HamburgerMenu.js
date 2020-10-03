import React from 'react';
import './HamburgerMenuDesigns/HamburgerMenu.css'
import './HamburgerMenuDesigns/btnStyle.css'
import NavDropdown from 'react-bootstrap/NavDropdown';

export class HamburgerMenu extends React.Component{
  render(){
    return(
      <div className="hamburger-container">
      <body>
        <div className="menu-wrap" />
          <input type="checkbox" className="toggler" />
          <div className="hamburger"><div></div></div>
          <div className="menu">
            <div>
              <div>
                <ul>
                <NavDropdown title="Type of location" id="dropdown-basic-button">
                  <NavDropdown.Item href="#action/3.1">Food</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Hotel</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Attraction</NavDropdown.Item>
                </NavDropdown>
                <li><a href="#">Filters</a></li>
                <li><a href="#">Preffered distance</a></li>
                <div class="slidecontainer">
                <input type="range" min="1" max="3" value="2" className="slider" id="myDistance" /></div>
                <li><a href="#">Price range</a></li>
                <div class="slidecontainer">
                <input type="range" min="1" max="3" value="2" className="slider" id="myPrice" /></div>
                </ul>
              </div>
            </div>
          </div>
        </body>
      </div>
    )
  }
}


export default HamburgerMenu;