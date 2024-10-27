import React from 'react';

function BCircle({ 
    tooltip,
    color = 'primary', 
    operation,
    active,
    activeOperation,
    disabled = false,
    children
}) {
    const colorClasses = {
        primary: active ? 'bg-ciano border-ciano-dark hover:bg-ciano hover:border-ciano':'bg-ciano-light border-ciano-dark hover:bg-ciano-light hover:border-ciano',
        secondary: active ? 'bg-rosa border-rosa-dark hover:bg-rosa hover:border-rosa': 'bg-rosa-light border-rosa-dark hover:bg-rosa-light hover:border-rosa',
        neutral: active ? 'bg-verde border-verde-dark hover:bg-verde hover:border-verde': 'bg-verde-light border-verde-dark hover:bg-verde-light hover:border-verde'
    };

    const buttonColorClass = colorClasses[color] || colorClasses.primary;

    return (
        <>
            {
                active ?
                (
                    <button className={`btn btn-circle m-1 ${buttonColorClass}`} disabled={disabled} onClick={activeOperation}>
                        {children}
                    </button>   
                )
                :
                (
                    <button className={`btn btn-circle m-1 ${buttonColorClass}`} disabled={disabled} onClick={operation} title={tooltip}>
                        {children}
                    </button> 
                )
            }
        </>

    );
}


export default BCircle