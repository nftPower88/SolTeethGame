import React, {useEffect} from 'react';
import './index.css';
import $ from "jquery";

const IntroCarousel = () => {
    const items: number[] = [0,1,2,3,4];
    var animating: boolean = false;
    function startAnimations() {
        if(!animating){
            animating = true;
            $('.item--'+items[0]).css({ zIndex: 1 });
            $('.item--'+items[1]).css({ zIndex: 3 });
            $('.item--'+items[2]).css({ zIndex: 3 });
            $('.item--'+items[3]).css({ zIndex: 0 });
            $('.item--'+items[4]).css({ zIndex: 0 });
        
            $('.item--'+items[0]).animate({
                left: '100px',
                width: '150px',
                height: '100px'
            }, 1000);
            $('.item--'+items[1]).animate({
                left: '325px',
            }, 1000);
            $('.item--'+items[2]).animate({
                left: '550px'
            }, 1000);
            $('.item--'+items[3]).animate({
                left: '450px',
                width: '90px',
                height: '60px'
            }, 1000);
            $('.item--'+items[4]).animate({
                left: '250px'
            }, 1000);
            console.log('animations-complete');
            setTimeout(function(){
                var num: any = items.pop();
                items.unshift(num);
                setTimeout(function(){
                    animating = false;
                }, 300);
            }, 1500);
        }        
    }

    window.setInterval(function(){
        startAnimations();
    }, 2000);
    
    return (
        <div className="carousel-container">
            <div className="item item--0">Nought</div>
            <div className="item item--1">One</div>
            <div className="item item--2">Two</div>
            <div className="item item--3">Three</div>
            <div className="item item--4">Four</div>
        </div>
    )
}

export default IntroCarousel;