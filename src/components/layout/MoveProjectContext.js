import { createContext } from "react";
import { useState } from "react";


const MoveProjectsContext =  createContext({
    projects: [],
    addProject: (project) => {},
    removeProject: (projectId) => {},
    toggleProject: (projectId) => {}

})

export function MoveProjectsProvider(props) {

    const [project, setproject] = useState([])

    const context = {
        projects: project,
        addProject: addProjectsHandler,
        removeProject: removeProjectsHandler,
        toggleProject: toggleProjectCheckedHandler
    }

    function addProjectsHandler(project){
        setproject((prevProjects) => {
            const projectExists = prevProjects.some(existingTask => existingTask.id === project.id)
            if(projectExists){
                return prevProjects
            }
            return prevProjects.concat(project)
        })
    }
    function removeProjectsHandler(projectId){
        setproject((prevTasks) => {
            return prevTasks.filter((meetup) => meetup.id !== projectId )
        })
    }
    function toggleProjectCheckedHandler(projectId){
        setproject((prevProjects) => {
            return prevProjects.map(project => 
                project.id === projectId ? { ...project, checked: !project.checked } : project
            )
        })
    }

    return(
        <MoveProjectsContext.Provider value={context}>
            {props.children}
        </MoveProjectsContext.Provider>
    )
}

export default MoveProjectsContext