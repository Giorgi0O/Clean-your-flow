import React from "react";

function BackgroundAnimated({
    bgLeft,
    bgRigth,
    selectedMode
}) {
    
  return (
    <>
      <div className='z-[1] bg-white/10 backdrop-blur-3xl absolute top-0 left-0 overflow-hidden blur-3xl w-screen h-screen '></div>
      <div 
        className={`bg-moving rounded-tr-3xl rounded-br-3xl top-[15%] left-0 bg-rosa-light `}
        style={{width: `${bgLeft}%` }}
      >
      </div>
      <div 
        className={`bg-moving rounded-tl-3xl rounded-bl-3xl top-[15%] right-0 ${selectedMode === 1 ? 'bg-ciano-light' : 'bg-verde-light'}`}
        style={{width: `${bgRigth}%` }}
      >
      </div> 
    </>
  );
}

export default BackgroundAnimated;
