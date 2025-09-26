import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AnimatedCake.css';

const cakeContainerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.2, type: 'spring', damping: 15, stiffness: 100, when: 'beforeChildren', staggerChildren: 0.2 },
  },
};

const pieceVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
};

const flameVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { delay: 2.2, type: 'spring', stiffness: 150, damping: 10 } },
  exit: { x: -50, scale: 0, opacity: 0, rotate: 45, transition: { duration: 0.7, ease: "easeOut" } },
};

const AnimatedCake = ({ isCandleBlown, isBlowing, gustCount }) => {
  return (
    <motion.div
      className="cake-container"
      variants={cakeContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="shadow" variants={pieceVariants}></motion.div>

      <motion.div className="layer bottom-layer" variants={pieceVariants}>
        <div className="highlight small"></div>
        <div className="highlight medium"></div>
      </motion.div>
      <motion.div className="icing bottom-icing" variants={pieceVariants}>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
        <div className="drip drip4"></div>
      </motion.div>
      <motion.div className="layer top-layer" variants={pieceVariants}>
         <div className="highlight small top"></div>
      </motion.div>
      <motion.div className="icing top-icing" variants={pieceVariants}>
        <div className="drip drip5"></div>
        <div className="drip drip6"></div>
        <div className="drip drip7"></div>
      </motion.div>

      <motion.div className="candle" variants={pieceVariants}>
        <div className="wick"></div>
        <div className="stripe"></div>
        <div className="stripe"></div>
      </motion.div>

      <AnimatePresence>
        {!isCandleBlown && (
          <motion.div
            className={`flame ${isBlowing ? (gustCount === 1 ? 'first-gust' : 'second-gust') : ''}`}
            variants={flameVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flame-inner"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AnimatedCake;