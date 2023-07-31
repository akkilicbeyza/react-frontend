import React, { Fragment, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

const AdminTable = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [user, setUser] = useState({ name: "", password: "", email: "", isActive: 0 })
  const [edituser, setEditUser] = useState({ editID: null, name: "", password: "", email: "", isActive: 0 })

  const handleChange = (e) => {
    if (e.target.type === "text") {
      setUser({ ...user, name: e.target.value })
      console.log(user);
    }
    else if (e.target.type === "password") {
      setUser({ ...user, password: e.target.value })
      console.log(user);
    }
    else if (e.target.type === "checkbox") {
      setUser({ ...user, isActive: e.target.value })
      console.log(user);
    }
    else {
      setUser({ ...user, email: e.target.value })
      console.log(user);
    }

  }

  const handleEditChange = (e) => {
    if (e.target.type === "text") {
      setEditUser({ ...edituser, name: e.target.value })
      console.log(edituser);
    }
    else if (e.target.type === "password") {
      setEditUser({ ...edituser, password: e.target.value })
      console.log(edituser);
    }
    else if (e.target.type === "checkbox") {
      setEditUser({ ...edituser, isActive: e.target.value })
      console.log(edituser);
    }
    else if (e.target.type === "email") {
      setEditUser({ ...edituser, email: e.target.value })
      console.log(edituser);
    }
    else {
      setEditUser({ ...edituser, editID: e.target.value })
      console.log(edituser);
    }
  }


  /*
  const handleActiveChange = (e) => {
    if (e.target.checked){
      setIsActive
    }
    else {
      user[user.isActive] = 0
    }

  }
  */

  const [data, setData] = useState([])

  useEffect(() => {
    //setData(userdata);
    getData();
  }, [])

  const getData = () => {
    axios.get('https://localhost:44368/api/User/users')
      .then((result) => {
        setData(result.data.users)
        console.log(result.data.users)
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


  const handleSave = (e) => {

    //handle blank 
    if (user.name === "" || user.password === "" || user.email === "") {
      alert("Username, password or email can not be empty");
    }


    const url = 'https://localhost:44368/api/User/registration';
    const data = {
      Email: user.email,
      UserName: user.name,
      Password: user.password,
      IsActive: user.isActive
    }

    axios.post(url, data)
      .then((result) => {
        e.preventDefault();

        getData();
        //clear();
        //const dt = result.data;
        alert("User has been added");


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


  const handleEdit = (id) => {
    //alert(id);
    setEditUser((prevState) => ({
      ...prevState,
      editID: id
    }));
    handleShow();
  }


  const handleUpdate = () => {

    const url = 'https://localhost:44368/api/User/userupdate/' + edituser.editID

    const data = {
      Id: edituser.id,
      Email: edituser.email,
      UserName: edituser.name,
      Password: edituser.password
    }

    console.log("url: ", url)
    console.log(data)
    axios.put(url, data)
      .then((result) => {
        //e.preventDefault();
        getData();
        //clear();
        //const dt = result.data;
        alert("User has been updated");


      })
      .catch((error) => {
        if (error.response) {
          console.log('Server responded with status code:', error.response.status);
          console.log('Response data:', error.response.data);
          console.log("url: ", url)
        } else if (error.request) {
          console.log('No response received:', error.request);
        } else {
          console.log('Error creating request:', error.message);
        }
      })



  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this user?") == true) {
      axios.delete('https://localhost:44368/api/User/userdelete/' + id)
        .then((result) => {
          if (result.status === 200) {
            alert("User has been deleted")
            getData();
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
  }


  return (

    <Fragment>

      <Container>
        <Row>
          <Col>
            <input type="text" className='form-control' placeholder='Enter Username' value={user.name} onChange={handleChange}></input>
          </Col>
          <Col>
            <input type="email" className='form-control' placeholder='Email' value={user.email} onChange={handleChange}></input>
          </Col>
          <Col>
            <input type="password" className='form-control' placeholder='Enter Password' value={user.password} onChange={handleChange}></input>
          </Col>
          <Col>
            <input type="checkbox" checked={user.isActive === 1 ? true : false} value={user.isActive} onChange={handleChange}></input>
            <label>IsActive</label>
          </Col>
          <Col>
            <button className='btn btn-primary' onClick={(e) => handleSave(e)}>Submit</button>
          </Col>
        </Row>
      </Container>
      <br></br>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>IsActive</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data && data.length > 0 ?
              data.map((item, index) => {
                return (
                  <tr key={index + 1}>
                    <td>{item.id}</td>
                    <td>{item.id}</td>
                    <td>{item.userName}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>{item.isActive}</td>
                    <td colSpan={2}>
                      <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button> |
                      <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>

                    </td>
                  </tr>
                )
              })
              :
              'Loading...'
          }

        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input type="text" className='form-control' placeholder='Enter Username' value={edituser.name} onChange={handleEditChange}></input>
            </Col>
            <Col>
              <input type="email" className='form-control' placeholder='Email' value={edituser.email} onChange={handleEditChange}></input>
            </Col>
            <Col>
              <input type="password" className='form-control' placeholder='Enter Password' value={edituser.password} onChange={handleEditChange}></input>
            </Col>
            <Col>
              <input type="checkbox" checked={edituser.isActive === 1 ? true : false} value={edituser.isActive} onChange={handleEditChange}></input>
              <label>IsActive</label>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="savechanges" variant="primary" onClick={() => handleUpdate(edituser.editID)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment >


  );

}

export default AdminTable

