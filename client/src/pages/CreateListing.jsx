import React, { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { set } from "mongoose";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function CreateListing() {

    const {currentUser} = useSelector(state => state.user)
    const [files, setFiles] = useState([])
    const navigate = useNavigate();
    // console.log(files);

    const [formData, setFormData] = useState({
        imageUrls: [],
        name:'',
        description:'',
        address:'',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 40,
        discountPrice: 40,
        offer: false,
        parking: false,
        furnished: false,
        currentUser: currentUser._id
        

    })

    const [imageUploadError, setImageUploadError] = useState(false);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    console.log(formData);

    const handleImageSubmit = (e) => {
        // e.preventDefault();

        if (files.length > 0 && files.length < 7) {
            setImageUploadError(false);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }

            Promise.all(promises).then((urls) => {
                setFormData({
                    ...formData, imageUrls: formData.imageUrls.concat(urls),


                });

                setImageUploadError(false);

            })
                .catch((error) => {
                    setImageUploadError("Error in uploading image (2 mb max size");
                });
            }
            else {
                setImageUploadError('Max images to upload is 6');
            }

        }
    

    // for removing image 
    const handleRemoveImage = (index) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
      };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);

                },

                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    })
                }

            )

        })
    }

    const handleChange = (e) => {

        if(e.target.id === "rent")
        {
            setFormData({
                ...formData,
                type : e.target.id
            })
        }

        if(e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer")
        {
            setFormData({
                ...formData,
                [e.target.id.toLowerCase()] : e.target.checked
            })
        }

        if(e.target.type === "number" || e.target.type === "text" || e.target.type === "textarea") {
            setFormData({
                ...formData,
                [e.target.id] : e.target.value

            })
        }



    }


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);
            setError(false);

            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,

                }),
            })

            const data = await res.json();
            setLoading(false);

            
            if(data.success == false)
            {
                setError(data.message);
            }


            // Send the data on listing page with Id.
            navigate(`/listing/${data._id}`)


        }
        catch(error)
        {

            setError(error.message);
            setLoading(false);

        }

        console.log(currentUser._id);


    }

    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Create Listing</h1>

            <form className="flex flex-col sm:flex-col" onSubmit={handleSubmit}>

                <div className="flex flex-col gap-4 flex-1">
                    <input type="text" placeholder="Name" className="border p-3 rounded-lg" id="name" maxLength="62" minLength="4" onChange={handleChange} value={formData.name} required />
                    <textarea type="text" placeholder="Description" className="border p-3 rounded-lg" id="description" maxLength="100000" minLength="5" onChange={handleChange} value={formData.description} required />
                    <input type="text" placeholder="Address" className="border p-3 rounded-lg" id="address" maxLength="62" minLength="10" onChange={handleChange} value={formData.address} required />

                    <div className=" flex gap-6 flex-wrap">

                        
                        <div className=" flex gap-2">
                            <input type="checkbox" id="rent" className="w-5" onChange={handleChange} checked={formData.type === "rent"} />
                            <span>Rent</span>
                        </div>
                        <div className=" flex gap-2">
                            <input type="checkbox" id="parking" className="w-5" onChange={handleChange} checked={formData.parking} />
                            <span>Parking Spot</span>
                        </div>
                        <div className=" flex gap-2">
                            <input type="checkbox" id="furnished" className="w-5" onChange={handleChange} checked={formData.furnished} />
                            <span>Furnished</span>
                        </div>
                        <div className=" flex gap-2">
                            <input type="checkbox" id="offer" className="w-5" onChange={handleChange} checked={formData.offer} />
                            <span>Offer</span>
                        </div>

                    </div>

                    <div className="flex gap-6 flex-wrap">
                        <div className=" flex items-center gap-2">
                            <input className=" p-3 border border-gray-300 rounded-lg" type="number" id="bedrooms" min='1' max='10' onChange={handleChange} value={formData.bedrooms} required />
                            <p>Beds</p>
                        </div>

                        <div className=" flex items-center gap-2">
                            <input className=" p-3 border border-gray-300 rounded-lg" type="number" id="bathrooms" min='1' max='10' onChange={handleChange} value={formData.bathrooms} required />
                            <p>Baths</p>
                        </div>

                        <div className=" flex items-center gap-2">
                            <input className=" p-3 border border-gray-300 rounded-lg" type="number" id="regularPrice" min='1' max='10000000000' onChange={handleChange} value={formData.regularPrice} required />
                            <p>Regular Price</p>
                            {formData.type === 'rent' && (
                            <span className=" text-xs">($ / day)</span>
                            )}
                        </div>

                        {formData.offer && (

                        <div className=" flex items-center gap-2">
                            <input className=" p-3 border border-gray-300 rounded-lg" type="number" id="discountPrice" min='1' max='1000000000' onChange={handleChange} value={formData.discountPrice} required />
                            <p>Discounted Price</p>
                            {formData.type === 'rent' && (
                            <span className=" text-xs">($ / day)</span>
                            )}
                        </div>
                        )}
                    </div>

                </div>

                <div className=" my-4">
                    <p className="font-semibold">Images:
                        <span className=" font-normal text-gray-600 ml-2">First image is set as cover image..</span>
                    </p>

                    <div className="flex flex-row gap-2 h-24">
                        <input onChange={(e) => setFiles(e.target.files)} className=" p-3 border border-gray-300 rounded w-full" type="file" id="images" accept="image/*" multiple />
                        <button type="button" onClick={handleImageSubmit} className="p-3 my-4 bg-green-700 text-white border border-green-600 rounded uppercase hover:opacity-85 disabled:opacity-60">Upload</button>

                    </div>

                </div>
                <p className='text-red-700 text-sm'>
            {       imageUploadError && imageUploadError}
                </p>
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (

                        <div key={index} className="flex justify-between p-3 border items-center">
                            <img src={url} alt="Listing Images" className="w-30 h-20 object-cover rounded-lg" />
                            <button className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"  onClick={() => handleRemoveImage(index)}>
                                Delete
                            </button>

                        </div>
                    ))
                }



                <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-60">{loading ? 'Creating...' : 'Create Listing'}</button>

{
    error && <p className=" text-red-700 text-sm"> {error} </p>
}


            </form>
        </main>
    )
}