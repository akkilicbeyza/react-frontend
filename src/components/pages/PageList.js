import React from 'react'
import './PageList.css';
import { useNavigate } from 'react-router-dom';

function PageList() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/updateuser');
  };
  const ClickHandle = () => {
    navigate('/createuser');
  };
  return (
    <table className='PageList'>
      <thead>
        <tr>
          <th>USER NAME</th>
          <th>PASSWORD</th>
          <th>UPDATE</th>
          <th>DELETE</th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td>beyza</td>
            <td>0606</td>
            <td><button className='btn-update' onClick={handleClick}>UPDATE</button></td>
            <td><button className='btn-delete'>DELETE</button></td>
          </tr>
          <tr>
            <td>ardasu</td>
            <td>0623</td>
            <td><button className='btn-update'onClick={handleClick}>UPDATE</button></td>
            <td><button className='btn-delete'>DELETE</button></td>
          </tr>
          <tr>
            <td>deneme</td>
            <td>1111</td>
            <td><button className='btn-update'onClick={handleClick}>UPDATE</button></td>
            <td><button className='btn-delete'>DELETE</button></td>
          </tr>
          <tr>
            <td>text</td>
            <td>22</td>
            <td><button className='btn-update'onClick={handleClick}>UPDATE</button></td>
            <td><button className='btn-delete'>DELETE</button></td>
          </tr>
        </tbody>
        <br></br>
        <br></br>
        <button className='btn-create'onClick={ClickHandle}>CREATE</button>
    </table>
    )
}

export default PageList;