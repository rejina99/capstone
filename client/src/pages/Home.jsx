import React, { useEffect, useState } from "react";
import "../css/home_page.css";
import ListingItem from "../components/ListingItem";




export default function Home() {
  
  const [imageIndex, setImageIndex] = useState(0);
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=6');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=9');
        const data = await res.json();
        setRentListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();

  
  // useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevState) => (prevState + 1) % 3);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="home-page-container">
      <div className="home-page-content">
        <p>
          Welcome to our Rental Website! We offer a wide range of rental options
          for your needs.
        </p>
      </div>
      <div className="home-page-images">
        <img
          src={`https://source.unsplash.com/random/1280x720/?hotels,motels,${imageIndex}`}
          alt="Nature"
        />
        <img
          src={`https://source.unsplash.com/random/1280x720/?tour,buildings,${
            (imageIndex + 1) % 3
          }`}
          alt="City"
        />
        <img
          src={`https://source.unsplash.com/random/1280x720/?bedroom,kitchen,${
            (imageIndex + 2) % 3
          }`}
          alt="City"
        />
      </div>
      <div className="home-page-quote">
        <p>
          "The world is a book, and those who do not travel read only one page."
          <br />
          <br />
          - Saint Augustine
        </p>
      </div>


    {/* listing results for offer, sale and rent */}

    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              {/* <Link className='text-sm text-blue-800 hover:underline' to={`/search?offer=true`}>Show more offers</Link> */}
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              {/* <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link> */}
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
       
      </div>
    </div>
    
  );
}