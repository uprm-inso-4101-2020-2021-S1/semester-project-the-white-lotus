import React, {useState} from 'react';
import Select from 'react-select'


// Function for the filter selection using hooks for data storage
export function Ambience({data, setOrdered}) {
    const [fil, setFil] = useState([]);
    const optionFilter = [
  
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
  

export function Mood({data, setOrdered}) {
  const [fil, setFil] = useState([]);
  const optionFilter = [

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


export function Category({data, setOrdered}) {
  const [fil, setFil] = useState([]);
  const optionFilter = [

    // Category
    {className: 'Category' , value: 'Nature', label:'Nature'},
    {className: 'Category' , value: 'Food/Drinks', label:'Food/Drinks'},
    {className: 'Category' , value: 'History', label:'History'},
    {className: 'Category' , value: 'Entertainment ', label:'Entertainment '},
    {className: 'Category' , value: 'Shopping', label:'Shopping'},
    {className: 'Category' , value: 'Sports', label:'Sports'},
    {className: 'Category' , value: 'Hotel/Motel/Lodges', label:'Hotel/Motel/Lodges'},


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
export function Place({data, setOrdered}) {
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