import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import timelineData from "../../data/timelineData";
import "./Timeline.css";

export default function Timeline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [justUnlocked, setJustUnlocked] = useState(false);
  const isLastCard = currentIndex === timelineData.length - 1;

  useEffect(() => {
    if (isLastCard) {
      setJustUnlocked(true);

      const timer = setTimeout(() => {
        setJustUnlocked(false);
      }, 2200); // visible for ~2 seconds

      return () => clearTimeout(timer);
    }
  }, [isLastCard]);

  const nextCard = () => {
    if (currentIndex < timelineData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const item = timelineData[currentIndex];

  /* =====================
     ANIMATION VARIANTS
     ===================== */

  // 1️⃣ Title animation
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  // 2️⃣ Timeline card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 45, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.6,
      },
    },
    exit: {
      opacity: 0,
      y: -35,
      scale: 0.96,
      transition: { duration: 0.4 },
    },
  };

  // 3️⃣ Controls animation
  const controlsVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 1.2,
      },
    },
  };

  // 4️⃣ CTA button animation
  const ctaVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 1.6,
      },
    },
  };

  return (
    <div className="timeline-page">
      <div className="timeline-content">
        {/* Back Arrow */}
        <button className="back-arrow" onClick={() => navigate(-1)}>
          ←
        </button>

        {/* 1️⃣ Title */}
        <motion.h2
          className="timeline-title"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Our Story 💗
        </motion.h2>

        {/* 2️⃣ Timeline Card */}
        <div className="timeline-focus-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="timeline-focus-card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h3>{item.title}</h3>
              <span>{item.date}</span>
              <p>{item.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3️⃣ Controls */}
        <motion.div
          className="timeline-controls"
          variants={controlsVariants}
          initial="hidden"
          animate="visible"
        >
          <button
            className="timeline-btn secondary"
            onClick={prevCard}
            disabled={currentIndex === 0}
          >
            ← Previous
          </button>

          <button
            className="timeline-btn primary"
            onClick={nextCard}
            disabled={currentIndex === timelineData.length - 1}
          >
            Next 💖
          </button>
        </motion.div>

        {/* 4️⃣ CTA – Unlocks only at last card */}
        <motion.div
          className="timeline-next"
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
        >
          <button
            className={`timeline-next-btn 
      ${!isLastCard ? "locked" : ""} 
      ${justUnlocked ? "unlock-animate" : ""}
    `}
            onClick={() => isLastCard && navigate("/reasons")}
            disabled={!isLastCard}
          >
            {isLastCard ? "Ready for a Surprise 💖" : "Keep Reading 💗"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
