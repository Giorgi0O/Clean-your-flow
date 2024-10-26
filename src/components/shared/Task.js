import React from "react";
import { useTranslation } from "react-i18next";
import DropDownMenu from "./DropDownMenu";

//icons
import {ReactComponent as IconTask } from '../../assets/Icons/task.svg'
import {ReactComponent as IconTaskCompleted } from '../../assets/Icons/task-completed.svg' 
import {ReactComponent as IconTrash } from '../../assets/Icons/trash.svg'


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
                        <IconTask />
                    :
                        <button className='' onClick={HandleUpdate}>
                            {
                                completed ? <IconTaskCompleted /> :  <IconTask />
                            }
                        </button>
                }
                <span className='w-5/6 font-corpo ml-2 text-md'>
                    {completed ? <s style={{ color: "gray"}}>{action}</s> : action }
                </span>
            </div>

            <DropDownMenu>
                <div role='button' onClick={HandleDelete} tabIndex="0" className='btn btn-outline btn-secondary btn-sm '>
                    <IconTrash className="text-rosa-dark" />
                    <span className='text-rosa-dark font-corpo font-bold'> {t('common.button.delete')} </span>
                </div>
            </DropDownMenu>
        </> 
    );
}

export default Task;