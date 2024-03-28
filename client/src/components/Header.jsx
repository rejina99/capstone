import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import CreateListing from '../pages/CreateListing'
import { useSelector } from 'react-redux'


export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className='bg-slate-200 shadow-md '>
      <div className='flex justify-between items-center max-w-6xl max-auto p-3'>



        <Link to="/">

          <h1 className='font-bold text-sm sm:text-lg flex-wrap'>
            <span className='text-blue-500 font-bold'>Vacation</span>
            <span className='text-green-500 font-bold'>Homes</span>
          </h1>

        </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input type="text" placeholder='search...' className=' bg-transparent focus:outline-none w-24 sm:w-64 md:w-44' />

          <FaSearch className='text-slate-600' />


        </form>


        <ul className='flex gap-4'>


          <Link to="/">
            <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
          </Link>

          <Link to="/about">
            <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
          </Link>

          {/* <Link to={"/create-listing"}>
            <li className='hidden sm:inline text-slate-700 hover:underline'>Listing</li>
          </Link> */}

          <Link to={"/signin"}>

            <li className=' text-slate-700 hover:underline'> Sign in</li>
          </Link> 



          <Link to={"/profile"}>
            {currentUser ? (
              <img
                className=' rounded h-10 w-10 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>









        </ul>

      </div>



    </header>

  )
}
