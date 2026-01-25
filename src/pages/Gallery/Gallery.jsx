import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import galleryData from "../../data/galleryData";
import "./Gallery.css";

export default function Gallery() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [openHeart, setOpenHeart] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null); // ⭐ NEW
  const navigate = useNavigate();

  const visibleImages = galleryData.slice(0, (sceneIndex + 1) * 2);
  const isLastScene = visibleImages.length >= galleryData.length;

  const nextScene = () => {
    if (!isLastScene) {
      setSceneIndex(sceneIndex + 1);
    }
  };

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      galleryData.forEach((item) => {
        const img = new Image();
        img.src = item.image;
      });
    }
  }, []);

  return (
    <div className="gallery-page">
      {/* Back */}
      <button className="back-arrow" onClick={() => navigate(-1)}>
        ←
      </button>

      <h1 className="gallery-title">Our Memories 💗</h1>

      {/* Memory Canvas */}
      <div className="memory-canvas">
        {/* Center Emoji Heart */}
        <motion.div
          className={`center-heart-emoji ${openHeart ? "heart-open" : ""}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          💖
        </motion.div>

        {visibleImages.map((item, index) => (
          <motion.div
            key={item.id}
            className={`memory-card ${item.corner}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: index < visibleImages.length - 2 ? 0.55 : 1,
              scale: index < visibleImages.length - 2 ? 0.95 : 1,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onClick={() =>
              setExpandedCard(expandedCard?.id === item.id ? null : item)
            } // ⭐ TOGGLE EXPAND
          >
            <img src={item.image} alt="memory" loading="lazy" />
            <p>{item.caption}</p>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="gallery-controls">
        {!isLastScene && <button onClick={nextScene}>Next Memory 💖</button>}

        {isLastScene && (
          <motion.button
            className="gallery-next-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setOpenHeart(true);
              setTimeout(() => {
                navigate("/letter");
              }, 1200);
            }}
          >
            There’s something I want to tell you… 💌
          </motion.button>
        )}
      </div>

      {/* 🌙 EXPANDED VIEW */}
      <AnimatePresence>
        {expandedCard && (
          <motion.div
            className="expanded-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="expanded-card"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={() => setExpandedCard(null)} // ✅ now only the BIG photo closes it
            >
              <img src={expandedCard.image} alt="expanded memory" />
              <p>{expandedCard.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
