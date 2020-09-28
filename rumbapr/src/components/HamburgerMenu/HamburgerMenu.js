import React from 'react';

const HamburgerMenu = () => {
    return (
        <div>
            <link rel="stylesheet" href="./HamburgerMenu/HamburgerMenuDesign.css"></link>
            <div class="menu-wrap">
            <input type="checkbox" name="HamburgerMenu"></input> 
            </div>
            <ul>
                <li>Type of location</li>
                <li>Filters</li>
                <li>Prefferd distance</li>
                <li>Price range</li>
            </ul>
        </div>
    )
}

function getSelectedCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    if(values.length<1){
        return null;
    }
    return values;
}

export default HamburgerMenu