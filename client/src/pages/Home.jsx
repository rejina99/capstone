import React, { useEffect, useState } from "react";
import "../css/home_page.css";

export default function Home() {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
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
    </div>
  );
}