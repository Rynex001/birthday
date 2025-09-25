import React from 'react';
import './BackgroundStars.css';

const BackgroundStars = () => {
  // Create an array to map over for generating stars
  const starCount = 50;
  const stars = Array.from({ length: starCount });

  return (
    <div className="stars-container">
      {stars.map((_, index) => (
        <div
          key={index}
          className="star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`, // Randomize animation start
            animationDuration: `${Math.random() * 3 + 2}s`, // Randomize duration
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundStars;