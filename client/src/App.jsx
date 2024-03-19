import { Routes, Route, BrowserRouter } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import Profile from './pages/Profile'
import CreateListing from './pages/CreateListing'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (

    <BrowserRouter>


      <Header />


      <Routes>

      <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute />} >
        <Route path='/profile' element={<Profile />} />
        <Route path='/create-listing' element={<CreateListing />} />

        </Route>
      </Routes>

    </BrowserRouter>
  )
}
