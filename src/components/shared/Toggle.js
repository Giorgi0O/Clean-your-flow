import React from 'react';


function Toggle({ prop, setProp }) {

    return (
        <>
            <input 
                type='checkbox' 
                className="toggle toggle-lg 
                        border-rosa-light checked:border-ciano hover:border-ciano-dark
                        bg-rosa checked:bg-ciano hover:bg-rosa-dark hover:checked:bg-ciano-dark
                        [--tglbg:theme(colors.rosa.light)] checked:[--tglbg:theme(colors.ciano.light)]
                "
                checked={prop} 
                onChange={() => setProp(!prop)} 
            />
        </>
    );
}

export default Toggle