import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
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
    <div className="containerr">
    <div className="home-page-container">
      <div className="home-page-content">
        <p>
        Looking for the <span className="highlight">Best place</span> to rent for your Vacation?!
        </p>
        <br></br>
          <p>Vacation Homes is here for you.</p>
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

      <div className="home-page-featured-properties">
          <h2>Featured Properties</h2>
          <hr className="hr-home"></hr>
         
    {/* listing results for offer, sale and rent */}

    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={`/search?offer=true`}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-8'>
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
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
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
      {/* Why Vacation Homes */}
        <div className='home-content'>
          <h1 className='home-title'>Why choose us?</h1>
          <hr className='hr'></hr>
          <p className='home-description'>
            When selecting your ideal vacation destination, choose Vacation Homes for an unparalleled experience of comfort, convenience, and security. Our platform offers a diverse range of meticulously curated properties, each vetted to meet the highest standards of quality and safety. Whether you're seeking a cozy cabin retreat or a luxurious beachfront villa, our extensive selection ensures that you'll find the perfect accommodation to suit your preferences. With our commitment to trust and verification, you can book with confidence, knowing that both hosts and guests undergo thorough verification processes. Moreover, our secure payment system and stringent safety protocols provide added peace of mind throughout your booking journey. Trust Vacation Homes to elevate your travel experience with unparalleled safety, reliability, and satisfaction.
          </p>
        </div>
        {/* safety and security */}
        <div className='home-content'>
          <h1 className='home-title'>Safety and Security with Vacation Homes.</h1>
          <hr className='hr'></hr>
          <p className='home-description'>
            At Vacation Homes, your safety and security are our top priorities. We understand the importance of feeling secure when booking accommodations for your well-deserved vacation. That's why we've implemented robust verification processes for both hosts and guests, ensuring that you interact with genuine individuals you can trust. Our secure payment processing system utilizes industry-leading encryption technologies, safeguarding your financial information throughout every transaction. Additionally, our comprehensive safety guidelines and tips empower you with the knowledge to stay safe during your stay. Rest assured, our 24/7 customer support team is always available to assist you, providing immediate assistance in any emergency situation. With Vacation Homes, you can book your dream getaway with confidence, knowing that we're dedicated to providing you with a safe and enjoyable experience every step of the way.
          </p>
        </div>

      <div className="home-page-quote">
        <p>
          "The world is a book, and those who do not travel read only one page."
          <br />
          <br />
          - Saint Augustine
        </p>
      </div>
</div>

           {/* footer */}

           <footer className='footer-home'>
        <p className='copyright-home'>
          &copy; {new Date().getFullYear()} Vacation Homes. All rights reserved.
        </p>
      </footer>

    </div>
    
  );
}