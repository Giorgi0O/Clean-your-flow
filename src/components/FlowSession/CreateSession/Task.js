import React, { useState } from "react";
import BCircle from '../../Common/BCircle'
import TaskList from "../../Common/TaskList";
import { useTranslation } from "react-i18next";

function Task({
    taskList,
    createTask,
    deleteTask,
}){
    const {t} = useTranslation();
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
        <div className='card center w-full h-full flex items-center'>
            <div className='flex justify-evenly items-center m-4 w-5/6'>
                <input
                    id="creator"
                    className=' w-5/6 h-[45px] rounded-full border-2 px-3 border-ciano text-ciano-dark font-corpo'
                    value={tempValue}
                    onChange={handleTempSave}
                    onKeyDown={handleKeyPress} 
                    placeholder={t('flow-session.init-session.create-tasks.input')}
                />
                <BCircle
                    iconName={'plus'}
                    color={'primary'}
                    tooltip={'add task'}
                    operation={handleSave}
                />
            </div>
            <div className={`${ taskList.length > 0 ? 'w-5/6 p-2 h-3/4 overflow-y-auto' :'hidden' }`}>
                {
                    taskList.length > 0 &&
                    (
                        <TaskList
                            taskList={taskList}
                            deleteTask={deleteTask}
                            isEditable={false}
                        />
                    )
                }
            </div>
        </div>
    );

}

export default Task;