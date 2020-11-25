import React, {useState} from 'react';
import './HamburgerMenuDesigns/HamburgerMenu.css'
import './HamburgerMenuDesigns/btnStyle.css'
import {form, label, card, Container} from 'react-bootstrap'
import SimpleSlider from './carousel/carousel.js'
import Select from 'react-select'
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';



// Width for sliders
const useStyles = makeStyles({
  root: {
    width: 300,
  },
});



//Preffered distance slider
function DistanceSlider() {
  const classes = useStyles();

  //   useEffect(() => {
//     const apiUrl = '';
//     fetch(apiUrl)
//         .then((response) => response.json())
//         .then((databaseInfo) => setDataSet({locations: databaseInfo}))

// }, []);

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

  //   useEffect(() => {
//     const apiUrl = '';
//     fetch(apiUrl)
//         .then((response) => response.json())
//         .then((databaseInfo) => setDataSet({locations: databaseInfo}))

// }, []);

  return (
    <div className={classes.root}>
      <Slider style = {{color: "#4CAF50"}}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={0}
        max={100}
        //getAriaValueText={valuetext}
      />
    </div>
  );
}



// Function for the filter selection using hooks for data storage
function Filters({data, setOrdered}) {
  const [fil, setFil] = useState([]);
  const optionFilter = [

    // Ambience options
    {id: 'Ambience' , value: 'Elegant', label:'Elegant'},
    {id: 'Ambience' , value: 'Sophisticated', label:'Sophisticated'},
    {id: 'Ambience' , value: 'Traditional', label:'Traditional'},
    {id: 'Ambience' , value: 'Modern', label:'Modern'},
    {id: 'Ambience' , value: 'Old fashioned', label:'Old fashioned'},
    {id: 'Ambience' , value: 'Vintage', label:'Vintage'},
    {id: 'Ambience' , value: 'Cultural', label:'Cultural'},
    {id: 'Ambience' , value: 'Serene', label:'Serene'},
    {id: 'Ambience' , value: 'Cozy', label:'Cozy'},
    {id: 'Ambience' , value: 'Soothing', label:'Soothing'},
    {id: 'Ambience' , value: 'Familiar', label:'Familiar'},
    {id: 'Ambience' , value: 'Adult', label:'Adult'},
    {id: 'Ambience' , value: 'Young', label:'Young'},
    {id: 'Ambience' , value: 'Casual', label:'Casual'},
    {id: 'Ambience' , value: 'Cultural', label:'Cultural'},

    // Mood options
    {id: 'Mood' , value: 'Curious', label:'Curious'},
    {id: 'Mood' , value: 'Humorous', label:'Humorous'},
    {id: 'Mood' , value: 'Calm', label:'Calm'},
    {id: 'Mood' , value: 'Festive', label:'Festive'},
    {id: 'Mood' , value: 'Happy', label:'Happy'},
    {id: 'Mood' , value: 'Social', label:'Social'},
    {id: 'Mood' , value: 'Adventurous', label:'Adventurous'},
    {id: 'Mood' , value: 'Sad', label:'Sad'},
    {id: 'Mood' , value: 'Tense', label:'Tense'},

    // Category
    {id: 'Category' , value: 'Nature', label:'Nature'},
    {id: 'Category' , value: 'Food/Drinks', label:'Food/Drinks'},
    {id: 'Category' , value: 'History', label:'History'},
    {id: 'Category' , value: 'Entertainment ', label:'Entertainment '},
    {id: 'Category' , value: 'Shopping', label:'Shopping'},
    {id: 'Category' , value: 'Sports', label:'Sports'},
    {id: 'Category' , value: 'Hotel/Motel/Lodges', label:'Hotel/Motel/Lodges'},


  ];

  //   useEffect(() => {
//     const apiUrl = '';
//     fetch(apiUrl)
//         .then((response) => response.json())
//         .then((databaseInfo) => setDataSet({locations: databaseInfo}))

// }, []);
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


//setState and builder for the place selection feature using hooks for data storage
function Place({data, setOrdered}) {
  const [place, setPlace] = useState([]);
  const optionFilter = [
    {value: 'Any', label:'Any'},
    {value: 'Food', label:'Food'},
    {value: 'Hotel', label:'Hotel'},
    {value: 'Beach', label:'Beach'},
    {value: 'Attraction', label:'Attraction'}

  ];

//   useEffect(() => {
//     const apiUrl = '';
//     fetch(apiUrl)
//         .then((response) => response.json())
//         .then((databaseInfo) => setDataSet({locations: databaseInfo}))

// }, []);

  return (
    <div>
      <Select 
        options={optionFilter}
        onChange={setPlace}
        noOptionsMessage={()=> 'Any'}
        onFocus
        isSearchable
        placeholder="Any"
        className="mb-3"
      />
    </div>
  )
}

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