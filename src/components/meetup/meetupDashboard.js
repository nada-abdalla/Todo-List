import './meetupDashboard.module.css'
import classes from './meetupDashboard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  Routes, Route,Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { ColorContext } from '../layout/ColorContext';
import { useState } from 'react';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import MoveTasksContext from '../layout/MoveTaskContext';
import MoveProjectsContext from '../layout/MoveProjectContext';




import Task from '../../pages/Task';
import Project from '../../pages/Project';
import Complet from '../../pages/Complet';


// const iconStyle ={
//     display: window.innerWidth <= 430 ? 'none' : 'inline-block'
// problem in this code that it runs one time
// }
const GlobalStyle = createGlobalStyle`
  .react-datepicker {
    width: 100%;
    height: 100%;
  }

  .react-datepicker__month-container {
    float: left;
    width: 100%;
    height: 100%;
  }
  .react-datepicker__day--keyboard-selected{
    background-color: #dfb6b2ba;
  }

    .react-datepicker__day--keyboard-selected, 
    .react-datepicker__month-text--keyboard-selected, 
    .react-datepicker__quarter-text--keyboard-selected, 
    .react-datepicker__year-text--keyboard-selected {
        background-color: #dfb6b2ba;
    }

  .react-datepicker__day--keyboard-selected:hover{
    background-color: ${(props) => props.color || " "};
  }
    .react-datepicker__day--selected:hover,
    .react-datepicker__day--in-selecting-range:hover, 
    .react-datepicker__day--in-range:hover, 
    .react-datepicker__month-text--selected:hover, 
    .react-datepicker__month-text--in-selecting-range:hover, 
    .react-datepicker__month-text--in-range:hover, 
    .react-datepicker__quarter-text--selected:hover, 
    .react-datepicker__quarter-text--in-selecting-range:hover, 
    .react-datepicker__quarter-text--in-range:hover, 
    .react-datepicker__year-text--selected:hover, 
    .react-datepicker__year-text--in-selecting-range:hover, 
    .react-datepicker__year-text--in-range:hover{
        background-color: ${(props) => props.color || " "};
    }
    .react-datepicker__day--selected,
    .react-datepicker__day--in-selecting-range, 
    .react-datepicker__day--in-range, 
    .react-datepicker__month-text--selected, 
    .react-datepicker__month-text--in-selecting-range, 
    .react-datepicker__month-text--in-range, 
    .react-datepicker__quarter-text--selected, 
    .react-datepicker__quarter-text--in-selecting-range, 
    .react-datepicker__quarter-text--in-range, 
    .react-datepicker__year-text--selected, 
    .react-datepicker__year-text--in-selecting-range, 
    .react-datepicker__year-text--in-range{
        background-color: ${(props) => props.color || " "};
    }


`;

const StyledDatePicker = styled(DatePicker)`
  .react-datepicker{
    background-color: #4CAF50;
  }

  .react-datepicker__day--selected {
    background-color: #4CAF50;
    color: white;
  }

  .react-datepicker__day--today {
    border: 2px solid #4CAF50;
  }
`;








function MeetupDashboard(){
    const { color } = useContext(ColorContext);
    const { tasks } = useContext(MoveTasksContext);
    const { projects } = useContext(MoveProjectsContext);
    const [isActive, setIsActive] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null)
    const navigate = useNavigate();

    const [iconStyle, setIconStyle] = useState({
        display: window.innerWidth <= 430 ? 'none' : 'inline-block'
    });

    useEffect(() => {
        const handleResize = () => {
            setIconStyle({
                 display: window.innerWidth <= 430 ? 'none' : 'inline-block'
            })
        }
        // Event Listener: Adds a resize event listener to the window object, so handleResize runs whenever the window is resized.
        window.addEventListener('resize', handleResize);
        // Cleanup the event listener on component unmount
        return () => {
        window.removeEventListener('resize', handleResize);
      };
    
    }, [])
    

    const handelChange = (date) => {
        setSelectedDate(date)
    }

    const handleClick = (index, path) => {
        setIsActive(index);
        console.log(`Navigating to ${path} with index ${index}`);
        navigate(path);
      };

    

    
    useEffect(() => {
        console.log("active tap:" ,isActive)
    }, [isActive])

    console.log('Tasks in Dashboard:', tasks);
    tasks.forEach((task, index) => {
        console.log(`Task ${index + 1}:`, task);
    });
    return(
            <div className={classes.dashboard}>
                <GlobalStyle color={color} />
                <div className={classes.main}>
                    <div className={classes.sidebar}>
                        <div className={classes.logo}>
                            <h3>To Do List</h3>
                            <div className={classes.linet} style={{backgroundColor: color}}></div>
                            <div className={classes.line} style={{backgroundColor: color}}></div>
                            <div className={classes.lineth} style={{backgroundColor: color}}></div>
                        </div>
                        <ul>
                            <li 
                                style={{backgroundColor: isActive === 0 ? color : 'white'}}
                                onClick={() => handleClick(0, '')}
                                >
                                <Link className={classes.link} to=''>

                                    <FontAwesomeIcon icon='house-circle-check' style={iconStyle} />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li 
                                style={{backgroundColor: isActive === 1 ? color : 'white'}}
                                onClick={() => handleClick(1, 'tasks')}
                                >
                                <Link className={classes.link} to='tasks'>
                                    <FontAwesomeIcon icon='list-check' style={iconStyle} />
                                    <span>Tasks</span>
                                </Link>
                            </li>
                            <li 
                                style={{backgroundColor: isActive === 2 ? color : 'white'}}
                                onClick={() => handleClick(2, 'projects')}
                            >
                                <Link className={classes.link} to='projects'>
                                    <FontAwesomeIcon icon='lock' style={iconStyle} />
                                    <span>Projects</span>
                                </Link>
                            </li>
                            <li 
                                style={{backgroundColor: isActive === 3 ? color : 'white'}}
                                onClick={() => handleClick(3,'completed' )}
                            >
                                <Link className={classes.link} to='completed'>
                                    <FontAwesomeIcon icon='check' style={iconStyle} />
                                    <span>Completed</span>
                                </Link>
                            </li>
                            
                            
                        </ul>
                    </div>
                    <div className={classes.content}>
                        <div className={classes.header}>
                            <input type='search' placeholder='Search' style={{borderColor: color}}></input>
                            <Link className={classes.link} to='/'>
                                <input type='submit' value='Logout' style={{backgroundColor: color}}></input>
                            </Link>
                        </div>
                        {isActive === null || isActive === 0 ?  (
                            <div className={classes.pref} style={{backgroundColor: color}}>
                            <div className={classes.cont}>
                                <div className={classes.projects}>
                                    <h3>Projects</h3>
                                    <ul>
                                    {projects.length > 0 ? (
                                    
                                        projects.map((project, index) => (
                                            <li key={`${project.text}-${index}`}>
                                                {project.text ? project.text : 'No text provided'}
                                            </li>
                                        ))
                                    
                                        ) : (
                                            <p>No tasks available</p>
                                        )}
                                    </ul>
                                </div>
                                <div className={classes.calender}>
                                    <StyledDatePicker
                                        inline
                                        selected={selectedDate}
                                        onChange={handelChange}
                                        dateFormat="MM/DD/YYYY"
                                        
                                    />
                                </div>
                                <div className={classes.tasks}>
                                    <h3 >Tasks</h3>
                                    <ul>
                                    {tasks.length > 0 ? (
                                        tasks.map((task, index) => (
                                            <li key={`${task.text}-${index}`}>
                                                {task.text ? task.text : 'No text provided'}
                                            </li>
                                        ))
                                        ) : (
                                            <p>No tasks available</p>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        ):(
                        <Routes>
                            <Route path='tasks' element={<Task  />} />
                            <Route path='projects' element={<Project />} />
                            <Route path='completed' element={<Complet  />} />
                        </Routes>
                        )}
                    </div>
                </div>
            </div>
    )
}


export default MeetupDashboard