import '../Timer/Timer.css';
import React from 'react';

function StopButton({ iconName, operation}) {


    return (
        <button className={`primary-button bg-stop`} onClick={operation}>
            <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    d="M13.3333 20V12M18.6667 20V12M29.3333 16C29.3333 23.3638 23.3638 29.3334 16 29.3334C8.63619 29.3334 2.66666 23.3638 2.66666 16C2.66666 8.63622 8.63619 2.66669 16 2.66669C23.3638 2.66669 29.3333 8.63622 29.3333 16Z" 
                    stroke="#7A335E" 
                    strokeWidth="1.5px" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
            </svg>
            <span>Stop</span>
        </button>
    );
}


export default StopButton