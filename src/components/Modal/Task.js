import React, { useState, useEffect } from 'react';


function Task( { 
    id,
    action,
    completed,
    update,
    deleteTask,
    updateTask
}) {

    const HandleDelete = () =>{
        deleteTask(id);
    }

    const HandleUpdate = () =>{
        updateTask(id);
    }

    const [isHover, setIsHover] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
      const checkTouchCapability = () => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
      };
  
      checkTouchCapability();
  
      window.addEventListener('resize', checkTouchCapability);
  
      return () => window.removeEventListener('resize', checkTouchCapability);
    }, []);

    return (
        <div 
            onMouseEnter={ () => setIsHover(true)} 
            onMouseLeave={ () => setIsHover(false)} 
            className='flex w-full center p-2'
        >
            <div className='flex items-center justify-start w-5/6'>
                <div className='flex justify-center'>
                    {
                        !update ?
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect className='stroke-ciano-dark' x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#1E3419"/>
                                <circle className='stroke-ciano-dark' cx="12" cy="12" r="6.5" stroke="#1E3419"/>
                            </svg>
                        :
                            <button className='' onClick={HandleUpdate}>
                                {
                                    completed ?
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect className='stroke-verde-dark' x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#1E3419"/>
                                            <circle className='fill-verde stroke-verde-dark' cx="12" cy="12" r="6.5" stroke="#1E3419"/>
                                        </svg>
                                    :
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect className='stroke-ciano-dark' x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#1E3419"/>
                                            <circle className='stroke-ciano-dark' cx="12" cy="12" r="6.5" stroke="#1E3419"/>
                                        </svg>
                                }
                            </button>
                    }
                </div>
                <span className='text-start font-corpo text-sm sm:text-lg text-ciano-dark ml-2' > {completed ? <s style={{ color: "gray"}}>{action}</s> : action } </span>
            </div>
            {
                (isHover || isTouchDevice) &&
                <button className='stroke-2 bg-none stroke-rosa-dark hover:stroke-rosa' onClick={HandleDelete}> 
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5M5 6H21M5 6V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M10 11V17M14 11V17"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            }
        </div>
    );
}

export default Task;
