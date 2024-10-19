import React from "react";

//Icons
import {ReactComponent as IconPomodoro} from '../../assets/Icons/pomodoro.svg'
import {ReactComponent as IconFlowmodoro} from '../../assets/Icons/flowmodoro.svg'

function Switch({
    selectedMode, 
    setSelectedMode,
    setTimeRemaning,
    setAutoStart,
    setTimerCount,
}){

    const handleRadioChange = (value) => {
      setSelectedMode(value);
      setTimeRemaning(value === 1 ? 25*60 : 0)
      if( value === 2 ){
        setAutoStart(false);
      }
      setTimerCount(0);
    };

    return (
        <div className='flex justify-evenly rounded-md box-border'>
            <label className={`flex items-center rounded-md px-4 py-1 m-1 border-[1px] border-ciano-dark ${selectedMode === 1 ? 'bg-ciano' : 'bg-ciano-opacity'}`}>
                <SInput value={'pomodoro'} selectedMode={selectedMode} mode={1} handleRadioChange={handleRadioChange} />
                <IconPomodoro />

            </label>
            <label className={`flex items-center rounded-md px-4 py-1 m-1 border-[1px] border-verde-dark  ${selectedMode === 2 ? 'bg-verde' : 'bg-verde-opacity'}`}>
                <SInput value={'flowmodoro'} selectedMode={selectedMode} mode={2} handleRadioChange={handleRadioChange} />
                <IconFlowmodoro />

            </label>
        </div>
    );
};

function SInput({value, selectedMode, mode, handleRadioChange}) {
    return(
        <input 
            className="hidden "
            type="radio"
            name="radio"
            value={value}
            checked={selectedMode === mode}
            onChange={() => handleRadioChange(mode)} 
        />
    );
}

export default Switch;
