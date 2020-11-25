import React, {useState} from 'react';
import './HamburgerMenuDesigns/HamburgerMenu.css'
import './HamburgerMenuDesigns/btnStyle.css'
import {Container} from 'react-bootstrap'
import SimpleSlider from './carousel/carousel.js'
import {RangeSlider, DistanceSlider} from './HamBurgerComponents/Sliders.js'
import {Filters, Place} from './HamBurgerComponents/Selections.js'



//Main function
export function HamburgerMenu () {

  // HamburgerMenu
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
                  
                  {/* Container prevents the components inside hamburger to spill out boundaries */}
                  <Container>
                    <form color= "white">


                      {/* Place of chice */}
                      <div className="myPlace">
                        <p  style = {{color: "#fff"}}>Place</p>
                        <Place/>
                      </div>

                      {/* Filters */}
                      <p  style = {{color: "#fff"}}>Filters</p>
                      <Filters/>

                      {/* Preffered Distance */}
                      <p class=".text-muted" style = {{color: "#fff"}}>Preffered Distance</p>
                      <DistanceSlider/>

                      {/* Price range slider */}
                      <label>
                        <p  style = {{color: "#fff"}}>Price Range</p>
                      </label>
                      <RangeSlider/>

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


export default HamburgerMenu;