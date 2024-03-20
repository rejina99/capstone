import React from 'react';

const About = () => {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>Welcome to Vacation Homes - Your Gateway to Memorable Stays</h1>
      <p className='mb-4 text-slate-700'>At Vacation Homes, we're passionate about providing a platform where travelers can discover unique and memorable places to stay, while also empowering homeowners to showcase their properties to a global audience.</p>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2 text-slate-800">What Sets Us Apart</h2>
        <ul className="list-disc pl-6">
          <li className="mb-2">Diverse Selection: Whether you're looking for a house, apartment, cozy cottage, a luxurious villa, or an adventurous treehouse, Vacation Homes offers a diverse selection of properties to suit every traveler's taste and budget.</li>
          <li className="mb-2">Personalized Experience: We believe that every trip is unique, which is why we prioritize personalization. Our intuitive search filters and recommendation algorithms help travelers find the perfect stay tailored to their preferences.</li>
          <li className="mb-2">Direct Communication: We facilitate direct communication between homeowners and travelers, fostering transparency and trust. This direct connection allows travelers to ask questions, negotiate terms, and customize their stay, ensuring a seamless booking process.</li>
          <li className="mb-2">Community-driven: At Vacation Homes, we're more than just a booking platform - we're a community. Homeowners can showcase their properties to a global audience, while travelers can connect with like-minded individuals and share their experiences.</li>
        </ul>
      </div>

      <p className='mb-4 text-slate-700'>Our mission is simple: to inspire and empower travelers to explore the world, one stay at a time. Whether it's a weekend getaway, a family vacation, or a solo adventure, we're committed to helping travelers find their perfect home away from home.</p>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2 text-slate-800">Get Started Today</h2>
        <p>Ready to embark on your next adventure? Browse our selection of vacation homes, connect with homeowners, and book your dream stay today. Welcome to Vacation Homes - where unforgettable memories begin.</p>
      </div>
    </div>
  );
};

export default About;
