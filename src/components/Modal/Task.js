import CircleButton from '../Buttons/CircleButton';
import './Modal.css';
import React, { useState } from 'react';


function Task( { 
    id,
    action,
    completed,
    setTaskList,
    isCompleted
}) {

    const [done, setDone] = useState(completed);

    const completeTask = () => {
        setTaskList(prevTasks => 
            prevTasks.map( task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
        setDone(!done);
    };
    
    const deleteTask = () => {
        setTaskList(prevTasks => 
            prevTasks.filter(task => task.id !== id)
        );
    };

    const capitalizeFirstLetter = (sentence) => {
      if (!sentence) return '';
      return sentence.charAt(0).toUpperCase() + sentence.slice(1);
    }

    return (
        <div className="task">
            <div className='task-icon-action'>
                <div className='task-icon'>
                    {
                        !isCompleted ?
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#1E3419"/>
                                <circle cx="12" cy="12" r="6.5" stroke="#1E3419"/>
                            </svg>
                        :
                        (
                            done ?
                                <CircleButton iconName={'task-completed'} color={'none'} operation={completeTask}></CircleButton>
                            :
                                <CircleButton iconName={'task'} color={'none'}  operation={completeTask} ></CircleButton>
                        )
                    }
                </div>
                <span className='default-font task-content' > {completed ? <s style={{ color: "gray"}}>{capitalizeFirstLetter(action)}</s> : capitalizeFirstLetter(action) } </span>
            </div>
            <button className={`button-only-icon`} onClick={deleteTask}> 
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H5M5 6H21M5 6V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M10 11V17M14 11V17" stroke="#7A335E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    );
}

export default Task;
