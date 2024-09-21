import '../../styles/Button.css'
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
                    <button className={`rounded-full bg-${color}-light border-${color}-dark border-2 p-2 shadow-md  `} onClick={activeOperation}>
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
                    <button className={`rounded-full bg-${color}-light border-${color}-dark border-2 p-2 `} onClick={operation} title={tooltip}>
                        <img 
                            src={iconUrl}
                            alt={iconName}
                            width="24"
                            height="24"
                            className={`text-${color}-dark`}
                        />
                    </button> 
                )
            }
        </>

    );
}


export default CircleButton