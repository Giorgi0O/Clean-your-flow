
import React, { useState } from "react";
import "./InitSession.css";

function TimeGoalBar({
    timeGoal,
    setPageNumber,
    setTimeGoal
}) {

    const [value, setValue] = useState(timeGoal/60);

    const formatTime = (time) => {
        if (time < 60) {
            return (
                <>
                    {time} <span className='sub-font'>minutes</span>
                </>
            );
        } else {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            return (
                <>
                    {hours}:{minutes.toString().padStart(2, '0')} <span className='sub-font'>hours</span>
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

    return(
        <div className="PB-range-slider-div">
            <input
                type="range"
                min="0"
                max="300"
                value={value}
                onChange={HandleChange}
                onBlur={HandleSave}
                className="PB-range-slider test"
                id="myRange"
            />
            <p className="default-font color-dark-green">
                {formatTime(value)}
            </p>
        </div>
    );
}

export default TimeGoalBar