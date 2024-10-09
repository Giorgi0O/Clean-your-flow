import React, { useState } from "react";
import CircleButton from '../Buttons/CircleButton'
import Tasks from "../ Task/Tasks";
import { useTranslation } from "react-i18next";

function CreateAction({
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
            <div className='flex justify-evenly m-4 w-5/6'>
                <input
                    id="creator"
                    className=' w-5/6 rounded-full border-2 p-2 border-ciano text-ciano-dark font-corpo'
                    value={tempValue}
                    onChange={handleTempSave}
                    onKeyDown={handleKeyPress} 
                    placeholder={t('flow-session.init-session.create-tasks.input')}
                />
                <CircleButton
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
                        <Tasks
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

export default CreateAction;