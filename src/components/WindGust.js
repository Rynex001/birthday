import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './WindGust.css';

const WindGust = ({ isBlowing, gustCount }) => {
  const gustVariants = {
    initial: {
      x: '100vw',
    },
    animate: {
      x: '-100vw',
      transition: {
        duration: gustCount === 1 ? 1 : 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <AnimatePresence>
      {isBlowing && (
        <motion.div
          className="gust-container"
          variants={gustVariants}
          initial="initial"
          animate="animate"
          exit={{ opacity: 0 }}
          key={gustCount} // This ensures a new animation for each gust
        >
          <div className="wind-line"></div>
          <div className="wind-line"></div>
          <div className="wind-line"></div>
          <div className="wind-line"></div>
          <div className="wind-line"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WindGust;