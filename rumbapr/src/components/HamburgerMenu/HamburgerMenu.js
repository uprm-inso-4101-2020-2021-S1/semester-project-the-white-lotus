import React from 'react';
import './HamburgerMenu.css'
import './HamburgerMenuDesign.css'


// mira este tutorial https://mdbootstrap.com/docs/react/navigation/hamburger-menu/ por si quieres volver a empezar or something
// me avisas tengo que terminar una cosas de otra clase
// Dale, ill give it a watch. Thanks


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

/*
export class HamburgerMenu extends React.Component{
  render() {
    return (
      <div className="hamburger-container">
        <head>
          <title>Hamburger Menu Overlay</title>
        </head>
        <body>
        <div class="menu-wrap" />
          <input type="checkbox" class="toggler" />
          <div class="hamburger"><div></div></div>
          <div class="menu">
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
*/

/*
export class HamburgerMenu {
    render{
      return (
        <div class className='hamburger-container'>
          <div className
        </div>
      )
    }
}
*/
export default HamburgerMenu;