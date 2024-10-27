import React, {useState} from "react";
import { Trans, useTranslation } from "react-i18next";


function ISTime({
    timeGoal,
    setTimeGoal
}) {

    return(
        <div className='
            center w-full h-3/4 center p-8
            lg:w-1/2 lg:h-full
        '>
            <div className='w-full h-full card-mirror rounded-lg center flex-col'>
                <h1 className='font-titolo font-bold text-2xl m-8 text-center text-verde-dark'> 
                    <Trans i18nKey={'flow-session.init-session.set-time-goal.title'}>
                        Quanto <span className='underline-wave decoration-verde'>tempo</span> vuoi dedidicare <br/> alla sessione ?
                    </Trans>
                </h1>
                <InputRange 
                    timeGoal={timeGoal}
                    setTimeGoal={setTimeGoal}
                />
            </div>
        </div>
    );
}

function InputRange({
    timeGoal,
    setTimeGoal
}){
    const {t} = useTranslation();
    const [value, setValue] = useState(timeGoal/60);

    const formatTime = (time) => {
        if (time < 60) {
            return (
                <>
                    <span className="number font-number"> {time} </span> <span className="default-font"> {t('common.time-unit-s')}</span>
                </>
            );
        } else {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            return (
                <>
                    <span className="number font-number"> {hours}:{minutes.toString().padStart(2, '0')} </span> <span className="default-font">{t('common.time-unit-h')}</span>
                </>
            );
        }
    }

    const HandleChange = (event) => {
        setValue(+event.target.value);
    }

    const HandleSave = () =>{
        setTimeGoal(value*60);
    }

    return (
        <div className='w-full center p-8 time-goal-card'>
            <div className="PB-range-slider-div w-5/6 text-center">
                <p className="text-verde font-number text-2xl font-bold">
                    {formatTime(value)}
                </p>
                <input
                    type="range"
                    min="0"
                    max="300"
                    value={value}
                    onChange={HandleChange}
                    onBlur={HandleSave}
                    className="range range-lg mt-2 lg:range-md range-success"
                    id="myRange"
                />
            </div>
        </div>
    );
}

export default ISTime