import React from 'react';


function Toggle({ prop, setProp }) {

    return (
        <>
            <input 
                type='checkbox' 
                className="toggle toggle-primary toggle-lg border-rosa-light bg-rosa-light [--tglbg:white] hover:bg-rosa" 
                checked={prop} 
                onChange={() => setProp(!prop)} 
            />
        </>
    );
}

export default Toggle