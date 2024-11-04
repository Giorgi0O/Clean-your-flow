import React from 'react';
import Task from './Task';
import useTaskList from '../../hooks/useTaskList';


function TaskList( { 
    taskList,
    setTaskList,
    isEditable,
    viewCompletedTask
}) {

    const {deleteT, updateT} = useTaskList(setTaskList);

    const incompleteTasks = taskList.filter(task => !task.completed);
    const filterList = viewCompletedTask ? incompleteTasks : taskList;

    return (
        <>
            <div className=' flex-col w-full h-full overflow-x-hidden overflow-y-auto'>
                {
                    filterList.map( (task,index) => (
                        <React.Fragment key={task.id}>
                            <div className='center mt'>
                                <Task 
                                    id={task.id}
                                    action={task.action}       
                                    completed={task.completed}
                                    editCompleted={isEditable}
                                    deleteTask={deleteT}
                                    updateTask={updateT}
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
