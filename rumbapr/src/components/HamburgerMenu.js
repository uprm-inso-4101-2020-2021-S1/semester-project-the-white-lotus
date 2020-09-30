import React from 'react';
import './HamburgerMenuDesigns/HamburgerMenu.css'
import './HamburgerMenuDesigns/btnStyles.css'

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
                  <li><a href="#">Type of location</a></li>
                  <li><a href="#">Filters</a></li>
                  <li><a href="#">Preffered distance</a></li>
                  <li><a href="#">Price range</a></li>
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