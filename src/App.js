import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCake from './components/AnimatedCake';
import BirthdayMessage from './components/BirthdayMessage';
import BackgroundStars from './components/BackgroundStars';
import Confetti from './components/Confetti';
import WindGust from './components/WindGust';
import SpecialMessage from './components/SpecialMessage';
import './App.css';

// --- PERFECTLY CENTERED FINAL MESSAGE COMPONENT ---
const FinalMessage = ({ onSpecialMessageClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.3,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
      }
    })
  };

  return (
    <motion.div
      className="final-message-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Large Card Background */}
      <motion.div
        className="message-card"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, duration: 1.5 }}
      >
        <div className="card-shine"></div>
        {/* Background Hearts (behind text) */}
        <div className="background-hearts">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="background-heart"
              style={{
                left: `${Math.random() * 100}%`,
                color: ['#ff6b6b', '#ffa726', '#ff4081', '#f48fb1'][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 6}s`
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>

        {/* Perfectly Centered Text Container */}
        <div className="words-container">
          <motion.div className="word-happy" variants={wordVariants}>
            {"Happy".split("").map((char, i) => (
              <motion.span key={i} custom={i} variants={letterVariants} className="bounce-letter">
                {char}
              </motion.span>
            ))}
          </motion.div>

          <motion.div className="word-birthday" variants={wordVariants}>
            {"Birthday".split("").map((char, i) => (
              <motion.span key={i} custom={i} variants={letterVariants} className="bounce-letter">
                {char}
              </motion.span>
            ))}
          </motion.div>

          <motion.div className="word-afreen" variants={wordVariants}>
            {"Afreen!".split("").map((char, i) => (
              <motion.span key={i} custom={i} variants={letterVariants} className="bounce-letter">
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Special Message Button */}
        <motion.button
          className="action-button special-message-button"
          onClick={onSpecialMessageClick}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: '30px',
            background: 'linear-gradient(45deg, #ff6b6b, #ffa726)',
            zIndex: 10,
            position: 'relative'
          }}
        >
          💌 A Special Message For You 💌
        </motion.button>
      </motion.div>

      {/* Floating Hearts (around text) */}
      <div className="floating-hearts">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              color: ['#ff6b6b', '#ffa726', '#ff4081', '#f48fb1'][Math.floor(Math.random() * 4)]
            }}
            initial={{ y: 100, opacity: 0, scale: 0 }}
            animate={{
              y: -1000,
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * 100 - 50
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

function App() {
  const [showBlowButton, setShowBlowButton] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [gustCount, setGustCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSpecialMessage, setShowSpecialMessage] = useState(false);

  // Timer to show the "Blow the Candle" button
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isCandleBlown) setShowBlowButton(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isCandleBlown]);

  const handleBlowCandle = () => {
    if (isBlowing) return;
    setIsBlowing(true);
    setShowBlowButton(false);

    // First gust - doesn't blow out the candle
    setTimeout(() => {
      setIsBlowing(false);
      setGustCount(1);

      // Second gust after a short pause - blows out the candle
      setTimeout(() => {
        setIsBlowing(true);
        setGustCount(2);

        setTimeout(() => {
          setIsCandleBlown(true);
          setIsBlowing(false);

          // Show the final message with confetti after candle is blown
          setTimeout(() => {
            setIsCardOpen(true);
            setShowConfetti(true);
          }, 800);
        }, 1200);
      }, 800);
    }, 1000);
  };

  const handleSpecialMessageClick = () => {
    setShowSpecialMessage(true);
  };

  const handleCloseSpecialMessage = () => {
    setShowSpecialMessage(false);
  };

  return (
    <div className="App">
      <BackgroundStars />
      <WindGust isBlowing={isBlowing} gustCount={gustCount} />
      {showConfetti && <Confetti />}

      <AnimatePresence>
        {!isCardOpen && (
          <motion.div
            key="initialMessage"
            exit={{ opacity: 0, y: -50, scale: 0.8, transition: { duration: 0.5 } }}
          >
            <BirthdayMessage
              text="Happy Birthday, My Love!"
              style={{
                fontSize: '70px',
                color: 'white',
                textShadow: '0 0 15px rgba(0,0,0,0.5)',
                fontFamily: "'Great Vibes', cursive",
                zIndex: 1,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCardOpen && !showSpecialMessage && (
          <FinalMessage onSpecialMessageClick={handleSpecialMessageClick} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSpecialMessage && (
          <SpecialMessage onClose={handleCloseSpecialMessage} />
        )}
      </AnimatePresence>

      <AnimatedCake isCandleBlown={isCandleBlown} isBlowing={isBlowing} gustCount={gustCount} />

      <div className="button-container">
        <AnimatePresence>
          {showBlowButton && (
            <motion.button
              className="action-button blow-button"
              onClick={handleBlowCandle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 30px 10px rgba(132, 250, 176, 0.5)" }}
              whileTap={{ scale: 0.9 }}
            >
              🎂 Blow the Candle! 🎂
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;