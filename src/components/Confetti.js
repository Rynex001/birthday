import React from 'react';
import { motion } from 'framer-motion';
import './Confetti.css';

const Confetti = () => {
  const confettiCount = 100;
  const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#ffc6ff"];

  return (
    <div className="confetti-container">
      {Array.from({ length: confettiCount }).map((_, i) => (
        <motion.div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: colors[i % colors.length],
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          initial={{ y: -10, opacity: 1 }}
          animate={{ y: '110vh', rotate: Math.random() * 720 }}
          transition={{
            duration: Math.random() * 4 + 3, // Fall duration between 3-7 seconds
            delay: Math.random() * 1,      // Start falling at slightly different times
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 5, // Have a small pause before repeating
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;