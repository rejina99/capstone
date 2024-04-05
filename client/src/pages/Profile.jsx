import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { signOutUserStart, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice';
// import { signOutUserFailure, signOutUserSuccess, signInStart } from '../redux/user/userSlice';

import { Link } from 'react-router-dom';


export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [showListingsError, setShowListingsError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [userListings, setUserListings] = useState([]);

  // profile image upload
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      // request
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {

        dispatch(updateUserFailure(data.message));
        // setShowListingsError(true);
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);


      // Optionally, dispatch an action to update the user in Redux store
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      // setShowListingsError(true);
    }
  };

  
  // delete user 
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };


  // sign out

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      // Send signout request to the server
      const res = await fetch('/api/auth/signout');
      const data = await res.json();

      if (data.success === false) {
        // If signout was unsuccessful, dispatch deleteUserFailure action
        dispatch(deleteUserFailure(data.message));
        return;
      }

      // If signout was successful, dispatch deleteUserSuccess action
      dispatch(deleteUserSuccess(data));

      // Clear the cookie (assuming the cookie name is 'auth_token')
      document.cookie = 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
      // Redirect to the home page
      window.location.href = '/';
    } catch (error) {
      // If an error occurs during signout, dispatch deleteUserFailure action
      dispatch(deleteUserFailure(error.message));
    }
  };


  // show listing data on profile page

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
      // Handle the response data accordingly
    } catch (error) {
      setShowListingsError(true);
    }
  };

  // delete listing on profile
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId))
    } catch (error) {
      console.log(error.message);
    }

  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
         <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
       
       <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

        <input type="text" defaultValue={currentUser.username} id='username' placeholder='Username' className='border p-3 rounded-lg' onChange={handleChange} />

        <input type="email" defaultValue={currentUser.email} id='email' placeholder='Email' className='border p-3 rounded-lg' onChange={handleChange} />

        <input type="password" id='password' placeholder='Password' className='border p-3 rounded-lg' onChange={handleChange} />

        <button type="submit" className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button>

        <Link className=' bg-green-700 text-white rounded-lg uppercase text-center hover:opacity-95 p-5' to={'/create-listing'}>

          Create Listing
        </Link>


      </form>

      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>

      {/* <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p> */}


      <p className=' text-green-700'>{updateSuccess ? 'User is updated successfully... ' : ''}</p>

      <div className='flex justify-center'>

        <button onClick={handleShowListings} className='p-3 rounded-lg text-white bg-blue-700 hover:opacity-90 disabled:opacity-55'>Show Listing</button>
      </div>
      <p className=' text-red-700'>{showListingsError ? 'Error showing listings... ' : ''}</p>


      <div>


        <h2 className="text-2xl font-bold mt-4 text-center text-slate-700 mb-4">
          <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text ">
            Your Listings
          </span>, {currentUser.username}
        </h2>

        {userListings && userListings.length > 0 ? (
          userListings.map((listing) => (
            <div key={listing._id} className=' bg-gradient-to-r from-green-400 to-blue-500 text-black p-3 flex items-center border mt-3 hover:shadow-md object-cover rounded-lg transition-transform hover:scale-105'>
              {/* photo */}
              <Link to={`/listing/${listing._id}`} className="flex-shrink-0 mr-4">
                <img src={listing.imageUrls[0]} alt="listing cover" className=' h-24 w-24 object-cover rounded-lg transition-transform hover:scale-145' />
              </Link>

              <div className="flex flex-col flex-1">
                <Link to={`/listing/${listing._id}`} className="text-black font-semibold hover:underline truncate">
                  {listing.name}
                </Link>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-white">${listing.regularPrice}</p>
                  {listing.discountPrice && (
                    <p className="text-white">Discounted Price : ${listing.discountPrice}</p>
                  )}
                </div>
                <div className="  flex justify-stretch space-x-2">
                  <Link to={`/update-listing/${listing._id}`}>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">Update</button>
                  </Link>
                  
                  <button onClick={() => handleListingDelete(listing._id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No listings found.</p>
        )}
      </div>



    </div>
  );
}




// better design


// buttons
// 
{/* <div className="ml-auto flex space-x-2">
<button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">Update</button>
<button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Delete</button>
</div> */}



// // <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-lg shadow-md">

//   <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text mb-4">
//   Your Listings, {currentUser.username}
// </h2>

// {userListings && userListings.length > 0 ? (
//   userListings.map((listing) => (
//     <div key={listing._id} className='bg-white p-4 rounded-lg shadow-md mb-4'>
//       {/* photo */}
//       <Link to={`/listing/${listing._id}`} className="flex-shrink-0 mr-4">
//         <img src={listing.imageUrls[0]} alt="listing cover" className='h-16 w-16 object-cover rounded-lg' />
//       </Link>

//       <div className="flex flex-col flex-1">
//         <Link to={`/listing/${listing._id}`} className="text-slate-700 font-semibold hover:underline truncate">
//           {listing.name}
//         </Link>
//         <p className="text-gray-500 text-sm">{listing.description}</p>
//         <div className="flex justify-between items-center mt-2">
//           <p className="text-gray-700">${listing.regularPrice}</p>
//           {listing.discountPrice && (
//             <p className="text-green-500">${listing.discountPrice}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   ))
// ) : (
//   <p className="text-center text-gray-700">No listings found.</p>
// )}

// </div>
