import '../Timer.css';
import React, {useState} from 'react';
import {formatTime} from "../../../utils/Common"

function TimerForm({ 
        flowTime, 
        restTime, 
        longRestTime,
        timeRemaining,     
        flow,              
        inputTime,
        isLongRest,
        setInputTime,      
        setFlowTime,       
        setRestTime,       
        setLongRestTime,   
        setTimeRemaining
    })
{

    const [tempFlowTime, setTempFlowTime] = useState(flowTime);
    const [tempRestTime, setTempRestTime] = useState(restTime);
    const [tempLongRestTime, setTempLongRestTime] = useState(longRestTime);

    const handleFlowTimeChange = (event) => {
        setTempFlowTime(+event.target.value*60);
    };
    
    const handleRestTimeChange = (event) => {
        setTempRestTime(+event.target.value*60);
    };
    
    const handleLongRestTimeChange = (event) => {
        setTempLongRestTime(+event.target.value*60);
    };

    const handleSave = () => {
        setFlowTime( prev => {
            if( flow ){
                var timeRem = tempFlowTime - (prev - timeRemaining) ;
                setTimeRemaining(timeRem > 0 ? timeRem : 0);
            }
            return tempFlowTime;
        });
    
        setRestTime( prev => {
            if( !flow ){
                var timeRem = tempRestTime - (prev - timeRemaining) ;
                setTimeRemaining(timeRem > 0 ? timeRem : 0);
            }
            return tempRestTime;
        });
    
        setLongRestTime( prev => {
            if( !flow  && isLongRest ){
                var timeRem = tempLongRestTime - (prev - timeRemaining) ;
                setTimeRemaining(timeRem > 0 ? timeRem : 0);
            }
            return tempLongRestTime;
        });
    
        setInputTime(!inputTime)
    }
    
    return(
        <div className='count-down'>
            <form className='form-input'>
                <div className='input-style'>
                    <label htmlFor="flow-time">Flow :</label>
                    <input
                        type="number"
                        id="flow-time"
                        value={tempFlowTime/60}
                        onChange={handleFlowTimeChange}
                        placeholder={formatTime(flowTime)}
                    />
                    <label htmlFor="rest-time">Rest :</label>
                    <input
                        type="number"
                        id="rest-time"
                        value={tempRestTime/60}
                        onChange={handleRestTimeChange}
                        placeholder={formatTime(restTime)}
                    />
                    <label htmlFor="long-rest-time">Long rest:</label>
                    <input
                        type="number"
                        id="long-rest-time"
                        value={tempLongRestTime/60}
                        onChange={handleLongRestTimeChange}
                        placeholder={formatTime(longRestTime)}
                    />
                </div>
                <div>
                    <button type="button" onClick={() => setInputTime(false)}> Chiudi </button>
                    <button type="submit" onClick={handleSave}> Salva </button>
                </div>
            </form>
        </div>
    );
}

export default TimerForm