import '../Timer/Timer.css';
import React from 'react';
import icon from '../../assets/Icons/play.svg'
import {hexToFilter} from '../../utils/Common'




function CircleButton({ tooltip, iconName, color, shadow, operation}) {

    const isShadow = shadow ? 'box-shadow-button' : ''
    const iconUrl = require(`../../assets/Icons/${iconName}.svg`);

    return (
        <button className={`circle-button bg-${color} ${isShadow}`} onClick={operation} title={tooltip}>
             <img 
                src={iconUrl}
                width="24"
                height="24"
                style={{
                    filter: color == 'ciano' ? hexToFilter('0D5355') : hexToFilter('7A335E')
                }}
            />
        </button>
    );
}


export default CircleButton