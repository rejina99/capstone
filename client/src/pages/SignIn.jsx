import { useState } from 'react'
import { Link, json } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux';

import { signInStart } from '../redux/user/userSlice';
import { signInSuccess } from '../redux/user/userSlice';
import { signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';




export default function SignIn() {


const dispatch = useDispatch();


  // for loading effect on signup button

  const navigate = useNavigate();

  const { loading, error} = useSelector((state) => state.user);

  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false); 


  // State to store form data
  const [formData, setFormData] = useState({});

  // Event handler for input changes
  const handleChange = (e) => {
    // Update formData with the new input value
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // console.log(formData);

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      dispatch(signInStart());


      // setLoading(true);


      // Sending a POST request to the '/api/auth/signUp' endpoint
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        // Request headers specifying that the content type is JSON
        headers: {
          'Content-Type': 'application/json',
        },
        // Convert formData to a JSON string and include it in the request body
        body: JSON.stringify(formData),
      });

      // Parse the response as JSON
      const data = await res.json();
      if (data.success == false) {
        dispatch(signInFailure(data.message));
        // setLoading(false);
        // setError(data.message);

        return;


      }

      dispatch(signInSuccess(data));


      // setLoading(false);
      // setError(null);
      navigate('/');
      
      // console.log(data);


    }
    catch (error) {

      dispatch(signInFailure(error.message));

      // setLoading(false);
      // setError(error.message);

    }


  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
  <h1 className='text-blue-500 text-4xl text-center font-semibold my-7'>Welcome to Vacation Homes...</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/* <input className='border p-3 rounded-lg' type="text" placeholder='username' id='username' onChange={handleChange} /> */}
        <input className='border p-3 rounded-lg' type="email" placeholder='email' id='email' onChange={handleChange} />
        <input className='border p-3 rounded-lg' type="password" placeholder='password' id='password' onChange={handleChange} />

        <button disabled={loading} className='bg- bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>
          {loading ? "loading..." : 'Sign in'}
        </button>

        <OAuth/>

      </form>

      <div className='flex justify-center gap-2 mt-5'>

        <p>Dont have an account?</p>

        <Link to={"/signUp"}>

          <span className='text-blue-700'>Sign up</span>
        </Link>


      </div>

      {error && <p className=' text-red-500 mt-5'>{error}</p>}


    </div>

  )
};
