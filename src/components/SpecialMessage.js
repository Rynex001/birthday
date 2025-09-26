import React, { useState, useEffect, useRef } from 'react'; // Imported useRef
import { motion, AnimatePresence } from 'framer-motion';
import './SpecialMessage.css';

const SpecialMessage = ({ onClose }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Create a ref for the scrollable container
  const letterContainerRef = useRef(null);

  const letter = `My Dearest Afreen,

Again Happy Birthday to the most percious person I know.
On this special day of yours I want you to know that you are very important to me!

Your smile brightens my hardest days,
Your laughter is my favourite song,
And your presence in my life is the most I can ask for.

May you get all the happyness you deserve,
May your every dream comes true!!

You are strong, beautiful, kind, you are the most perfect person I have ever met in my life.
I love you so much, I want to spend my whole life with you as partner, as best friend.

I wish you alwasy smile like that, may god always protect you and give the strength to
fight with any problem. Be strong, I am always here for you, in any condition, in any circumstances.

Wishing you a day filled with love, laughter.

With all my love,
Forever Yours 💖`;

  useEffect(() => {
    // Auto-scroll logic
    if (letterContainerRef.current) {
      letterContainerRef.current.scrollTop = letterContainerRef.current.scrollHeight;
    }

    if (currentIndex < letter.length) {
      // Typing speed slowed down from 30ms to 55ms
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + letter[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 65); // <-- SPEED CHANGE
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, letter, displayedText]); // displayedText is added to dependencies

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      className="special-message-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="special-message-card">
        <div className="special-card-shine"></div>
        {/* Decorative Hearts */}
        <div className="special-hearts">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="special-heart"
              style={{
                left: `${Math.random() * 100}%`,
                color: ['#ff6b6b', '#ffa726', '#ff4081', '#f48fb1'][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 3}s`
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>

        {/* Letter Content */}
        {/* Attach the ref to the div */}
        <div className="letter-container" ref={letterContainerRef}>
          <motion.div
            className="letter-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <pre className="typed-text">
              {displayedText}
              {!isComplete && <span className="typing-cursor">█</span>}
            </pre>
          </motion.div>
        </div>

        {/* Close Button */}
        <motion.button
          className="action-button close-button"
          onClick={onClose}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Close Letter
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SpecialMessage;