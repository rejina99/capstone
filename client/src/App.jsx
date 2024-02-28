import { Routes, Route, BrowserRouter } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'




export default function App() {
  return (

    <BrowserRouter>


      <Header />


      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />

      </Routes>
 
    </BrowserRouter>
  )
}