
import React from 'react';
import { motion } from 'framer-motion';

interface SpinWheelProps {
  isSpinning: boolean;
  selectedNumber: number | null;
}

export const SpinWheel: React.FC<SpinWheelProps> = ({ isSpinning, selectedNumber }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Roleta Principal */}
        <motion.div
          className="w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-yellow-400 shadow-2xl relative overflow-hidden"
          animate={{
            rotate: isSpinning ? 1440 : 0, // 4 voltas completas
          }}
          transition={{
            duration: 3,
            ease: "easeOut"
          }}
          style={{
            background: `conic-gradient(
              from 0deg,
              #ff6b6b 0deg 45deg,
              #4ecdc4 45deg 90deg,
              #45b7d1 90deg 135deg,
              #96ceb4 135deg 180deg,
              #feca57 180deg 225deg,
              #ff9ff3 225deg 270deg,
              #54a0ff 270deg 315deg,
              #5f27cd 315deg 360deg
            )`
          }}
        >
          {/* Ícones decorativos na roleta */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-8 text-white text-3xl">
              <div>✈️</div>
              <div>🎫</div>
              <div>💼</div>
              <div>💰</div>
            </div>
          </div>

          {/* Centro da roleta */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* Ponteiro */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-600"></div>
        </div>
      </div>

      {/* Display do número */}
      <div className="mt-8 p-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg">
        <div className="text-white text-center">
          <div className="text-lg font-semibold mb-2">Próximo Número:</div>
          <div className="text-4xl font-bold font-mono">
            {isSpinning ? (
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                ????
              </motion.span>
            ) : selectedNumber ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-yellow-300"
              >
                {selectedNumber}
              </motion.span>
            ) : (
              '----'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
