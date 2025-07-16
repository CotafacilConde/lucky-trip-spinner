
import React from 'react';
import { motion } from 'framer-motion';

interface CountdownOverlayProps {
  isVisible: boolean;
  countdown: number;
}

const CountdownOverlay: React.FC<CountdownOverlayProps> = ({ isVisible, countdown }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Efeito de pulsação no fundo */}
      <motion.div
        className="absolute inset-0 bg-radial-gradient from-orange-500/20 via-yellow-500/10 to-transparent"
        animate={{
          scale: [1, 1.2],
          opacity: [0.3, 0.6]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      {/* Número da contagem regressiva */}
      <motion.div
        key={countdown}
        initial={{ 
          scale: 0, 
          rotate: -180,
          opacity: 0
        }}
        animate={{ 
          scale: 1, 
          rotate: 0,
          opacity: 1
        }}
        exit={{ 
          scale: 0, 
          rotate: 180,
          opacity: 0
        }}
        transition={{ 
          type: "tween", 
          duration: 0.8
        }}
        className="relative"
      >
        {/* Glow effect atrás do número */}
        <motion.div
          className="absolute inset-0 text-9xl md:text-[12rem] font-bold blur-xl text-white"
          animate={{
            scale: [1, 1.1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {countdown}
        </motion.div>
        
        {/* Número principal */}
        <motion.div
          className="relative text-9xl md:text-[12rem] font-bold text-white drop-shadow-2xl"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 60px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 90px rgba(255, 140, 0, 0.4))'
          }}
          animate={{
            filter: [
              'drop-shadow(0 0 30px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 60px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 90px rgba(255, 140, 0, 0.4))',
              'drop-shadow(0 0 40px rgba(255, 255, 255, 1)) drop-shadow(0 0 80px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 120px rgba(255, 140, 0, 0.6))'
            ]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <span className="bg-gradient-to-br from-white via-yellow-300 to-orange-400 bg-clip-text text-transparent">
            {countdown}
          </span>
        </motion.div>
        
        {/* Partículas ao redor do número */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: '0 0'
            }}
            animate={{
              x: [0, Math.cos(i * 30 * Math.PI / 180) * 120],
              y: [0, Math.sin(i * 30 * Math.PI / 180) * 120],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
      
      {/* Texto adicional */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-32 text-white text-xl md:text-2xl font-semibold text-center"
      >
        <motion.p
          animate={{
            opacity: [0.7, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          Preparando o sorteio...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default CountdownOverlay;
