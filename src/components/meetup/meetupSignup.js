import './meetupLogin.module.css'
import classes from './meetupSignup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React, {useContext} from 'react';
import { ColorContext } from '../layout/ColorContext';



function MeetupSignup(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleSignup = () => {
        const users = JSON.parse(localStorage.getItem('users')) || []
        const userExists = users.some(user => user.email === email);
        if(userExists){
            alert("Email already exists");
            return
        }

        const newUser = { email, password};
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        alert("Sign up successful!")
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
                <input type='text' required placeholder='User Name'/>
                <br/>
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
                    value="Sign Up"  
                    style={{ backgroundColor: color}}
                    onClick={handleSignup}
                    />
            </form>
            <div className={classes.signup}>
                <p>Already have an account? </p>
                <Link to='/' className={classes.link}>
                    <p style={{color: color}}>Login</p>
                </Link>
            </div>
        </div>
    </div>
    )
}


export default MeetupSignup