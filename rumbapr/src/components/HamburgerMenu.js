import React from 'react';
import './HamburgerMenuDesigns/HamburgerMenu.css'
import './HamburgerMenuDesigns/btnStyle.css'
import {Container} from 'react-bootstrap'
import SimpleSlider from './carousel/carousel.js'
import Select from 'react-select'
import Slider from '@material-ui/core/Slider';



//Main function
export default class HamburgerMenu extends React.Component {

  optionFilter = [
    {value: 'Any', label:'Any'},
    {value: 'Food', label:'Food'},
    {value: 'Hotel', label:'Hotel'},
    {value: 'Beach', label:'Beach'},
    {value: 'Attraction', label:'Attraction'}

  ];

  ambienceFilter = [
  
    // Ambience options
    {className: 'Ambience' , value: 'Elegant', label:'Elegant'},
    {className: 'Ambience' , value: 'Sophisticated', label:'Sophisticated'},
    {className: 'Ambience' , value: 'Traditional', label:'Traditional'},
    {className: 'Ambience' , value: 'Modern', label:'Modern'},
    {className: 'Ambience' , value: 'Old fashioned', label:'Old fashioned'},
    {className: 'Ambience' , value: 'Vintage', label:'Vintage'},
    {className: 'Ambience' , value: 'Cultural', label:'Cultural'},
    {className: 'Ambience' , value: 'Serene', label:'Serene'},
    {className: 'Ambience' , value: 'Cozy', label:'Cozy'},
    {className: 'Ambience' , value: 'Soothing', label:'Soothing'},
    {className: 'Ambience' , value: 'Familiar', label:'Familiar'},
    {className: 'Ambience' , value: 'Adult', label:'Adult'},
    {className: 'Ambience' , value: 'Young', label:'Young'},
    {className: 'Ambience' , value: 'Casual', label:'Casual'},
    {className: 'Ambience' , value: 'Cultural', label:'Cultural'},


  ];

  moodFilter = [

    // Mood options
    {className: 'Mood' , value: 'Curious', label:'Curious'},
    {className: 'Mood' , value: 'Humorous', label:'Humorous'},
    {className: 'Mood' , value: 'Calm', label:'Calm'},
    {className: 'Mood' , value: 'Festive', label:'Festive'},
    {className: 'Mood' , value: 'Happy', label:'Happy'},
    {className: 'Mood' , value: 'Social', label:'Social'},
    {className: 'Mood' , value: 'Adventurous', label:'Adventurous'},
    {className: 'Mood' , value: 'Sad', label:'Sad'},
    {className: 'Mood' , value: 'Tense', label:'Tense'},


  ];

  categoryFilter = [

    // Category
    {className: 'Category' , value: 'Nature', label:'Nature'},
    {className: 'Category' , value: 'Food/Drinks', label:'Food/Drinks'},
    {className: 'Category' , value: 'History', label:'History'},
    {className: 'Category' , value: 'Entertainment ', label:'Entertainment '},
    {className: 'Category' , value: 'Shopping', label:'Shopping'},
    {className: 'Category' , value: 'Sports', label:'Sports'},
    {className: 'Category' , value: 'Hotel/Motel/Lodges', label:'Hotel/Motel/Lodges'},


  ];

  constructor(props) {
    super(props);
  }

  marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 100,
      label: '100+',
    },
  ];

  // HamburgerMenu
  render() {
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


                      {/* Place of choice */}
                      <div className="myPlace">
                        <p  style = {{color: "#fff"}}>Place</p>
                        
                        <Select 
                          options={this.optionFilter}
                          onChange={this.props.setPlace}
                          noOptionsMessage={()=> 'Any'}
                          onFocus
                          isSearchable
                          placeholder="Any"
                          className="mb-3"
                        />
                        
                      </div>

                      {/* Filters */}
                      {/* Ambiance selectioon */}
                      <p  style = {{color: "#fff"}}>Filters:</p>
                      <Select 
                        isMulti
                        options={this.ambienceFilter}
                        onChange={this.props.setAmb}
                        noOptionsMessage={()=> 'No filter selected'}
                        onFocus
                        isSearchable
                        placeholder="Which ambience would you like?"
                        className="mb-3"
                      />

                      {/* Mood selection */}
                      <Select 
                        isMulti
                        options={this.moodFilter}
                        onChange={this.props.setMood}
                        noOptionsMessage={()=> 'No filter selected'}
                        onFocus
                        isSearchable
                        placeholder="Which mood are you looking for?"
                        className="mb-3"
                      />

                      {/* Category selection */}
                      <Select 
                        isMulti
                        options={this.categoryFilter}
                        onChange={this.props.setCategory}
                        noOptionsMessage={()=> 'No filter selected'}
                        onFocus
                        isSearchable
                        placeholder="Category"
                        className="mb-3"
                      />

                      {/* Preffered Distance */}
                      <p class=".text-muted" style = {{color: "#fff"}}>Preffered Distance</p>
                      <Slider style = {{color: "#4CAF50"}}
                        onChange={this.props.setDistance}
                        defaultValue={20}
                        //getAriaValueText={valuetext}
                        aria-labelledby="distance-slider"
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={10}
                        max={30}
                        className="mb-3"
                      />

                      {/* Price range slider */}
                      <label>
                        <p  style = {{color: "#fff"}}>Price Range</p>
                      </label>
                      <Slider style = {{color: "#4CAF50"}}
                        //value={this.props.value}
                        defaultValue = {[0,20]}
                        onChange={this.props.setPrice}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={100}
                        marks={this.marks}
                        className="mb-3"
                      />

                      {/* Carousel */}
                      <label>
                        <p  style = {{color: "#fff"}} className="mb-1">Hashtags</p>
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