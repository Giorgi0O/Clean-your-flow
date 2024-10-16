import React from "react";

import {ReactComponent as IconPomodoro } from '../../assets/Icons/pomodoro.svg'
import {ReactComponent as IconFlowmodoro } from '../../assets/Icons/flowmodoro.svg'

function ModeSetting({
    selectedMode,
    setSelectedMode,
}) {

    const handleRadioChange = (value) => {
        setSelectedMode(value);
    }
    
    return(
        <div className='m-8 flex justify-evenly items-center w-full'>
            <div className='flex flex-col justify-center items-center'>
                <label className={`p-10 md:p-14 mb-2 rounded-full flex items-center border-[1px] border-ciano-dark ${selectedMode === 1 ? 'bg-ciano' : 'bg-ciano-opacity'}`} >
                    <input 
                        className="hidden "
                        type="radio"
                        name="radio"
                        value='pomodoro'
                        checked={selectedMode === 1}
                        onChange={() => handleRadioChange(1)} 
                    />

                    <IconPomodoro className="w-[32px] h-[32px] md:w-[54px] md:h-[54px]"></IconPomodoro>
                </label>
                <span className={`font-corpo ${selectedMode === 1 ? 'text-ciano-dark' : 'text-ciano-light'}`} > Pomodoro </span>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <label className={`p-10 md:p-14 mb-2 rounded-full flex items-center  border-[1px] border-verde-dark  ${selectedMode === 2 ? 'bg-verde' : 'bg-verde-opacity'}`}>
                    <input 
                        className='hidden'
                        type="radio"
                        name="radio"
                        value='flowmodoro'
                        checked={selectedMode === 2}
                        onChange={() => handleRadioChange(2)} 
                    />
                    <IconFlowmodoro className="w-[32px] h-[32px] md:w-[54px] md:h-[54px]"></IconFlowmodoro>
                </label>
                <span className={`font-corpo ${selectedMode === 2 ? 'text-verde-dark' : 'text-verde-light'}`} > Flowmodoro </span>
            </div>
        </div>
    );
}

export default ModeSetting