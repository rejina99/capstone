import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice';


export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});



  const dispatch = useDispatch();
  const [showListingsError, setShowListingsError] = useState(false);



  // console.log(formData);



  const handleShowListings = async () => {

    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);


      console.log(data);

    } catch (error) {
      setShowListingsError(true);
    }
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };



//  const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(updateUserStart());
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       // if (data.success === false) {
//       //   dispatch(updateUserFailure(data.message));
//       //   return;
//       // }

//       dispatch(updateUserSuccess(data));
//       // setUpdateSuccess(true);
//     } catch (error) {
//       dispatch(updateUserFailure(error.message));
//     }
//   };

  // const handleDeleteUser = async () => {
  //   try {
  //     dispatch(deleteUserStart());
  //     const res = await fetch(`/api/user/delete/${currentUser._id}`, {
  //       method: 'DELETE',
  //     });
  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(deleteUserFailure(data.message));
  //       return;
  //     }
  //     dispatch(deleteUserSuccess(data));
  //   } catch (error) {
  //     dispatch(deleteUserFailure(error.message));
  //   }
  // };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        {currentUser.avatar ? (
          <img
            src={formData?.avatar || currentUser.avatar}
            alt="Profile"
            className='rounded-full h-24 w-24 object-cover cursor-pointer mx-auto mt-2'
          />
        ) : (
          <div className='text-center text-gray-500'>No avatar available</div>
        )}

        <input type="text" defaultValue={currentUser.username} id='username' placeholder='Username' className='border p-3 rounded-lg'  onChange={handleChange} />

        <input type="email" defaultValue={currentUser.email} id='email' placeholder='Email' className='border p-3 rounded-lg' onChange={handleChange} />

        <input type="password" id='password' placeholder='Password' className='border p-3 rounded-lg' onChange={handleChange} />

        {/* <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button> */}

        <button onClick={handleShowListings} className='h-14 rounded-lg text-white bg-blue-700 hover:opacity-90 disabled:opacity-55'>Show Listing</button>


      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>

      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>



    </div>
  );
}
