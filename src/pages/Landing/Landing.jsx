import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeartParticles from "../../components/common/HeartParticles";
import BackgroundDecor from "../../components/common/BackgroundDecor";
import { useMusic } from "../../hooks/MusicContext";

import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();
  const { startMusic } = useMusic();

  return (
    <div className="landing-container" onClick={startMusic}>
      <HeartParticles />
      <BackgroundDecor />

      <motion.div
        className="landing-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h1>
          Happiest Birthday <br />
          <span className="highlight-text">My Favorite Person 💖</span>
        </h1>

        <p>
          This is not just a website. <br />
          It’s a small piece of my heart, written in code.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="start-btn"
          onClick={() => navigate("/timeline")}
        >
          Start the Surprise 🎁
        </motion.button>
      </motion.div>
    </div>
  );
}
