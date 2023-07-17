import React from 'react'
import './CreateUser.css';
import { useNavigate } from 'react-router-dom';


function CreateUser() {
    const navigate = useNavigate();

    
    const handleClick = () => {
        navigate('/pagelist');
      };

  return (
    <div className='CreateUser'>
        <h2>create user</h2>
        <input className='input-username' type={"text"} placeHolder={"user name"}></input>
        <br></br>
        <input className='input-password' type={"password"} placeHolder={"password"}/>
        <br></br>
        <button className='btn-save' onClick={handleClick}>save</button>
    </div>
    );
}

export default CreateUser;