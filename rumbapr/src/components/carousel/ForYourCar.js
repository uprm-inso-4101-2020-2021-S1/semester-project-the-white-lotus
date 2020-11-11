import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './SimpleSlider.css'

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      className: "center",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      slidesToShow: 3

    };
    return (
      <div className="SimpleSlider">
        <Slider {...settings}>
        <div>
            <img src={"https://mdbootstrap.com/img/Others/documentation/forest-sm-mini.jpg"} width="95%" height="30%"  />
          </div>
          <div>
            <img src={"https://mdbootstrap.com/img/Others/documentation/forest-sm-mini.jpg"} width="95%" height="30%" />
          </div>
          <div>
            <img src={"https://mdbootstrap.com/img/Others/documentation/forest-sm-mini.jpg"} width="95%" height="30%" />
          </div>
          <div>
            <img src={"https://mdbootstrap.com/img/Others/documentation/forest-sm-mini.jpg"} width="95%" height="30%" />
          </div>
  </Slider>
  </div>
    );
}
}