import React, {useState} from 'react';

function TimerForm({ 
        flowTime, 
        restTime, 
        longRestTime,
        saveForm
    })
{

    const [tempFlowTime, setTempFlowTime] = useState(flowTime);
    const [tempRestTime, setTempRestTime] = useState(restTime);
    const [tempLongRestTime, setTempLongRestTime] = useState(longRestTime);

    const handleFlowTimeChange = (event) => {
        const value = event.target.value;

        if (!isNaN(value) && value.trim() !== '') {
            if( value !== 0 ){
                setTempFlowTime(+event.target.value*60);
            }
        }
    };
    
    const handleRestTimeChange = (event) => {
        const value = event.target.value;

        if (!isNaN(value) && value.trim() !== '') {
            if( value !== 0 ){
                setTempRestTime(+event.target.value*60);
            }
        }
    };
    
    const handleLongRestTimeChange = (event) => {
        const value = event.target.value;

        if (!isNaN(value) && value.trim() !== '') {
            if( value !== 0 ){
                setTempLongRestTime(+event.target.value*60);
            }
        }
    };

    const handleSave = () => {
        saveForm(tempFlowTime, tempRestTime, tempLongRestTime);
    }
    
    return(
        <form className='flex w-full justify-evenly items-center p-[20px]'>
            <div className='flex flex-col justify-center items-center w-1/4'>
                <label htmlFor="flow-time" className='text-ciano-dark font-corpo text-lg font-semibold' >Flow</label>
                <input
                    id="flow-time"
                    className='text-center text-xl w-14 h-14 rounded-md text-ciano-dark bg-ciano-light font-number font-semibold'
                    value={tempFlowTime/60}
                    onChange={handleFlowTimeChange}
                    onBlur={handleSave}
                    placeholder={tempFlowTime/60}
                />
            </div>
            <div className='flex flex-col justify-center items-center w-1/4'>

                <label htmlFor="rest-time" className='text-rosa-dark font-corpo text-lg font-semibold'>Breath</label>
                <input
                    id="rest-time"
                    value={tempRestTime/60}
                    className='text-center text-xl w-14 h-14 rounded-md text-rosa-dark bg-rosa-light font-number font-semibold'
                    onChange={handleRestTimeChange}
                    onBlur={handleSave}
                    placeholder={tempRestTime/60}
                />
            </div>
            <div className='flex flex-col justify-center items-center w-1/4'>
                <label htmlFor="long-rest-time" className='text-verde-dark font-corpo text-lg font-semibold'>Break</label>
                <input
                    id="long-rest-time"
                    value={tempLongRestTime/60}
                    className='text-center text-xl w-14 h-14 rounded-md text-verde-dark bg-verde-light font-number font-semibold'
                    onChange={handleLongRestTimeChange}
                    onBlur={handleSave}
                    placeholder={tempLongRestTime/60}
                />
            </div>
        </form>
    );
}

export default TimerForm