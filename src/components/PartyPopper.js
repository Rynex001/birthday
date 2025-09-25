import React from 'react';
import { motion } from 'framer-motion';
import './PartyPopper.css';

const PartyPopper = () => {
  const particleCount = 150;
  const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#ffc6ff", "#fff"];

  return (
    <div className="popper-container">
      {Array.from({ length: particleCount }).map((_, i) => {
        const isStreamer = Math.random() > 0.8; // 20% are streamers
        const randomAngle = Math.random() * 360;
        const randomDistance = Math.random() * 300 + 150;

        // Convert angle and distance to x, y coordinates
        const x = Math.cos(randomAngle * (Math.PI / 180)) * randomDistance;
        const y = Math.sin(randomAngle * (Math.PI / 180)) * randomDistance;

        return (
          <motion.div
            key={i}
            className={isStreamer ? 'streamer' : 'confetti'}
            style={{
              backgroundColor: colors[i % colors.length],
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: x,
              y: y + 200, // Make it fall down after exploding
              rotate: Math.random() * 720,
              scale: 0, // Shrink to nothing
              opacity: 0,
            }}
            transition={{
              duration: Math.random() * 2 + 2, // Duration of 2-4 seconds
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default PartyPopper;