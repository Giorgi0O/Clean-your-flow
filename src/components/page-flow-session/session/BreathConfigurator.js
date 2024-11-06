import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function BreathConfigurator({
    divisionFactor,
    saveForm
}) {
    const { t } = useTranslation();

    const [tempDivisionFactor, setTempDivisionFactor] = useState(divisionFactor);

    const handleDivisionFactorChange = (event) => {
        const value = event.target.value;

        if (!isNaN(value) && value.trim() !== '') {
            if (value !== 0) {
                setTempDivisionFactor(+value);
            }
        }
    };

    const handleSave = () => {
        saveForm(tempDivisionFactor);
    }

    return (
        <form className='flex w-full justify-evenly items-center p-[20px]'>
            <div className='flex flex-col justify-center items-center overflow-hidden w-1/4 '>
                <label htmlFor="flow-time" className='text-ciano-dark font-corpo text-sm sm:text-lg font-bold sm:font-semibold' >{t('common.division-factor')}</label>
                <TimerInput id={'division-factor'} color={'rosa'} value={tempDivisionFactor} onChange={handleDivisionFactorChange} onBlur={handleSave} />
                
            </div>
        </form>
    );
}

function TimerInput({
    id,
    value,
    color,
    onChange,
    onBlur,
}) {

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onBlur();
        }
    };
    
    return (
        <input
            id={id}
            value={value}
            className={`text-center text-xl w-full h-14 rounded-md text-${color}-dark bg-${color}-light font-number font-bold sm:font-semibold focus:border-[1px] focus:outline-none focus:border-${color}-dark`}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={handleKeyPress} 
            placeholder={value}
        />
    );
}

export default BreathConfigurator