import React from 'react';
import '../index.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

// Card component for team members
function TeamMemberCard({ name, role, image, description }) {
  return (
    <div className='team-member-card'>
      <img src={image} alt={name} className='team-member-image' />
      <div className='team-member-info'>
        <h5 className='team-member-name'>{name}</h5>
        <p className='team-member-role'>{role}</p>
        <p className='team-member-description'>{description}</p>
      </div>
    </div>
  );
}

//Information about Vacation Homes
export default function About() {
  return (
    <div className='about-containerr'>

      <div className='about-content'>
        <h1 className='about-title'>About Vacation Homes</h1>
        <hr className='hr'></hr>
        <p className='about-description'>
          Vacation Homes is a leading real estate agency that specializes in helping clients lease and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the renting process as smooth as possible.
        </p>
        <p className='about-description'>
          Our mission is to help our clients find the perfect place to stay by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to lease or rent a property, we are here to help you every step of the way.
        </p>
        <p className='about-description'>
          Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that renting a property for vacations should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.
        </p>
      </div>

      <div className='team-members'>
        <h2 className='about-title'>Meet Our Team</h2>
        <hr className='hr'></hr>
        <div className='team-members-grid'>
          <TeamMemberCard
            name='Rejina Maharjan'
            role='Product Manager'
            image='../src/img/rejina.jpg'
            description="Rejina leads the vision and strategy for our vacation rental marketplace, ensuring that our platform meets the needs of both hosts and guests. With a deep understanding of market trends and user insights, Rejina collaborates with cross-functional teams to prioritize features, define the product roadmap, and deliver innovative solutions that drive business growth. Rejina's strategic thinking, leadership, and passion for delivering exceptional products make her a driving force behind our success."
          />
          <TeamMemberCard
            name='Parth Patel'
            role='Software Engineer/Developer'
            image='../src/img/parth.jpg'
            description="Parth is responsible for building and maintaining the technical foundation of our vacation rental platform. With expertise in software development and a focus on scalability and reliability, Parth designs and implements robust solutions that power our platform's functionality. Whether it is developing new features, optimizing performance, or ensuring security, Parth's technical skills, attention to detail, and commitment to quality ensure that our platform delivers a seamless experience for users."
          />
          <TeamMemberCard
            name='Sunil Gohil'
            role='Customer Experience Specialist'
            image='../src/img/sunil.jpeg'
            description="Sunil is dedicated to ensuring that every user's journey on our vacation rental platform is smooth and enjoyable. With a keen eye for detail and excellent communication skills, Sunil assists customers with inquiries, resolves issues promptly, and gathers valuable feedback to improve the overall user experience. Sunil's passion for customer satisfaction and problem-solving skills make him an invaluable asset to our team."
          />
        </div>
      </div>

      <div className='about-content'>
        <h1 className='about-title'>Company History</h1>
        <hr className='hr'></hr>
        <p className='about-description'>
          Vacation Homes was founded in the quaint coastal town of Seaview Harbor by a group of passionate individuals who shared a common dream - to revolutionize the vacation rental industry. The journey began with a simple idea: to create a platform that would connect travelers with the perfect vacation rental properties, while also providing property owners with a reliable and efficient way to showcase their listings.
        </p>
        <p className='about-description'>
          In the early days, our team faced numerous challenges and obstacles. Building a scalable and user-friendly platform required countless hours of dedication and hard work. Led by our visionary founder, Rejina Maharjan, the team navigated through uncharted waters, overcoming technical hurdles and refining the platform to meet the needs of both hosts and guests.
        </p>
        <p className='about-description'>
          As the platform gained traction, our team expanded to include talented individuals like Parth Patel, a skilled software engineer whose expertise was instrumental in building the robust technical foundation of our platform. With Parth's contributions, we were able to implement innovative features and enhancements that set us apart from the competition.
        </p>
        <p className='about-description'>
          In the pursuit of excellence, we never lost sight of our core values - integrity, innovation, and customer satisfaction. Our commitment to these principles earned us the trust and loyalty of our users, propelling us to become a leading player in the vacation rental market.
        </p>
        <p className='about-description'>
          Today, Vacation Homes stands as a testament to the power of perseverance and determination. From our humble beginnings, we have grown into a thriving community of travelers, property owners, and vacation enthusiasts. Our journey is far from over, and we remain dedicated to our mission of providing exceptional service and unforgettable experiences to all who choose to travel with us.
        </p>
        <p>
          Join us as we continue to write the next chapter in our history, one unforgettable vacation at a time.
        </p >
      </div>

      <div className='socials-section'>
        <h3>Follow Us</h3>
        <ul>
          <li>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </li>
        </ul>
      </div>

      <footer className='footer'>
        <p className='copyright'>
          &copy; {new Date().getFullYear()} Vacation Homes. All rights reserved.
        </p>
      </footer>
    </div>
  );
}