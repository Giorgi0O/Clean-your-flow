import React from "react";
import Button from '../Buttons/Button';
import Task from '../Modal/Task';
import DivisorOrizontal from '../Divisor/DivisorOrizontal';

function CreateAction({
    taskList,
    setTaskList,
    setPageNumber
}){

    const handleSave = (event) => {
        const value = event.target.value.trim();
        if (value) { 
            setTaskList(prev => {
                const newTask = { action: value, completed: false };
                return [...prev, newTask]; 
            });
            event.target.value = ''; 
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSave(event);
        }
    };

    return(
        <div className='card'>
            <h2 className='titolo-font color-dark-ciano'> Before starting, set your action </h2>
            <span className='subject default-font' > To stay focused, break down larger tasks into smaller, manageable steps. </span>
            <span className='subject default-font' >  This makes tracking progress easier and keeps you motivated </span>

            <DivisorOrizontal></DivisorOrizontal>

            <div className='task-creator'>
                <div className='creator'>
                    <label htmlFor="creator" className='color-ligth-ciano'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#A6ECEE"/>
                            <circle cx="12" cy="12" r="6.5" stroke="#A6ECEE"/>
                        </svg>
                    </label>
                    <input
                        id="creator"
                        className='task-input color-dark-ciano font-corpo1'
                        onBlur={handleSave}
                        onKeyDown={handleKeyPress} 
                        placeholder={'Write here to create new action'}
                    />
                </div>
                <div className='task-list font-corpo2'>
                    {
                        taskList.length > 0 ? 
                            (
                                taskList.map((task, index) => (
                                    <div className="action-content">
                                        <Task 
                                            key={index}
                                            id={index}
                                            text={task.action}       
                                            completed={task.completed}
                                            setTaskList={setTaskList}
                                        />
                                        <DivisorOrizontal></DivisorOrizontal>
                                    </div>
                                ))
                            )
                        :
                            <div className="task-empty"> <p className="sub-font"> Action list is empty </p> </div>
                    }
                </div>
            </div>

            {
                taskList.length > 0 ? 
                    <Button text={'Next'} iconName={'next-white'} color={'ciano'} operation={()=> setPageNumber(prev => prev+1)}></Button>
                :
                    <Button text={'Next'} iconName={'next-white'} color={'gray'}></Button>
            }

        </div>
    );

}

export default CreateAction;