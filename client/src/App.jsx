import { Routes, Route, BrowserRouter } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import CreateListing from './pages/CreateListing'
import PrivateRoute from './components/PrivateRoute'
import Listing from './pages/Listing'
import UpdateListing from './pages/UpdateListing'
import Search from './pages/Search';

export default function App() {
  return (

    <BrowserRouter>


      <Header />


      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />

        <Route path='/create-listing' element={<CreateListing />} />

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/update-listing/:listingId' element={<UpdateListing />} />

        </Route>


      </Routes>
    </BrowserRouter>
  )
}
