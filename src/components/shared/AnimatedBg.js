import React from "react";

function AnimatedBg() {

    return (
        <>
            <div className={`z-10 absolute w-full h-screen overflow-hidden`}>
                <div className='background-left-3-colors bg-rosa-opacity top-[-10%] left-[-15%] rotate-[20deg]'  ></div>
                <div className='background-left-3-colors bg-verde-opacity top-[35%] left-[-20%]' ></div>
                <div className='background-left-3-colors bg-ciano-opacity top-[70%] left-[-15%] rotate-[-20deg]' ></div>
            </div>
        </>
    );
}

export default AnimatedBg;
