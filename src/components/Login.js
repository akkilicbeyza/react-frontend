import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {

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

    const handleLogin = (e) => {
        e.preventDefault();

        const url = 'https://localhost:44368/api/User/login';
        const data = {
            Email: user.email,
            UserName: user.name,
            Password: user.password
        }

        axios.post(url, data)
            .then((result) => {

                //clear();
                const dt = result.data;
                alert(dt.statusMessage);
                if (dt.statusMessage === "Login succesful") {
                    navigate('/admintable')
                }
                else{
                    navigate('/login')
                }
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
        <form>
            <h2>LOGIN</h2>

            <div class="form-outline mb-4">
                <input type="text" id="form2Example1" class="form-control" onChange={handleChange} />
                <label class="form-label" for="form2Example1">Username</label>
            </div>

            <div class="form-outline mb-4">
                <input type="password" id="form2Example2" class="form-control" onChange={handleChange} />
                <label class="form-label" for="form2Example2">Password</label>
            </div>

            <button type="button" class="btn btn-primary btn-block mb-4" onClick={(e) => handleLogin(e)}>Sign in</button>
            <button type="button" class="btn btn-primary btn-block mb-4" onClick={() => navigate('/')}>Create Account</button>

        </form>
    );
}

export default Login;