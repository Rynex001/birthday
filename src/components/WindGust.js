import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './WindGust.css';

const WindGust = ({ blowAttempt }) => {
  const gustVariants = {
    initial: {
      x: '100vw', // Start off-screen to the right
      opacity: 0,
    },
    animate: {
      x: '-100vw', // Animate across the entire screen
      opacity: [0, 0.7, 0.7, 0], // Fade in, stay visible, then fade out
      transition: {
        duration: 1.2,
        ease: 'easeIn',
        times: [0, 0.2, 0.8, 1],
      },
    },
  };

  return (
    <AnimatePresence>
      {blowAttempt > 0 && (
        <motion.div
          key={blowAttempt} // The key ensures the animation re-triggers
          className="gust-container"
          variants={gustVariants}
          initial="initial"
          animate="animate"
        >
          <div className="wind-line"></div>
          <div className="wind-line"></div>
          <div className="wind-line"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WindGust;