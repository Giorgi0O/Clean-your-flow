import '../Timer/Timer.css';
import React from 'react';
import icon from '../../assets/Icons/play.svg'




function Button({ text, iconName, color, shadow, operation}) {

    const isShadow = shadow ? 'box-shadow-button' : ''


    return (
        <div>

            <button className={`default-button bg-${color} ${isShadow}`} onClick={operation}>
                <img src={icon} alt={iconName} />
                <span>{text}</span>
            </button>
        </div>
    );
}


export default Button