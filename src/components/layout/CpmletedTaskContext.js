import { createContext } from "react";
import { useState } from "react";

const CompletedTaskContext =  createContext({
    completed: [],
    totalCompleted: 0,
    addComplete: ( item ) => {},
    removeComplete: ( itemId ) => {},
    itemIsComplete: ( itemId ) => {},
    setCompleted: () => {}
})

export function CompletedTaskProvider(props){
    const [completedItem, setCompletedItem] =useState([])

    function addCompleteHandeler(item){
        setCompletedItem((prevcompletedItem) => {
            return prevcompletedItem.concat(item)
        })
    }

    function removeCompleteHandeler(itemId){
        setCompletedItem((prevcompletedItem) => {
            return prevcompletedItem.filter((meetup) => meetup.id !== itemId )
        })
    }

    function itemIsCompleteHandeler(itemId){
        return completedItem.some((meetup) => meetup.id === itemId)
    }



    const context = {
        completed: completedItem,
        totalCompleted: completedItem.length,
        addComplete: addCompleteHandeler,
        removeComplete: removeCompleteHandeler,
        taskIsComplete: itemIsCompleteHandeler,
        setCompleted: setCompletedItem

    }


    return <CompletedTaskContext.Provider value={context}>
        {props.children}
    </CompletedTaskContext.Provider>
}

export default CompletedTaskContext