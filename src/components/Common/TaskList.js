import React from 'react';
import Task from './Task';


function TaskList( { 
    taskList,
    deleteTask,
    updateTask,
    isEditable
}) {

    return (
        <>
            <div className=' flex-col w-full h-full overflow-x-hidden overflow-y-auto'>
                {
                    taskList.map( (task,index) => (
                        <React.Fragment key={task.id}>
                            <div className='center mt'>
                                <Task 
                                    id={task.id}
                                    action={task.action}       
                                    completed={task.completed}
                                    editCompleted={isEditable}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                /> 
                            </div>
                            <div className='w-full h-[1px] bg-ciano-opacity my-2'></div>
                        </React.Fragment>
                    ))
                }
            </div>
        </>
    );
}

export default TaskList;
