import '../Timer/Timer.css';
import React from 'react';
import {hexToFilter} from '../../utils/Common'

function CircleButton({ 
    tooltip,
    iconName,
    color,
    shadow, 
    operation,
    active,
    activeColor,
    activeOperation
}) {

    const isShadow = shadow ? 'box-shadow-button' : ''
    const iconUrl = require(`../../assets/Icons/${iconName}.svg`);

    return (
        <>
            {
                active ?
                (
                    <button className={`circle-button bg-${activeColor} ${isShadow}`} onClick={activeOperation}>
                        <img 
                            src={iconUrl}
                            alt={iconName}
                            width="24"
                            height="24"
                            style={{
                                filter: activeColor === 'ciano' ? hexToFilter('0D5355') : hexToFilter('7A335E')
                            }}
                        />
                    </button>   
                )
                :
                (
                    <button className={`circle-button bg-${color} ${isShadow}`} onClick={operation} title={tooltip}>
                        <img 
                            src={iconUrl}
                            alt={iconName}
                            width="24"
                            height="24"
                            style={{
                                filter: color === 'ciano' ? hexToFilter('0D5355') : hexToFilter('7A335E')
                            }}
                        />
                    </button> 
                )
            }
        </>

    );
}


export default CircleButton