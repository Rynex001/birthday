import React from 'react';
import { motion } from 'framer-motion';
import './Confetti.css';

const Confetti = () => {
  const confettiCount = 150;
  const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#ffc6ff", "#ff9a9e", "#fad0c4"];

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
            width: `${Math.random() * 15 + 8}px`,
            height: `${Math.random() * 15 + 8}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px'
          }}
          initial={{ 
            y: -100, 
            opacity: 1,
            rotate: 0
          }}
          animate={{ 
            y: '120vh', 
            rotate: Math.random() * 720,
            x: Math.random() * 200 - 100
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 1.5,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;