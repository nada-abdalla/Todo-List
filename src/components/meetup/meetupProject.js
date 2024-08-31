import classes from './meetupProject.module.css';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import { ColorContext } from '../layout/ColorContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CompletedTaskContext from '../layout/CpmletedTaskContext';
import MoveProjectsContext from '../layout/MoveProjectContext';




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
}
`;

function MeetupProject(){
    const { color } = useContext(ColorContext);
    const {removeProject} = useContext(MoveProjectsContext);
    const { addProject } = useContext(MoveProjectsContext);
    const [inputValue, setInputValue] = useState('')
    const [project, setProject] = useState([])
    const completeCtx = useContext(CompletedTaskContext)


    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem('project')) || [];
        setProject(storedProjects);
    }, []);

    useEffect(() => {
        localStorage.setItem('project', JSON.stringify(project));
    }, [project]);



    const handelInputChange = (e) =>{
        setInputValue(e.target.value)
    }

    const addProjectHandler = () => {
        if(inputValue.trim() === ''){
            alert("You must write something!")
            return
        }

        const newProject = { id: Date.now(), text: inputValue, checked: false };
        setProject(prevProject => {
            const updatedProject = [...prevProject, newProject]
            localStorage.setItem('project', JSON.stringify(updatedProject));
            return updatedProject
        });
        addProject(newProject)
        setInputValue('');
    }

    const removeProjectHandler = (index) =>{
        const projectId = project[index].id;
        // for page complete
        completeCtx.removeComplete(projectId);
        // for dashboard
        removeProject(projectId)
        setProject(prevProjects => {
            const updatedProject = prevProjects.filter((_, i) => i !== index);
            localStorage.setItem('project', JSON.stringify(updatedProject));
            return updatedProject
        })
    }



    const toggleChecked = (index) => {
        // const newProject = project.map((item, i) => {
        //     if (i === index) {
        //         return { ...item, checked: !item.checked };
        //     }
        //     return item;
        // });
        // setProject([...newProject]);

        // const projectId = project[index].id;
        // if (newProject[index].checked) {
        //     completeCtx.removeComplete(projectId);
        // } else {
        //     completeCtx.addComplete(newProject[index]);
        // }

        setProject(prevProjects => {
            const updatedProjects = prevProjects.map((item, i) => {
                if (i === index) {
                    const newCheckedState = !item.checked; // Toggle the checked state
    
                    // Update the CompletedTaskContext
                    if (newCheckedState) {
                        completeCtx.addComplete(item); // Add to completed context if checked
                    } else {
                        completeCtx.removeComplete(item.id); // Remove from completed context if unchecked
                    }
    
                    return { ...item, checked: newCheckedState };
                }
                return item;
            });
    
            // Update local storage with the new project state
            localStorage.setItem('project', JSON.stringify(updatedProjects));
    
            return updatedProjects;
        });

    };

    return(
        <div className={classes.project} style={{backgroundColor: color}}>
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
                            onClick={addProjectHandler}
                    ></input>
                </div>
                <ul id='list-container'>
                    {project.map((projectItem, index) =>(
                        <ListItem key={`${projectItem.text}-${index}`} 
                            onClick={() => toggleChecked(index)} 
                            className={projectItem.checked ? 'checked' : ''}
                            checked={projectItem.checked}
                        >
                            {projectItem.text}
                            <span   
                                    onClick={(e) => {
                                        e.stopPropagation()   // prevent toggling when removing
                                        removeProjectHandler(index)}} 
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

export default MeetupProject

