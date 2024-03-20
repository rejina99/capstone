import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
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
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

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

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

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
    } catch (error) {
      setShowListingsError(true);
    }
  };

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

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='pt-8'>
  <div className='p-4 max-w-md mx-auto bg-gray-200 rounded-lg shadow-lg'>
    <h1 className='text-2xl font-semibold text-center mb-4'>Edit Your Profile</h1>
    
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
      <div className='flex justify-center'>
        <label htmlFor='avatar' className='cursor-pointer'>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type='file'
            id='avatar'
            ref={fileRef}
            hidden
            accept='image/*'
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt='profile'
            className='rounded-full h-36 w-36 object-cover cursor-pointer border-4 border-gray-400 hover:border-blue-500 transition duration-300'
          />
        </label>
      </div>
  
      <div className='text-center'>
        {fileUploadError && (
          <p className='text-red-600'>Error uploading image (image must be less than 2 MB)</p>
        )}
        {filePerc > 0 && filePerc < 100 && (
          <p className='text-gray-600'>{`Uploading ${filePerc}%`}</p>
        )}
        {filePerc === 100 && (
          <p className='text-green-600'>Image successfully uploaded!</p>
        )}
      </div>
  
      <input
        type='text'
        placeholder='Enter your new username'
        defaultValue={currentUser.username}
        id='username'
        className='border p-3 rounded-lg focus:outline-none focus:border-blue-500'
        onChange={handleChange}
      />
  
      <input
        type='email'
        placeholder='Enter your new email'
        id='email'
        defaultValue={currentUser.email}
        className='border p-3 rounded-lg focus:outline-none focus:border-blue-500'
        onChange={handleChange}
      />
  
      <input
        type='password'
        placeholder='Enter your new password'
        onChange={handleChange}
        id='password'
        className='border p-3 rounded-lg focus:outline-none focus:border-blue-500'
      />
  
      <button
        disabled={loading}
        className='bg-blue-500 text-white rounded-lg py-3 uppercase hover:bg-blue-600 disabled:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        {loading ? 'Processing...' : 'Save Changes'}
      </button>
    </form>
  
    <div className='flex justify-between items-center mt-5'>
      <span
        onClick={handleDeleteUser}
        className='text-red-600 cursor-pointer hover:underline'
      >
        Delete My Account
      </span>
      <span onClick={handleSignOut} className='text-red-600 cursor-pointer hover:underline'>
        Sign Out
      </span>
    </div>
  
    {error && (
      <p className='text-red-600 mt-5 text-center'>{error}</p>
    )}
    {updateSuccess && (
      <p className='text-green-600 mt-5 text-center'>Profile Updated Successfully!</p>
    )}
  
  <div className='flex justify-between mt-4'>
  <Link
    to={'/create-listing'}
    className='bg-green-500 text-white py-3 rounded-lg uppercase text-center w-1/2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mr-2'
  >
    Create Listing
  </Link>

  <button onClick={handleShowListings} className='bg-blue-500 text-white py-3 rounded-lg uppercase w-1/2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2'>
    View My Listings
  </button>
</div>

  
    {showListingsError && (
      <p className='text-red-600 mt-5 text-center'>Error displaying listings</p>
    )}
  
    {userListings && userListings.length > 0 && (
      <div className='mt-7'>
        <h1 className='text-3xl font-semibold text-center mb-3'>Your Listings</h1>
        {userListings.map((listing) => (
          <div key={listing._id} className='bg-gray-300 rounded-lg shadow-md p-4 flex items-center gap-4'>
            <Link to={`/listing/${listing._id}`} className='flex-shrink-0'>
              <img
                src={listing.imageUrls[0]}
                alt='listing cover'
                className='h-16 w-16 object-cover rounded-lg'
              />
            </Link>
            <div className='flex-1'>
              <Link
                className='text-gray-700 font-semibold hover:underline truncate'
                to={`/listing/${listing._id}`}
              >
                {listing.name}
              </Link>
            </div>
            <div className='flex gap-2'>
              <button
                onClick={() => handleListingDelete(listing._id)}
                className='text-red-600 uppercase hover:underline'
              >
                Delete
              </button>
              <Link to={`/update-listing/${listing._id}`}>
                <button className='text-green-600 uppercase hover:underline'>Edit</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  </div>
  
  );
}