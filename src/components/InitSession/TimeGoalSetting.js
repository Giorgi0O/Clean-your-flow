import React from "react";
import TimeGoalBar from "./TimeGoalBar";

function TimeGoalSetting({
    timeGoal,
    setTimeGoal
}) {

    return(
        <div className='card time-goal-card'>
            <div className='task-creator time-goal-set'>
                <TimeGoalBar
                    timeGoal={timeGoal}
                    setTimeGoal={setTimeGoal}
                ></TimeGoalBar>
            </div>
      </div>
    );
}

export default TimeGoalSetting