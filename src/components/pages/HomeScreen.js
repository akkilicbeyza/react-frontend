import './HomeScreen.css';
import Input from '../input/Input'; //o componentsi kullanmak için yapıyoruz bunu
import Button from '../button/Button';
import Form from '../form/Form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function HomeScreen() {
  const [user, setUser] = useState({name: "", password: "", email: ""})
  const navigate = useNavigate();

  const handleChange = (e) => {
    if(e.target.type === "text"){
    setUser({...user, name:e.target.value})
    console.log(user);
    }
    else if (e.target.type === "password"){
      setUser({...user, password:e.target.value})
      console.log(user);
    }
    else {
      setUser({...user, email:e.target.value})
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    const url = 'https://localhost:44368/api/User/registration';
    const data = {
      Email : user.email,
      UserName : user.name,
      Password : user.password
    }
  
    axios.post(url, data)
    .then((result) => {
      const dt = result.data;
          navigate('/pagelist');

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
  };

  return (
    <div className="HomeScreen">
      <h2>WELCOME!</h2>  
      <Form>
      <Input type={"email"} value={user.email} placeHolder={"e-mail"} onChange={handleChange} />
        <Input type={"text"} value={user.name} placeHolder={"user name"} onChange={handleChange} />
        <Input type={"password"} value={user.password} placeHolder={"password"} onChange={handleChange} />
        <Button onClick={(e) => handleSave(e)} />
        <br></br>
      </Form>
    </div>
  );
}

export default HomeScreen;