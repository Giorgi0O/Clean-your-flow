import React from 'react';

function BPrimary({ text, iconName, color, shadow, operation, disab = false , endSession = false}) {

    const iconUrl = require(`../../assets/Icons/${iconName}.svg`);

    const colorClasses = {
        primary: 'bg-ciano-light border-ciano-dark hover:bg-ciano-light',
        secondary: 'bg-rosa-light border-rosa-dark hover:bg-rosa-light',
        neutral: 'bg-verde-light border-verde-dark hover:bg-verde-light',
        success: 'bg-verde-light border-verde-dark hover:bg-verde-light'
    };

    const textClasses = {
        primary: 'text-ciano-dark font-bold font-corpo text-lg',
        secondary: 'text-rosa-dark font-bold font-corpo text-lg',
        neutral: 'text-verde-dark font-bold font-corpo text-lg',
        success: 'text-verde-dark font-bold font-corpo text-lg'
    };

    const buttonColorClass = colorClasses[color] || colorClasses.primary;
    const buttonColorText = textClasses[color] || textClasses.primary;

    return (
        <button className={`btn  ${buttonColorClass}
                px-8 m-4 ${ disab ? 'bg-gray':`bg-${color}` } shadow-md flex justify-evenly 
                hover:bg-${color}-dark
            `}
            disabled={disab} onClick={operation}>
            <div className='center'>
                <img 
                    src={iconUrl}
                    alt={`${text} icon`}
                    width="24"
                    height="24"
                />
                <span className={`${buttonColorText} ml-1`} >{text}</span>
            </div>
        </button>
    );
}


export default BPrimary