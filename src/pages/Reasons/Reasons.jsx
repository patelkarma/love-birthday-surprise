import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import reasons from "../../data/reasonsData";
import "./Reasons.css";

export default function Reasons() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const isLastReason = index === reasons.length - 1;

  const next = () => {
    if (index < reasons.length - 1) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  /* =====================
     ANIMATION VARIANTS
     ===================== */

  // 1️⃣ Heading animation (calm, welcoming)
  const headingVariants = {
    hidden: { opacity: 0, y: -35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  // 2️⃣ Card animation (emotional focus)
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.6, // waits until heading settles
      },
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 0.96,
      transition: { duration: 0.4 },
    },
  };

  // 3️⃣ Buttons animation (gentle & supportive)
  const controlsVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 1.2, // appears last
      },
    },
  };

  return (
    <div className="reasons-page">
      <div className="reasons-content">
        {/* Back Arrow */}
        <button className="back-arrow" onClick={() => navigate(-1)}>
          ←
        </button>

        {/* 1️⃣ Heading */}
        <motion.h1
          className="reasons-title"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          26 Lines from my heart 💖
        </motion.h1>

        {/* 2️⃣ Card */}
        <div className="card-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="reason-card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <span className="reason-count">{index + 1} / 26</span>

              <p className="reason-text">{reasons[index]}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3️⃣ Controls */}
        <motion.div
          className="controls"
          variants={controlsVariants}
          initial="hidden"
          animate="visible"
        >
          <button onClick={prev} disabled={index === 0}>
            ← Previous
          </button>

          <button onClick={next} disabled={index === reasons.length - 1}>
            Next →
          </button>
        </motion.div>

        <AnimatePresence>
          {isLastReason && (
            <motion.div
              className="unlock-wrapper"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Unlock text */}
              <motion.p
                className="unlock-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                You’ve read them all… 💖
              </motion.p>

              {/* Final button */}
              <motion.button
                className="next-page-btn unlock-glow"
                onClick={() => navigate("/gallery")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Continue to Our Memories 📸
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
