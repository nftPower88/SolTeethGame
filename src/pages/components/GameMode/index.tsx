import React, {useEffect} from 'react';
import {Carousel} from 'antd';
import "antd/dist/antd.css";
import './index.css';

export interface GameModeProps {
    setGameMode: any;
}

const GameMode = (props: GameModeProps) => {
    
    return (
        <div className="gamemode-container">            
            <div><img src="images/mode-1.png" className="gamemode-item"/></div>
            <div><img src="images/mode-2.png" className="gamemode-item"/></div>
            <div><img src="images/mode-3.png" className="gamemode-item"/></div>
        </div>
    )
}

export default GameMode;