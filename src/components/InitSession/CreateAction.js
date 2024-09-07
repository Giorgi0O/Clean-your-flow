import './InitSession.css';
import React, { useState } from "react";
import Task from '../Modal/Task';
import DivisorOrizontal from '../Divisor/DivisorOrizontal';
import CircleButton from '../Buttons/CircleButton'

function CreateAction({
    taskList,
    createTask,
    deleteTask,
}){

    const [tempValue , setTempValue] = useState('');

    const handleTempSave = (event) =>{
        const value = event.target.value;
        if (value.trim) { 
            setTempValue(value);
        }
    }

    const handleSave = () => {
        if (tempValue) { 
            createTask(tempValue);
            setTempValue('');
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSave(event);
        }
    };

    return(
        <div className='card card-dim task-card'>
                <div className='creator'>
                    <input
                        id="creator"
                        className='task-input color-dark-ciano font-corpo1'
                        value={tempValue}
                        onChange={handleTempSave}
                        onKeyDown={handleKeyPress} 
                        placeholder={'Write your task here'}
                    />
                    <CircleButton
                        iconName={'x'}
                        color={'ligth-ciano'}
                        tooltip={'add task'}
                        operation={handleSave}
                    />
                </div>
                <div className='task-list'>
                    {
                        taskList.length > 0 ? 
                            (
                                taskList.map((task, index) => (
                                    <div className="action-content" key={index}>
                                        <Task 
                                            id={task.id}
                                            action={task.action}       
                                            completed={task.completed}
                                            update={false}
                                            createTask={createTask}
                                            deleteTask={deleteTask}
                                        />
                                        <DivisorOrizontal/>
                                    </div>
                                ))
                            )
                        :
                            (
                                <div className="task-empty"> <p className="sub-font"> Action list is empty </p> </div>
                            )
                    }
                </div>
        </div>
    );

}

export default CreateAction;