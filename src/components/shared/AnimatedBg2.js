import React from "react";

function BackgroundAnimated({
  bgLeft,
  bgRigth,
  selectedMode
}) {

  return (
    <>
      <div className="fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl" />
      </div>

      <div
        className={`fixed z-0 h-[50vh] transition-all duration-300 ease-in-out bg-rosa-light/75`}
        style={{
          width: `${bgLeft}%`,
          top: '15%',
          left:0,
          WebkitBackdropFilter: 'blur(8px)',
          backdropFilter: 'blur(8px)',
        }}
      />

      <div
        className={`fixed z-0 h-[50vh] transition-all duration-300 ease-in-out ${selectedMode === 1 ? 'bg-ciano-light/70' : 'bg-verde-light/70'}`}
        style={{
          width: `${bgRigth}%`,
          top: '15%',
          right: 0,
          WebkitBackdropFilter: 'blur(8px)',
          backdropFilter: 'blur(8px)',
        }}
      />
    </>
  );
}

export default BackgroundAnimated;
