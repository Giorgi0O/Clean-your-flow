import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function TimerConfigurator({
    flowTime,
    restTime,
    longRestTime,
    saveForm
}) {
    const { t } = useTranslation();

    const [tempFlowTime, setTempFlowTime] = useState(flowTime);
    const [tempRestTime, setTempRestTime] = useState(restTime);
    const [tempLongRestTime, setTempLongRestTime] = useState(longRestTime);

    const handleFlowTimeChange = (event) => {
        const value = event.target.value;

        if (!isNaN(value) && value.trim() !== '') {
            if (value !== 0) {
                setTempFlowTime(+event.target.value * 60);
            }
        }
    };

    const handleRestTimeChange = (event) => {
        const value = event.target.value;

        if (!isNaN(value) && value.trim() !== '') {
            if (value !== 0) {
                setTempRestTime(+event.target.value * 60);
            }
        }
    };

    const handleLongRestTimeChange = (event) => {
        const value = event.target.value;

        if (!isNaN(value) && value.trim() !== '') {
            if (value !== 0) {
                setTempLongRestTime(+event.target.value * 60);
            }
        }
    };

    const handleSave = () => {
        saveForm(tempFlowTime, tempRestTime, tempLongRestTime);
    }

    return (
        <form className='flex w-full justify-evenly items-center p-[20px]'>
            <div className='flex flex-col justify-center items-center overflow-hidden w-1/4 '>
                <label htmlFor="flow-time" className='text-ciano-dark font-corpo text-sm sm:text-lg font-bold sm:font-semibold' >{t('common.flow')}</label>
                <TimerInput id={'flow-time'} color={'ciano'} value={tempFlowTime} onChange={handleFlowTimeChange} onBlur={handleSave} />
                
            </div>
            <div className='flex flex-col justify-center items-center overflow-hidden w-1/4'>
                <label htmlFor="rest-time" className='text-rosa-dark font-corpo text-sm sm:text-lg font-bold sm:font-semibold'>{t('common.breath')}</label>
                <TimerInput id={'rest-time'} value={tempRestTime} color={'rosa'} onChange={handleRestTimeChange} onBlur={handleSave} />

            </div>
            <div className='flex flex-col justify-center items-center overflow-hidden w-1/4'>
                <label htmlFor="long-rest-time" className='text-verde-dark font-corpo text-sm sm:text-lg font-semibold'>{t('common.break')}</label>
                <TimerInput id={'long-rest-time'} value={tempLongRestTime} color={'verde'} onChange={handleLongRestTimeChange} onBlur={handleSave} />

            </div>
        </form>
    );
}

function TimerInput({
    id, //long-rest-time
    value, //longRestTime
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
            value={value / 60}
            className={`text-center text-xl w-full h-14 rounded-md text-${color}-dark bg-${color}-light font-number font-bold sm:font-semibold focus:border-[1px] focus:outline-none focus:border-${color}-dark`}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={handleKeyPress} 
            placeholder={value / 60}
        />
    );
}

export default TimerConfigurator