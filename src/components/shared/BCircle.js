import React from 'react';

function BCircle({ 
    tooltip,
    iconName,
    color = 'primary', 
    operation,
    active,
    activeOperation
}) {

    const iconUrl = require(`../../assets/Icons/${iconName}.svg`);

    const colorClasses = {
        primary: active ? 'bg-ciano border-ciano-dark hover:bg-ciano hover:border-ciano':'bg-ciano-light border-ciano-dark hover:bg-ciano-light hover:border-ciano-light',
        secondary: active ? 'bg-rosa border-rosa-dark hover:bg-rosa hover:border-rosa': 'bg-rosa-light border-rosa-dark hover:bg-rosa-light hover:border-rosa-light',
        neutral: active ? 'bg-verde border-verde-dark hover:bg-verde hover:border-verde': 'bg-verde-light border-verde-dark hover:bg-verde-light hover:border-verde-light'
    };

    const buttonColorClass = colorClasses[color] || colorClasses.primary;

    return (
        <>
            {
                active ?
                (
                    <button className={`btn btn-circle m-1 ${buttonColorClass}`} onClick={activeOperation}>
                        <img 
                            src={iconUrl}
                            alt={iconName}
                            width="24"
                            height="24"
                        />
                    </button>   
                )
                :
                (
                    <button className={`btn btn-circle m-1 ${buttonColorClass}`} onClick={operation} title={tooltip}>
                        <img 
                            src={iconUrl}
                            alt={iconName}
                            width="24"
                            height="24"
                        />
                    </button> 
                )
            }
        </>

    );
}


export default BCircle