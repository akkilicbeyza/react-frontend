import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import { BackButton } from './button/Button';
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
            <div class="form-outline mb-4">
                <input type="text" id="form2Example1" class="form-control" onChange={handleChange} />
                <label class="form-label" for="form2Example1">Username</label>
            </div>

            <div class="form-outline mb-4">
                <input type="password" id="form2Example2" class="form-control" onChange={handleChange} />
                <label class="form-label" for="form2Example2">Password</label>
            </div>

            <button type="button" class="btn btn-primary btn-block mb-4" onClick={(e) => handleLogin(e)}>Sign in</button>

            <div class="text-center">
                <p>Not a member? <a href="#!">Register</a></p>
                <p>or sign up with:</p>
                <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-facebook-f"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-google"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-twitter"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-github"></i>
                </button>

                <BackButton onClick={() => navigate(-1)} />

            </div>
        </form>
    )
}

export default Login;