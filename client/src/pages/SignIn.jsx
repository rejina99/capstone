import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (!data.success) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
<div className='flex justify-center items-center h-screen'>
  <div className='p-8 bg-white rounded-lg shadow-lg'>
  <h1 className='text-3xl font-semibold text-center mb-6 text-blue-400'>
  Welcome To Vacation Homes
</h1>

    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
      <input className='border-b-2 border-gray-400 p-3 focus:outline-none' type="email" placeholder='Enter your email' id='email' onChange={handleChange} />
      <input className='border-b-2 border-gray-400 p-3 focus:outline-none' type="password" placeholder='Enter your password' id='password' onChange={handleChange} />

      <button disabled={loading} className='bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 disabled:opacity-80 focus:outline-none'>
  {loading ? "Authenticating..." : 'Sign In'}
</button>
<OAuth/>

    </form>

    <div className='flex justify-center mt-4'>
      <p className='text-gray-800'>New here?</p>
      <Link to="/signUp" className='text-blue-500 ml-1 font-semibold'>Sign Up</Link>
    </div>

    {error && <p className='text-red-600 mt-4'>{error}</p>}
  </div>
</div>

  );
}
