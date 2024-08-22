import './Modal.css';
import React from 'react';


function Task( { 
    id,
    text,
    completed,
    setTaskList,
}) {

    const handleCompleted = () => {
        setTaskList(prevTasks => 
            prevTasks.map( task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };


    return (
        <div className="task">
            {
                completed ?
                    <button  className='button-only-icon' onClick={handleCompleted}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#1E3419"/>
                            <circle cx="12" cy="12" r="6.5" fill="#1E3419" stroke="#1E3419"/>
                        </svg>

                    </button>
                :
                    <button  className='button-only-icon' onClick={handleCompleted}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#1E3419"/>
                            <circle cx="12" cy="12" r="6.5" stroke="#1E3419"/>
                        </svg>
                    </button>
            }

            <span className='default-font task-content' > {completed ? <s>{text}</s> : text } </span>
        </div>
    );
}

export default Task;
