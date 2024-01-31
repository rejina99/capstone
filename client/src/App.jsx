import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import About from './pages/About';

export default function App(){
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />    
    <Route path="/about" element={<About />} />
    <Route path="/profile" element={<Profile />} />


  </Routes>
  </BrowserRouter>
}