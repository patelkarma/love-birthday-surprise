import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './BackArrow.css';

export default function BackArrow() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="back-arrow"
      onClick={() => navigate(-1)}
      whileHover={{ x: -4 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Go back"
    >
      ←
    </motion.div>
  );
}
