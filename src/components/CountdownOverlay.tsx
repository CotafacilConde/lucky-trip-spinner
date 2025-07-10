
import React from 'react';
import { motion } from 'framer-motion';

interface CountdownOverlayProps {
  isVisible: boolean;
  countdown: number;
}

const CountdownOverlay: React.FC<CountdownOverlayProps> = ({ isVisible, countdown }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        key={countdown}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-white text-9xl font-bold drop-shadow-2xl"
      >
        {countdown}
      </motion.div>
    </div>
  );
};

export default CountdownOverlay;
