import { createContext } from "react";
import { useState } from "react";


const MoveTasksContext =  createContext({
    tasks: [],
    addTask: (task) => {},
    removeTask: (taskId) => {},
    toggleTask: (taskId) => {}

})

export function MoveTasksProvider(props) {

    const [task, setTask] = useState([])

    const context = {
        tasks: task,
        addTask: addTasksHandler,
        removeTask: removeTasksHandler,
        toggleTask: toggleTaskCheckedHandler
    }

    function addTasksHandler(task){
        setTask((prevTasks) => {
            const taskExists = prevTasks.some(existingTask => existingTask.id === task.id)
            if(taskExists){
                return prevTasks
            }
            return prevTasks.concat(task)
        })
    }
    function removeTasksHandler(taskId){
        setTask((prevTasks) => {
            return prevTasks.filter((meetup) => meetup.id !== taskId )
        })
    }
    function toggleTaskCheckedHandler(taskId){
        setTask((prevTasks) => {
            return prevTasks.map(task => 
                task.id === taskId ? { ...task, checked: !task.checked } : task
            )
        })
    }

    return(
        <MoveTasksContext.Provider value={context}>
            {props.children}
        </MoveTasksContext.Provider>
    )
}

export default MoveTasksContext