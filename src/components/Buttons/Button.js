import '../../styles/Button.css'
import React from 'react';

function Button({ text, iconName, color, shadow, operation, disab = false , endSession = false}) {

    const isShadow = shadow ? 'box-shadow-button' : ''

    const iconUrl = require(`../../assets/Icons/${iconName}.svg`);

    return (
        <button className={`
                h-12 px-8 py-3 m-4 rounded-lg ${ disab ? 'bg-gray':`bg-${color}` } shadow-md flex justify-evenly 
                hover:bg-${color}-dark
            `}
            disabled={disab} onClick={operation}>
            <img 
                src={iconUrl}
                alt={`${text} icon`}
                width="24"
                height="24"
            />
            <span className='text-white font-corpo font-bold text-lg mx-2'>{text}</span>
        </button>
    );
}


export default Button