import './Modal.css';
import React from 'react';


function Task( { 
    text,
    completed
}) {



    return (
        <div className="task">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#1E3419"/>
                <circle cx="12" cy="12" r="6.5" stroke="#1E3419"/>
            </svg>
            {
                completed ?
                    (           
                        <span className='font-corpo2 task-content' > <s>{text}</s> </span>
                    )
                :
                    (
                        <span className='font-corpo2 task-content' >  {text} </span>
                    )
            }
        </div>
    );
}

export default Task;
