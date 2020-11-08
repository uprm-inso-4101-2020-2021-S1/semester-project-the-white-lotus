import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      //adaptiveHeight: true,
      arrows: true,
      //autoplaySpeed: 1,
      //autoplay: true

    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <h3>Image-1</h3>
          </div>
          <div>
            <h3>Image-2</h3>
          </div>
          <div>
            <h3>Image-3</h3>
          </div>
          <div>
            <h3>Image-4</h3>
          </div>
          <div>
            <h3>Image-5</h3>
          </div>
          <div>
            <h3>Image-6</h3>
          </div>
        </Slider>
      </div>
    );
  }
}

var img = document.createElement('img')

img.src = "https://media.cntraveler.com/photos/59ef91dd8d4f736d51415c2e/master/w_2667,h_2000,c_limit/7MileBeach-2013-HiRes.jpg"

