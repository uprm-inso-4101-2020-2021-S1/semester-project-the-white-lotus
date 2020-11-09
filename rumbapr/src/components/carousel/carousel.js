import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './SimpleSlider.css'

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      className: "center",
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "60px",
      //adaptiveHeight: true,
      arrows: true,
      //autoplaySpeed: 1,
      //autoplay: true

    };
    return (
      <div className="SimpleSlider">
        <Slider {...settings}>
        <div>
            <img src={"https://cdnb.artstation.com/p/assets/images/images/031/251/515/large/ash-thorp-019-the-shallows-deep-2560-001.jpg?1603079132"} width="70%" height="70%"  />
          </div>
          <div>
            <img src={"https://cdnb.artstation.com/p/assets/images/images/031/251/515/large/ash-thorp-019-the-shallows-deep-2560-001.jpg?1603079132"} width="70%" height="70%" />
          </div>
          <div>
            <img src={"https://cdnb.artstation.com/p/assets/images/images/031/251/515/large/ash-thorp-019-the-shallows-deep-2560-001.jpg?1603079132"} width="70%" height="70%" />
          </div>
          <div>
            <img src={"https://cdnb.artstation.com/p/assets/images/images/031/251/515/large/ash-thorp-019-the-shallows-deep-2560-001.jpg?1603079132"} width="70%" height="70%" />
          </div>
  </Slider>
  </div>
    );
}
}