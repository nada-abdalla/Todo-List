import classes from './meetupTask.module.css';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import { ColorContext } from '../layout/ColorContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CompletedTaskContext from '../layout/CpmletedTaskContext';
import MoveTasksContext from '../layout/MoveTaskContext';


const ListItem = styled.li`
position: relative;
padding-left: 40px; /* Adjust padding to make room for the symbol */
color: ${props => props.checked ? '#555' : '#000'};
text-decoration: ${props => props.checked ? 'line-through' : 'none'};
cursor: pointer;

&::before {
    content: '${props => props.checked ? '✓' : ''}';
    position: absolute;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: 3px solid #d1cdcd;
    top: 20px;
    left: 15px;
    font-size: 35px;
    line-height: 0;
    color: #d1cdcd;
}`
;

function MeetupTask(){
    const { color } = useContext(ColorContext);
    const { addTask } = useContext(MoveTasksContext);
    const {removeTask} = useContext(MoveTasksContext);
    const [inputValue, setInputValue] = useState('')
    const [tasks, setTasks] = useState([])
    const {addComplete, removeComplete} = useContext(CompletedTaskContext)



    // Load tasks from local storage when component mounts
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    // Save tasks to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handelInputChange = (e) =>{
        setInputValue(e.target.value)
    }

    const addNewTask = () => {
        if(inputValue.trim() === ''){
            alert("You must write something!")
            return
        }

        const newTask = { id: Date.now(), text: inputValue, checked: false };
        setTasks(prevTasks => {
            const updatedTasks = [...prevTasks, newTask];
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
        });
        addTask(newTask); // Add the task to the context
        setInputValue('');

    }

    const removeTaskHandler = (index) =>{
        const taskId = tasks[index].id;
        removeComplete(taskId);
        removeTask(taskId);
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.filter((_, i) => i !== index);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
        });
    }

    const toggleChecked = (index) => {
        // const taskId = tasks[index].id;
        // setTasks(prevTasks => {
        //     const updatedTasks = prevTasks.map((task, i) =>
        //         i === index ? { ...task, checked: !task.checked } : task
        //     );
        //     localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        //     return updatedTasks;
        // });

        // if (tasks[index].checked) {
        //     completeCtx.removeComplete(taskId);
        // } else {
        //     completeCtx.addComplete(tasks[index]);
        // }
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map((item, i) =>{
                if(i === index){
                    const newCheckedState = !item.checked
                    if(newCheckedState){
                        addComplete(item);
                    }else{
                        removeComplete(item.id);
                    }
                    return { ...item, checked: newCheckedState };
                }
                return item;
            })
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks
        })

    };

   

    
    return(
        <div className={classes.task} style={{backgroundColor: color}}>
            <div className={classes.main}>
                <div className={classes.header}>
                    <input  id='input-box'
                            type='text' 
                            placeholder='Creat your project here...' 
                            value={inputValue}
                            onChange={handelInputChange}
                    ></input>
                    <input  type='submit' 
                            value='add' 
                            style={{backgroundColor: color}} 
                            onClick={addNewTask}
                    ></input>
                </div>
                <ul id='list-container'>
                    {tasks.map((taskItem, index) =>(
                        <ListItem key={`${taskItem.text}-${index}`} 
                            onClick={() => {toggleChecked(index)}} 
                            className={taskItem.checked ? 'checked' : ''}
                            checked={taskItem.checked}
                        >
                            {taskItem.text}
                            <span   
                                    onClick={(e) => {
                                        e.stopPropagation()   // prevent toggling when removing
                                        removeTaskHandler(index)}} 
                                    style={{position: "relative"}}
                            >
                                <FontAwesomeIcon 
                                        icon='circle-xmark' 
                                        style={{
                                            fontSize: "23px", 
                                            position: "relative", 
                                            top: "4px", 
                                            color: color}}/>
                            </span>
                        </ListItem>
                    ))}
                </ul>
               
            </div>
        </div>
    )
}

export default MeetupTask
