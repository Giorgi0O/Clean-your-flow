import React from 'react';


function Toggle({ prop, setProp }) {

    return (
        <>
            <input type='checkbox' className="toggle toggle-lg toggle-primary bg-verde-light" checked={prop} onChange={() => setProp(!prop)} />
        </>
    );
}

export default Toggle