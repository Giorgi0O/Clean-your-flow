
const useTaskList = (setTaskList) => {

    const createT = (title) => {
        if (!title) return;
        setTaskList(prevList => [
            { id: Date.now(), action: title, completed: false },
            ...prevList
        ]);
    };

    const updateT = (id) => {
        if (!id) return;
        setTaskList(prevList => prevList.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteT = (id) => {
        if (!id) return;
        setTaskList(prevList => prevList.filter(task => task.id !== id));
    };

    return { createT, deleteT, updateT };
};

export default useTaskList;
