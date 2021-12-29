import React, {useEffect, useRef} from 'react';
import {Carousel} from 'antd';
import "antd/dist/antd.css";
import './index.css';

const Anim3 = () => {
    const carousel: any = useRef(null);
    
    useEffect(() => {
        window.setInterval(function(){
            if (carousel === null || carousel.current === null) {
                return;
            }
            carousel.current.next();
        }, 2500);
    }, []);

    return (
        <Carousel ref={carousel} dots={false}>
            <div><img src="images/home-animations/top1.png" className="item"/></div>
            <div><img src="images/home-animations/top2.png" className="item"/></div>
            <div><img src="images/home-animations/top3.png" className="item"/></div>
            <div><img src="images/home-animations/top4.png" className="item"/></div>
        </Carousel>
    )
}

export default Anim3;