import React from "react";
import { useTranslation } from "react-i18next";


function Task( { 
    id,
    action,
    completed,
    editCompleted,
    deleteTask,
    updateTask
}) {

    const {t} = useTranslation();

    const HandleDelete = () =>{
        deleteTask(id);
    }

    const HandleUpdate = () =>{
        updateTask(id);
    }

    return (
        <>
            <div className='w-full flex items-center'>
                {
                    !editCompleted ?
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
                <span className='w-5/6 font-corpo ml-2 text-md'>
                    {completed ? <s style={{ color: "gray"}}>{action}</s> : action }
                </span>
            </div>
            
            <div className="dropdown dropdown-hover dropdown-left">
                <div tabIndex="0" role="button" className="bg-none border-none m-1 rotate-90"> ...</div>
                <ul tabIndex="0" className="dropdown-content  menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li> 
                        <div role='button' onClick={HandleDelete} tabIndex="0" className='btn btn-outline btn-secondary btn-sm '>
                            <svg className='text-rosa-dark' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 6H5M5 6H21M5 6V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M10 11V17M14 11V17" stroke="#7A335E" strokeWidth="2" strokeLinecap="round" strokeçinejoin="round"/>
                            </svg>
                            <span className='text-rosa-dark font-corpo font-bold'> {t('common.button.delete')} </span>
                        </div>
                    </li>
                </ul>
            </div>
        </> 

    );
}

export default Task;
