import '../Timer/Timer.css';
import React from 'react';
import icon from '../../assets/Icons/play.svg'
import {hexToFilter} from '../../utils/Common'




function Button({ text, iconName, color, shadow, operation}) {

    const isShadow = shadow ? 'box-shadow-button' : ''

    const iconUrl = require(`../../assets/Icons/${iconName}.svg`);


    return (
        <button className={`default-button bg-${color} ${isShadow}`} onClick={operation}>
            <img 
                src={iconUrl}
                alt={`${text} icon`}
                width="24"
                height="24"
                style={{
                    filter: color == 'ciano' ? hexToFilter('0D5355') : hexToFilter('7A335E')
                }}
            />
            <span>{text}</span>
        </button>
    );
}


export default Button