import React, {useEffect, useRef} from 'react';
import {Carousel} from 'antd';
import "antd/dist/antd.css";
import './index.css';

const Anim2 = () => {
    const carousel: any = useRef(null);
    
    window.setInterval(function(){
        if (carousel === null || carousel.current === null) {
            return;
        }
        carousel.current.prev();
    }, 2000);

    
    return (
        <Carousel ref={carousel} autoplay dots={false}>
            <div><img src="images/home-animations/mid1.png" className="item"/></div>
            <div><img src="images/home-animations/mid2.png" className="item"/></div>
            <div><img src="images/home-animations/mid3.png" className="item"/></div>
            <div><img src="images/home-animations/mid4.png" className="item"/></div>
            <div><img src="images/home-animations/mid5.png" className="item"/></div>
        </Carousel>
    )
}

export default Anim2;