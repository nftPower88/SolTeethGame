import React, {useEffect, useRef} from 'react';
import {Carousel} from 'antd';
import "antd/dist/antd.css";
import './index.css';

const Anim1 = () => {
    const carousel: any = useRef(null);

    useEffect(() => {
        window.setInterval(function(){
            if (carousel === null || carousel.current === null) {
                return;
            }
            carousel.current.next();
        }, 1500);
    }, []);
    
    return (
        <Carousel ref={carousel} autoplay dots={false}>
            <div><img src="images/home-animations/down1.png" className="item"/></div>
            <div><img src="images/home-animations/down2.png" className="item"/></div>
            <div><img src="images/home-animations/down3.png" className="item"/></div>
        </Carousel>
    )
}

export default Anim1;