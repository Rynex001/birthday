import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCake from './components/AnimatedCake';
import BirthdayMessage from './components/BirthdayMessage';
import BackgroundStars from './components/BackgroundStars';
import Confetti from './components/Confetti';
import PartyPopper from './components/PartyPopper';
import WindGust from './components/WindGust'; // Import the new WindGust component
import './App.css';

// --- CORRECTED FINAL MESSAGE COMPONENT ---
const FinalMessage = () => {
  const line1 = "Happy";
  const line2 = "Birthday";
  const line3 = "Afreen!";
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.5, staggerChildren: 0.3 } } };
  const lineVariants = { hidden: { y: 100, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } } };
  return (
    <motion.div className="final-message-container" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={lineVariants} className="final-message-line">{line1}</motion.div>
      <motion.div variants={lineVariants} className="final-message-line">{line2}</motion.div>
      <motion.div variants={lineVariants} className="final-message-line large">{line3}</motion.div>
    </motion.div>
  );
};


function App() {
  const [showSurprise, setShowSurprise] = useState(false);
  const [showBlowButton, setShowBlowButton] = useState(false);
  const [isAnimatingBlow, setIsAnimatingBlow] = useState(false); // To disable the button
  const [blowAttempt, setBlowAttempt] = useState(0);
  const [isCandleBlown, setIsCandleBlown] = useState(false);

  // Timer to show the "Blow the Candle" button
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isCandleBlown) setShowBlowButton(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isCandleBlown]);

  // --- NEW SINGLE-CLICK, TWO-ATTEMPT BLOWING LOGIC ---
  const handleBlowCandle = () => {
    if (isAnimatingBlow) return; // Prevent multiple clicks

    setIsAnimatingBlow(true);

    // Attempt 1 (Fail)
    setBlowAttempt(1);

    // Schedule Attempt 2 (Success)
    setTimeout(() => {
      setBlowAttempt(2); // Trigger second gust
      setIsCandleBlown(true); // Blow out the candle
      setShowBlowButton(false); // Hide the button
    }, 1500); // 1.5 second delay between attempts
  };

  return (
    <div className="App">
      <BackgroundStars />
      <WindGust blowAttempt={blowAttempt} /> {/* Add the WindGust component */}
      
      <AnimatePresence>
        {!isCandleBlown && <Confetti />}
      </AnimatePresence>

      {isCandleBlown && <PartyPopper />}

      <AnimatePresence>
        {!isCandleBlown ? (
          <motion.div key="initialMessage" exit={{ opacity: 0, y: -50, scale: 0.8, transition: { duration: 0.5 } }}>
            <BirthdayMessage
              text="Happy Birthday, My Love!"
              style={{ fontSize: '6rem', color: 'white', textShadow: '0 0 15px rgba(0,0,0,0.5)', fontFamily: "'Great Vibes', cursive", zIndex: 1 }}
            />
          </motion.div>
        ) : (
          <FinalMessage key="finalMessage" />
        )}
      </AnimatePresence>

      <AnimatedCake isCandleBlown={isCandleBlown} blowAttempt={blowAttempt} />

      <div className="button-container">
        <AnimatePresence>
          {showBlowButton && !isCandleBlown && (
            <motion.button
              className="action-button blow-button"
              onClick={handleBlowCandle}
              disabled={isAnimatingBlow} // Disable button during animation
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20, scale: 0.8, transition: {duration: 0.3} }}
              whileHover={{ scale: isAnimatingBlow ? 1 : 1.1 }} // Disable hover effect during animation
              whileTap={{ scale: isAnimatingBlow ? 1 : 0.9 }}
            >
              Blow the Candle!
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isCandleBlown && (
            <motion.button
              className="action-button special-message-button"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: {duration: 0.3} }}
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px 5px #ff6b6b" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSurprise(true)}
            >
              A Special Message For You
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showSurprise && (
          <motion.div className="surprise-modal" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}>
            <motion.p className="surprise-text" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              You make my world brighter every single day. I love you more than words can say! ❤️
            </motion.p>
            <motion.button className="close-button" whileHover={{ scale: 1.1 }} onClick={() => setShowSurprise(false)}>
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;