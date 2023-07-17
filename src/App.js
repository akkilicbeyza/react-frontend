import './App.css';
import PageList from './components/pages/PageList';
import HomeScreen from './components/pages/HomeScreen';
import { Routes, Route } from 'react-router-dom';
import UpdateUser from './components/pages/UpdateUser';
import CreateUser from './components/pages/CreateUser';


function App() {


  return (
      <Routes>
        <Route path='/' element={<HomeScreen></HomeScreen>}></Route>
        <Route path='/pagelist' element={<PageList></PageList>}></Route>
        <Route path='/updateuser' element={<UpdateUser></UpdateUser>}></Route>
        <Route path='/createuser' element={<CreateUser></CreateUser>}></Route>
      </Routes>
  );
}

export default App;