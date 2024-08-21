import './TimerForm.css';
import React, {useState} from 'react';

function TimerForm({ 
        flowTime, 
        restTime, 
        longRestTime,
        timeRemaining,     
        flow,              
        isLongRest,
        setBgMoving,
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
        const value = event.target.value;

        if (!isNaN(value) && value.trim() !== '') {
            if( value != 0 ){
                setTempFlowTime(+event.target.value*60);
            }
        }
    };
    
    const handleRestTimeChange = (event) => {
        const value = event.target.value;

        if (!isNaN(value) && value.trim() !== '') {
            if( value != 0 ){
                setTempRestTime(+event.target.value*60);
            }
        }
    };
    
    const handleLongRestTimeChange = (event) => {
        const value = event.target.value;

        if (!isNaN(value) && value.trim() !== '') {
            if( value != 0 ){
                setTempLongRestTime(+event.target.value*60);
            }
        }
    };

    const handleSave = () => {
        setFlowTime( prev => {
            if( flow ){
                var timeRem = tempFlowTime - (prev - timeRemaining) ;
                setTimeRemaining(timeRem > 0 ? timeRem : 0);
                setBgMoving(60/timeRem);
            }
            return tempFlowTime;
        });
    
        setRestTime( prev => {
            if( !flow ){
                var timeRem = tempRestTime - (prev - timeRemaining) ;
                setTimeRemaining(timeRem > 0 ? timeRem : 0);
                setBgMoving(60/timeRem);
            }
            return tempRestTime;
        });
    
        setLongRestTime( prev => {
            if( !flow  && isLongRest ){
                var timeRem = tempLongRestTime - (prev - timeRemaining) ;
                setTimeRemaining(timeRem > 0 ? timeRem : 0);
                setBgMoving(60/timeRem);
            }
            return tempLongRestTime;
        });
    }
    
    return(
        <form className='form-input'>
            <div className='slot'>
                <label htmlFor="flow-time" className='color-dark-ciano input-font' >Flow</label>
                <input
                    id="flow-time"
                    className='bg-opacity-ciano'
                    value={tempFlowTime/60}
                    onChange={handleFlowTimeChange}
                    onBlur={() => handleSave()}
                    placeholder={tempFlowTime/60}
                />
            </div>
            <div className='slot'>

                <label htmlFor="rest-time" className='color-dark-pink input-font'>Breath</label>
                <input
                    id="rest-time"
                    value={tempRestTime/60}
                    className='bg-opacity-pink'
                    onChange={handleRestTimeChange}
                    onBlur={() => handleSave()}
                    placeholder={tempRestTime/60}
                />
            </div>
            <div className='slot'>
                <label htmlFor="long-rest-time" className='color-dark-green input-font'>Break</label>
                <input
                    id="long-rest-time"
                    value={tempLongRestTime/60}
                    className='bg-opacity-green'
                    onChange={handleLongRestTimeChange}
                    onBlur={() => handleSave()}
                    placeholder={tempLongRestTime/60}
                />
            </div>
        </form>
    );
}

export default TimerForm