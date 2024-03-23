import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import {app} from '../firebase';
import {useDispatch} from 'react-redux';
import {signInSuccess} from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: result.user.displayName, email:result.user.email, photo:result.user.photoURL})
            }
            )
            const data = await res.json()
            dispatch(signInSuccess(data));
            navigate('/');
        } catch(error){
            console.log('Could not connect to google', error);
        }
    }
    return (
        <button
          onClick={handleGoogleClick}
          type='button'
          className='flex items-center justify-center border border-gray-300 bg-white text-black p-3 rounded-lg hover:bg-gray-100 hover:border-gray-400 focus:outline-none'>          
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" className="w-6 h-6 mr-2" />          
          Continue with google
        </button>
      );
    }
