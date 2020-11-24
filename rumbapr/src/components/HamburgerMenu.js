import React, {useState} from 'react';
import './HamburgerMenuDesigns/HamburgerMenu.css'
import './HamburgerMenuDesigns/btnStyle.css'
import {form, label, card, Container} from 'react-bootstrap'
import SimpleSlider from './carousel/carousel.js'
import Select from 'react-select'
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

//Preffered distance slider
function DistanceSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider style = {{color: "#4CAF50"}}
        defaultValue={20}
        //getAriaValueText={valuetext}
        aria-labelledby="distance-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={30}
      />
    </div>
  );
}

//Price range slider
function RangeSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Slider style = {{color: "#4CAF50"}}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        //getAriaValueText={valuetext}
      />
    </div>
  );
}

export function HamburgerMenu () {


  // Function for the filter selection using hooks for data storage
  function Filters({data, setOrdered}) {
    const [fil, setFil] = useState([]);
    const optionFilter = [
      {value: 'Elegant', label:'Elegant'},
      {value: 'Sophisticated', label:'Sophisticated'},
      {value: 'Traditional', label:'Traditional'},
      {value: 'Modern', label:'Modern'},
      {value: 'Old fashioned', label:'Old fashioned'},
      {value: 'Vintage', label:'Vintage'},
      {value: 'Cultural', label:'Cultural'},
      {value: 'Serene', label:'Serene'},
      {value: 'Cozy', label:'Cozy'},
      {value: 'Soothing', label:'Soothing'},
      {value: 'Familiar', label:'Familiar'},
      {value: 'Adult', label:'Adult'},
      {value: 'Young', label:'Young'},
      {value: 'Casual', label:'Casual'},
      {value: 'Cultural', label:'Cultural'},
      {value: 'Curious', label:'Curious'},
      {value: 'Humorous', label:'Humorous'},
      {value: 'Calm', label:'Calm'},
      {value: 'Festive', label:'Festive'},
      {value: 'Happy', label:'Happy'},
      {value: 'Social', label:'Social'},
      {value: 'Adventurous', label:'Adventurous'},
      {value: 'Sad', label:'Sad'},
      {value: 'Tense', label:'Tense'},
      {value: 'Nature', label:'Nature'},
      {value: 'Food/Drinks', label:'Food/Drinks'},
      {value: 'History', label:'History'},
      {value: 'Entertainment ', label:'Entertainment '},
      {value: 'Shopping', label:'Shopping'},
      {value: 'Sports', label:'Sports'},
      {value: 'Hotel/Motel/Lodges', label:'Hotel/Motel/Lodges'},


    ];
    return (
      <div>
        <Select 
          isMulti
          options={optionFilter}
          onChange={setFil}
          noOptionsMessage={()=> 'No filter selected'}
          onFocus
          isSearchable
          placeholder="Select filters"
          className="mb-3"
        />
      </div>
    )
  }

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