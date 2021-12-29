import React, {useEffect} from 'react';
import {Carousel} from 'antd';
import "antd/dist/antd.css";
import './index.css';
import Anim1 from './anim1';
import Anim2 from './anim2';
import Anim3 from './anim3';

const IntroCarousel = () => {
    
    return (
        <div className="carousel-container">
            <div><Anim1 /></div>
            <div className="carousel-margin"><Anim2 /></div>
            <div className="carousel-margin"><Anim3 /></div>
        </div>
    )
}

export default IntroCarousel;