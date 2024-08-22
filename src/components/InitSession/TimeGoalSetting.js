import React from "react";
import Button from '../Buttons/Button';
import DivisorOrizontal from '../Divisor/DivisorOrizontal';
import TimeGoalBar from "./TimeGoalBar";

function TimeGoalSetting({
    setPageNumber,
    timeGoal,
    setTimeGoal
}) {

    return(
        <div className='card'>
            <h2 className='titolo-font color-dark-ciano'> Set time goal </h2>
            <span className='subject default-font' > Set a time goal to stay on track. Having a clear endpoint </span>
            <span className='subject default-font' > helps you maintain focus and boosts your productivity. </span>

            <DivisorOrizontal></DivisorOrizontal>

            <div className='task-creator time-goal-set'>
                <TimeGoalBar
                    timeGoal={timeGoal}
                    setTimeGoal={setTimeGoal}
                ></TimeGoalBar>
            </div>

            <div className="time-goal-buttons">
                <Button text={'Prev'} iconName={'prev'} color={'ligth-pink'} operation={()=> setPageNumber(prev => prev-1)}></Button>
                <Button text={'Next'} iconName={'next-white'} color={'ciano'} operation={()=> setPageNumber(prev => prev+1)}></Button>
            </div>
      </div>
    );
}

export default TimeGoalSetting