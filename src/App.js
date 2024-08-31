import {  Routes, Route } from 'react-router-dom';
import './fontAwesome'
import Login from './pages/Login'
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { ColorProvider } from './components/layout/ColorContext';

function App() {
  return (
    <div id='contianer'>
      <ColorProvider>
          <Routes>
            <Route path='/' element={ <Login />}/>
            <Route path='/signup' element={ <Signup />}/>
            <Route path='/dashboard/*' element={ <Dashboard/>}/>
          </Routes>
      </ColorProvider>
   </div>
  );
}

export default App;
