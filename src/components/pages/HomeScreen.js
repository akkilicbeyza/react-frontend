import './HomeScreen.css';
import Input from '../input/Input'; //o componentsi kullanmak için yapıyoruz bunu
import Button from '../button/Button';
import Form from '../form/Form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function HomeScreen() {
  const [user, setUser] = useState({name: "", password: ""})
  const navigate = useNavigate();

  const handleChange = (e) => {
    if(e.target.type === "text"){
    setUser({...user, name:e.target.value})
    console.log(user);
    }
    else {
      setUser({...user, password:e.target.value})
      console.log(user);
    }
  };
  const handleClick = () => {
    navigate('/pagelist');
  };

  const handleSave = (e) => {
    e.preventDefault();

    const url = 'https://localhost:44368/api/User/registration';
    const data = {
      UserName : user.name,
      Password : user.password
    }
  
    axios.post(url, data)
    .then((result) => {
      const dt = result.data;
      })
    .catch((error) => {
      console.log(error)
    })
  };

  return (
    <div className="HomeScreen">
      <h2>WELCOME!</h2>  
      <Form>
        <Input type={"text"} value={user.name} placeHolder={"user name"} onChange={handleChange} />
        <Input type={"password"} value={user.password} placeHolder={"password"} onChange={handleChange} />
        <Button onClick={handleSave} />
        <br></br>
        <Button onClick={handleClick}>geç</Button>
      </Form>
    </div>
  );
}

export default HomeScreen;