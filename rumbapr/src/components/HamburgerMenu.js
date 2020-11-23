import React from 'react';
import './HamburgerMenuDesigns/HamburgerMenu.css'
import './HamburgerMenuDesigns/btnStyle.css'
import NavDropdown from 'react-bootstrap/NavDropdown';
import SimpleSlider from './carousel/carousel.js'

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
                  <div className="myPlace">
                    <select id="myPlace" on change="place()">
                      <option>Any</option>
                      <option>Food</option>
                      <option>Hotel</option>
                      <option>Attraction</option>
                    </select>
                  </div>
                <li><a href="#">Filters</a></li>
                <p><input type="checkbox" className="filters" id="filter1" /> Filter1</p>
                <p><input type="checkbox" className="filters" id="filter2" /> Filter2</p>
                <p><input type="checkbox" className="filters" id="filter3" /> Filter3</p>
                <p><input type="checkbox" className="filters" id="filter4" /> Filter4</p>
                <li><a href="#">Preffered distance</a></li>
                <div class="slidecontainer">
                <input type="range" min="1" max="3" defaultValue="2" className="slider" id="myDistance" /></div>
                <li><a href="#">Price range</a></li>
                <div class="slidecontainer">
                <input type="range" min="1" max="3" defaultValue="2" className="slider" id="myPrice" /></div>
                <li><a href="#">Hashtags</a></li>
                <SimpleSlider />
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