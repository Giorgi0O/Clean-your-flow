
import React, { useState } from "react";
import "./InitSession.css";

function TimeGoalBar({
    timeGoal,
    setTimeGoal
}) {

    const [value, setValue] = useState(timeGoal/60);

    const formatTime = (time) => {
        if (time < 60) {
            return (
                <>
                    <span className="number font-number"> {time} </span> <span className="default-font">minutes</span>
                </>
            );
        } else {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            return (
                <>
                     <span className="number font-number"> {hours}:{minutes.toString().padStart(2, '0')} </span> <span className="default-font">hours</span>
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
            <p className="color-green">
                {formatTime(value)}
            </p>
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
        </div>
    );
}

export default TimeGoalBar