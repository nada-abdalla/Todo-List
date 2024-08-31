import './meetupLogin.module.css'
import classes from './meetupLogin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React, { useContext } from 'react';
import { ColorContext } from '../layout/ColorContext';




function MeetupLogin(){
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || []
        const user = users.find(user => user.email === email && user.password === password)
        if(user){
            alert('Login successful!')
            navigate('/dashboard');
        }else{
            alert('Invalid email or password.')
        }
    }

    const { color, setColor } = useContext(ColorContext);
    const navigate = useNavigate();
    const iconStyle = {
        width: "50px",
        height: "50px",
        border: "4px solid",
        borderRadius: "50%",
        position: "relative",
        top: "14px",
        color: color
    }
    const handleColorClick = (newColor) => {
        setColor(newColor);
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard');
      };       
    return(
    <div className={classes.login}>
        <div className={classes.main}>
            <div className={classes.color}>
                <div onClick={() => handleColorClick('#788AB2')}></div>
                <div onClick={() => handleColorClick('#B3C1CD')}></div>
                <div onClick={() => handleColorClick('#93A0C6')}></div>
            </div>
            <div className={classes.task}>
                <p> TASK </p>
                <FontAwesomeIcon icon="check" style={iconStyle} />
            </div>
            <form className={classes.form} onSubmit={handleSubmit}>
                <input 
                    type='email' 
                    required 
                    placeholder='Email Address'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                <input 
                    type='password' 
                    required 
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <input 
                    type='submit' 
                    value="Login"  
                    style={{ backgroundColor: color}}
                    onClick={handleLogin}    
                />
            </form>
            <div className={classes.signup}>
                <p>Don't have an account?</p>
                <Link to='/signup' className={classes.link}>
                    <p style={{color: color}}>Sign Up</p>
                </Link>
            </div>
        </div>
    </div>
    )
}


export default MeetupLogin