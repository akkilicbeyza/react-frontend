import '../App.css';
import Input from './input/Input'; //o componentsi kullanmak için yapıyoruz bunu
import { Button, LoginButton } from './button/Button';
import Form from './form/Form';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Registration() {

    const [user, setUser] = useState({ name: "", password: "", email: "" })
    const handleChange = (e) => {
        if (e.target.type === "text") {
            setUser({ ...user, name: e.target.value })
            console.log(user);
        }
        else if (e.target.type === "password") {
            setUser({ ...user, password: e.target.value })
            console.log(user);
        }
        else {
            setUser({ ...user, email: e.target.value })
        }

    };

    /*
    const clear = () => {
      setUser({name: "", password: "", email: ""})
    }
    */

    const handleSave = (e) => {
        e.preventDefault();

        if (user.name === "") {
            alert("username cannot be empty");
        }
        else if (user.password === "") {
            alert("password cannot be empty");
        }
        else if (user.email === "") {
            alert("Email cannot be empty");
        }


        const url = 'https://localhost:44368/api/User/registration';
        const data = {
            Email: user.email,
            UserName: user.name,
            Password: user.password
        }

        axios.post(url, data)
            .then((result) => {

                //clear();
                const dt = result.data;
                alert("Account created succesfully.");


            })
            .catch((error) => {
                if (error.response) {
                    console.log('Server responded with status code:', error.response.status);
                    console.log('Response data:', error.response.data);
                } else if (error.request) {
                    console.log('No response received:', error.request);
                } else {
                    console.log('Error creating request:', error.message);
                }
            })

    }

    const navigate = useNavigate();

    return (
        <div className='Registration'>
            <h2>WELCOME!</h2>
            <Form>
                <Input type={"email"} value={user.email} placeHolder={"E-mail"} onChange={handleChange} />
                <Input type={"text"} value={user.name} placeHolder={"Username"} onChange={handleChange} />
                <Input type={"password"} value={user.password} placeHolder={"Password"} onChange={handleChange} />
                <Button onClick={(e) => handleSave(e)} />
                <LoginButton onClick={() => navigate('/login')} />
            </Form>
        </div>

    );
}

export default Registration;