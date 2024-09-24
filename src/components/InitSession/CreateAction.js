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
        <div className='card w-full h-full flex items-center'>
            <div className='flex justify-evenly m-4 w-5/6'>
                <input
                    id="creator"
                    className=' w-5/6 rounded-full border-2 p-2 border-ciano text-ciano-dark font-corpo'
                    value={tempValue}
                    onChange={handleTempSave}
                    onKeyDown={handleKeyPress} 
                    placeholder={'Write your task here'}
                />
                <CircleButton
                    iconName={'plus'}
                    color={'primary'}
                    tooltip={'add task'}
                    operation={handleSave}
                />
            </div>
            <div className={`${ taskList.length > 0 ? 'w-full p-2 h-3/4 overflow-y-auto' :'hidden' }`}>
                <table className="table">
                    {
                        taskList.length > 0 &&
                        (
                            taskList.map((task, index) => (
                                <>
                                <tr>
                                    <Task 
                                        id={task.id}
                                        action={task.action}       
                                        completed={task.completed}
                                        update={false}
                                        createTask={createTask}
                                        deleteTask={deleteTask}
                                    />
                                </tr>
                                <tr className="center">
                                    <DivisorOrizontal></DivisorOrizontal>
                                </tr>
                                </>
                            ))
                        )
                    }
                </table>
            </div>
        </div>
    );

}

export default CreateAction;