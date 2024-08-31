import classes from './meetupCompleted.module.css';
import React, { useContext } from 'react';
import { ColorContext } from '../layout/ColorContext';
import CompletedTaskContext from '../layout/CpmletedTaskContext';





function MeetupComplet(){
    const { color } = useContext(ColorContext);
    const { completed } = useContext(CompletedTaskContext);
    

    return(
        <div className={classes.complete} style={{backgroundColor: color}}>
            <div className={classes.main}>
                <div className={classes.header}>
                   <h2 style={{color: color}}>Completed Tasks</h2>
                </div>
                <ul> 
                    {completed.map((task) => (
                    <li key={task.id}>{task.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MeetupComplet