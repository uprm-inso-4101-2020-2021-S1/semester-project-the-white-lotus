import React, {useState} from 'react';
import './HamburgerMenuDesigns/HamburgerMenu.css'
import './HamburgerMenuDesigns/btnStyle.css'
import {Container} from 'react-bootstrap'
import SimpleSlider from './carousel/carousel.js'
import {RangeSlider, DistanceSlider} from './HamBurgerComponents/Sliders.js'
import Select from 'react-select'
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';



//Main function
export class HamburgerMenu extends React.Component {

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

  constructor() {
    super();
    this.state = {
      place: 'Any',
      ambience: [],
      mood: [],
      category: [],
      distance: {},
      priceMin: {},
      priceMax: {},

    };


    // Binding method
    this.setPlace = this.setPlace.bind(this);
    this.setAmb = this.setAmb.bind(this);
    this.setMood = this.setMood.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.setDistance = this.setDistance.bind(this);
  }

  setPlace(e) {
    console.log("Place Selected!!");
    this.state.place=e
    console.log(this.state.place)
  }


  setAmb(e) {
    console.log("Ambience Updated!!");
    this.state.ambience=e
    console.log(this.state.ambience)
  }

  setMood(e) {
    console.log("Mood Updated!!");
    this.state.mood=e
    console.log(this.state.mood)
  }

  setCategory(e) {
    console.log("Category Updated!!");
    this.state.category=e
    console.log(this.state.category)
  }

  setDistance(e) {
    console.log("Distance Updated!!");
    this.state.distance=e
    console.log(this.state.distance)
  }

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
                          onChange={this.setPlace}
                          noOptionsMessage={()=> 'Any'}
                          onFocus
                          isSearchable
                          placeholder="Any"
                          className="mb-3"
                        />
                        
                      </div>

                      {/* Filters */}
                      {/* Ambiance selectioon */}
                      <p  style = {{color: "#fff"}}>Which ambience?</p>
                      <Select 
                        isMulti
                        options={this.ambienceFilter}
                        onChange={this.setAmb}
                        noOptionsMessage={()=> 'No filter selected'}
                        onFocus
                        isSearchable
                        placeholder="Select filters"
                        className="mb-3"
                      />

                      {/* Mood selection */}
                      <p  style = {{color: "#fff"}}>What mood?</p>
                      <Select 
                        isMulti
                        options={this.moodFilter}
                        onChange={this.setMood}
                        noOptionsMessage={()=> 'No filter selected'}
                        onFocus
                        isSearchable
                        placeholder="Select filters"
                        className="mb-3"
                      />

                      {/* Category selection */}
                      <p  style = {{color: "#fff"}}>Category</p>
                      <Select 
                        isMulti
                        options={this.categoryFilter}
                        onChange={this.setCategory}
                        noOptionsMessage={()=> 'No filter selected'}
                        onFocus
                        isSearchable
                        placeholder="Select filters"
                        className="mb-3"
                      />

                      {/* Preffered Distance */}
                      <p class=".text-muted" style = {{color: "#fff"}}>Preffered Distance</p>
                      <Slider style = {{color: "#4CAF50"}}
                        onChange={this.setDistance}
                        defaultValue={20}
                        //getAriaValueText={valuetext}
                        aria-labelledby="distance-slider"
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={10}
                        max={30}
                      />

                      {/* Price range slider */}
                      <label>
                        <p  style = {{color: "#fff"}}>Price Range</p>
                      </label>
                      <RangeSlider/>

                      {/* Carousel */}
                      {/* <label>
                        <p  style = {{color: "#fff"}}>Hashtags</p>
                      </label>
                      <SimpleSlider /> */}
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