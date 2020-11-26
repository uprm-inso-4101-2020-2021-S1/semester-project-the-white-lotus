import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';



// Width for sliders
const useStyles = makeStyles({
    root: {
      width: 300,
    },
  });
  
  
  
  //Preffered distance slider
 export function DistanceSlider() {
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

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 100,
      label: '100+',
    },
  ];


 export function RangeSlider() {
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
          min={0}
          max={100}
          marks={marks}
          
        />
      </div>
    );
  }