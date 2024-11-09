import React from "react";

function AnimatedBg() {

    return (
        <>
            <div className="absolute w-screen h-screen overflow-hidden">
                {/* Overlay per gestire la luminosità e il blur generale */}
                <div 
                    className="absolute inset-0 z-[0] bg-white/10 backdrop-blur-3xl" 
                />

                {/* Container principale per gli effetti di gradiente */}
                <div className="z-0 absolute w-screen h-screen bg-base-100">

                    {/* Bolle animate */}
                    <div 
                        className="absolute top-[-10%] left-[-15%] w-1/2 h-[450px] bg-rosa-light rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"
                    />
                    <div
                        className="absolute top-1/2 left-0 w-[350px] h-[450px] bg-verde-light rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"
                    />
                    <div 
                        className="absolute top-3/4 left-0 w-[350px] h-[450px] bg-ciano-light rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"
                    />
                </div>
            </div>
        </>
    );
}

export default AnimatedBg;
