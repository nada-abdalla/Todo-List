import { createContext } from "react";
import { useState } from "react";

const CompletedProjectContext =  createContext({
    completed: [],
    totalCompleted: 0,
    addComplete: ( project ) => {},
    removeComplete: ( projectId ) => {},
    projectIsComplete: ( projectId ) => {},
    setCompleted: () => {}
})

export function CompletedProjectProvider(props){
    const [completedProject, setCompletedProject] =useState([])

    function addCompleteHandeler(project){
        setCompletedProject((prevcompletedProject) => {
            return prevcompletedProject.concat(project)
        })
    }

    function removeCompleteHandeler(projectId){
        setCompletedProject((prevcompletedProject) => {
            return prevcompletedProject.filter((meetup) => meetup.id !== projectId )
        })
    }

    function ProjectIsCompleteHandeler(projectId){
        return completedProject.some((meetup) => meetup.id === projectId)
    }



    const context = {
        completed: completedProject,
        totalCompleted: completedProject.length,
        addComplete: addCompleteHandeler,
        removeComplete: removeCompleteHandeler,
        projectIsComplete: ProjectIsCompleteHandeler,
        setCompleted: setCompletedProject

    }


    return <CompletedTaskContext.Provider value={context}>
        {props.children}
    </CompletedTaskContext.Provider>
}

export default CompletedProjectContext