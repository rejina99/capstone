import { useState } from 'react'
import { Link, json } from 'react-router-dom'
// import { signup } from '../../../api/controllers/auth.controller';
import { useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {

  // for loading effect on signup button

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


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
      setLoading(true);


      // Sending a POST request to the '/api/auth/signUp' endpoint
      const res = await fetch('/api/auth/signUp', {
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
        setLoading(false);
        setError(data.message);

        return;


      }

      setLoading(false);
      setError(null);
      navigate('/SignIn');
      
      // console.log(data);


    }
    catch (error) {
      setLoading(false);
      setError(error.message);

    }


  };


  return (
<div className='flex justify-center items-center h-screen'>
  <div className='p-8 bg-white rounded-lg shadow-lg'>
  <h1 className='text-3xl font-semibold text-center mb-6 text-blue-400'>
  Welcome To Vacation Homes
</h1>
  <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
    <input className='border p-3 rounded-lg' type="text" placeholder='Username' id='username' onChange={handleChange} />
    <input className='border p-3 rounded-lg' type="email" placeholder='Email' id='email' onChange={handleChange} />
    <input className='border p-3 rounded-lg' type="password" placeholder='Password' id='password' onChange={handleChange} />

    <button disabled={loading} className='bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-80 focus:outline-none'>
      {loading ? "Loading..." : 'Sign Up'}
    </button>
    <OAuth/>
  </form>

  <div className='flex justify-center gap-2 mt-5'>
    <p>Already have an account?</p>
    <Link to={"/signIn"} className='text-blue-700 font-semibold'>Sign in</Link>
  </div>

  {error && <p className='text-red-500 mt-5'>{error}</p>}
</div>
</div>

  )
};
