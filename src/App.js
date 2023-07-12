import './App.css';
import Input from './components/input/Input'; //o componentsi kullanmak için yapıyoruz bunu
import Button from './components/button/Button';
import Form from './components/form/Form';
import { useState } from 'react';

import axios from 'axios';

function App() {
  const [user, setUser] = useState({ namme:"", passwordd:"" })
  const handleChange = (e) => {
    if(e.target.type === "text"){
    setUser({...user, namme:e.target.value})
    console.log(user);
    }
    else {
      setUser({...user, passwordd:e.target.value})
      console.log(user);
    }
  };
  const handleClick = () => {
    if(user.namme === ""){
      alert("user name cannot be empty");
    }
    else if(user.passwordd === ""){
      alert("password cannot be empty");
    }
    else{
      alert("user name: " + user.namme + " password: " + user.passwordd);
    }


    const handleSave = (e) => {
      e.preventDefault();

      const url = 'https://localhost:44368/api/User/registration';
      const data = {
        UserName : user.namme,
        Password: user.passwordd
      }

      axios.post(url,data)
      .then((result) => {

        const dt = result.data;
      })
      .catch((error) => {
        console.log(error)
      })

    }


  };
  return (
    <div className="App">
      <h2>WELCOME!</h2>  
      <Form>
        <Input type={"text"} value={user.namme} placeHolder={"user name"} onChange={handleChange} />
        <Input type={"password"} value={user.passwordd} placeHolder={"password"} onChange={handleChange} />
        <Button onClick={handleClick} />
      </Form>
    </div>
  );
}

export default App;
