import React from 'react';
import './HamburgerMenuDesigns/HamburgerMenu.css'
import './HamburgerMenuDesigns/btnStyle.css'
import NavDropdown from 'react-bootstrap/NavDropdown';
import {form, label, card, Container} from 'react-bootstrap'
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
                  <Container>
                    <form color= "white">
                      <div className="myPlace">

                        {/* Place of chice */}
                        <p  style = {{color: "#fff"}}>Place</p>
                        <select id="myPlace" on change="place()">
                          <option>Any</option>
                          <option>Food</option>
                          <option>Hotel</option>
                          <option>Beach</option>
                          <option>Attraction</option>
                        </select>
                      </div>

                      {/* Filters */}
                      <p  style = {{color: "#fff"}}>Filters</p>
                      <select name="Filters" id="myFilters" on multiple ismulti>
                        <option>Elegant</option>
                        <option>Sophisticated</option>
                        <option>Traditional</option>
                        <option>Modern</option>
                        <option>Old fashioned</option>
                        <option>Vintage</option>
                        <option>Cultural</option>
                        <option>Serene</option>
                        <option>Cozy</option>
                        <option>Soothing</option>
                        <option>Familiar</option>
                        <option>Adult</option>
                        <option>Young</option>
                        <option>Casual</option>
                        <option>Cultural</option>
                      </select>

                      {/* Preffered Distance */}
                      <p class=".text-muted" style = {{color: "#fff"}}>Preffered Distance</p>
                      <div class="slidecontainer">
                      <input type="range" min="1" max="3" defaultValue="2" className="slider" id="myDistance" /></div>

                      {/* Price range slider */}
                      <label>
                        <p  style = {{color: "#fff"}}>Price Range</p>
                      </label>
                      <div class="slidecontainer">
                        <input type="range" min="1" max="3" defaultValue="2" className="slider" id="myPrice" />
                      </div>

                      {/* Carousel */}
                      <label>
                        <p  style = {{color: "#fff"}}>Hashtags</p>
                      </label>
                      <SimpleSlider />
                    </form>
                  
                  </Container>
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