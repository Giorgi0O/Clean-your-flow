import React from 'react';

function StopButton({operation, type}) {


    return (
        <button className={`btn w-52 m-4 border-rosa-dark hover:bg-rosa-light hover:border-rosa-light btn-secondary bg-stop`} onClick={operation}>
            {
                type === 2 ?
                (
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 29.3334C23.3638 29.3334 29.3333 23.3638 29.3333 16C29.3333 8.63622 23.3638 2.66669 16 2.66669C8.63621 2.66669 2.66667 8.63622 2.66667 16C2.66667 23.3638 8.63621 29.3334 16 29.3334Z" stroke="#0D5355" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.3333 10.6667L21.3333 16L13.3333 21.3334V10.6667Z" stroke="#0D5355" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                )
                :
                (
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
                    
                )
            }

            <span className='font-titolo text-2xl text-rosa-dark font-bold'>{type === 2 ? 'Breath' : 'Stop' }</span>
        </button>
    );
}


export default StopButton