import '../Timer/Timer.css';
import React from 'react';

function Button({ text, iconName, color, shadow, operation, fixedWidth = 150 }) {

    const isShadow = shadow ? 'box-shadow-button' : ''

    const iconUrl = require(`../../assets/Icons/${iconName}.svg`);

    return (
        <button className={`default-button bg-${color} ${isShadow}`} onClick={operation}>
            <img 
                src={iconUrl}
                alt={`${text} icon`}
                width="24"
                height="24"
            />
            <span className='color-white'>{text}</span>
        </button>
    );
}


export default Button