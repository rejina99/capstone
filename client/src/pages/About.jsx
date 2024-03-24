import React from 'react';
import '../index.css';

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
        <h2 className='team-members-title'>Meet Our Team</h2>
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
      <footer className='footer'>
        <p className='copyright'>
          &copy; {new Date().getFullYear()} Vacation Homes. All rights reserved.
        </p>
      </footer>
    </div>
  );
}