import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface Participant {
  id: string;
  nome: string;
  contato: string;
  numero: number;
  origem?: string;
  data_atribuicao: string;
}

interface WinnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  winner: Participant | null;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ isOpen, onClose, winner }) => {
  if (!winner) return null;

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return '';
    const phoneStr = phone.replace(/\D/g, '');
    if (phoneStr.length >= 7) {
      const firstFour = phoneStr.slice(0, 4);
      const lastThree = phoneStr.slice(-3);
      return `${firstFour}****${lastThree}`;
    }
    return phone;
  };

  return (
    <>
      {/* Overlay escuro de fundo */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
      )}

      {/* Título animado fora do modal */}
      {isOpen && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[60] pointer-events-none">
          <motion.h2
            initial={{ scale: 0, opacity: 0, y: -50 }}
            animate={{ 
              scale: [0, 1.1, 0.9], 
              opacity: 1, 
              y: 0,
              textShadow: [
                "0 0 15px rgba(255,255,255,0.8)",
                "0 0 30px rgba(255,215,0,0.8)",
                "0 0 45px rgba(255,165,0,0.8)"
              ]
            }}
            transition={{ 
              type: "spring", 
              stiffness: 180, 
              delay: 0.2,
              duration: 1.2
            }}
            className="text-3xl md:text-5xl font-bold text-white drop-shadow-2xl text-center animate-pulse"
            style={{
              textShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,215,0,0.6), 0 0 60px rgba(255,165,0,0.4)"
            }}
          >
            🎉 Parabéns!!! 🎉
          </motion.h2>
        </div>
      )}

      {/* Fogos de artifício em tela cheia */}
      {isOpen && (
        <div className="fixed inset-0 pointer-events-none z-[55]">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: `hsl(${Math.random() * 360}, 100%, 70%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{
                scale: 0,
                opacity: 0,
                x: 0,
                y: 0
              }}
              animate={{
                scale: [0, 1, 0.5, 0],
                opacity: [0, 1, 0.8, 0],
                x: [0, (Math.random() - 0.5) * 150],
                y: [0, (Math.random() - 0.5) * 150],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: Math.random() * 2.5,
                ease: "easeOut"
              }}
            />
          ))}
          
          {/* Fogos de artifício maiores */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`big-${i}`}
              className="absolute w-5 h-5 rounded-full"
              style={{
                background: `radial-gradient(circle, hsl(${Math.random() * 360}, 100%, 80%), hsl(${Math.random() * 360}, 100%, 60%))`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{
                scale: 0,
                opacity: 0,
                rotate: 0
              }}
              animate={{
                scale: [0, 1.3, 0.8, 0],
                opacity: [0, 1, 0.6, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: Math.random() * 3.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent 
          className="max-w-sm bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 border-4 border-yellow-300 relative overflow-hidden z-[60]"
          style={{
            position: 'fixed',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            margin: 0
          }}
        >
          <div className="text-center p-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 180 }}
              className="bg-white/95 backdrop-blur-sm rounded-xl p-5 mb-5 shadow-2xl"
            >
              {/* Nome do participante */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="text-xl md:text-2xl font-bold text-gray-800 mb-3 uppercase"
              >
                {winner.nome}
              </motion.div>
              
              {/* Número do cupom */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 250 }}
                className="text-base text-gray-700 mb-2"
              >
                <span className="font-semibold">Cupom: </span>
                <span className="text-2xl font-bold text-green-600 font-mono bg-yellow-100 px-2 py-0.5 rounded-lg">
                  {winner.numero}
                </span>
              </motion.div>
              
              {/* Origem */}
              {winner.origem && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="text-base text-gray-700 mb-2"
                >
                  <span className="font-semibold">Origem: </span>
                  <span className="text-blue-600 font-medium">
                    {winner.origem}
                  </span>
                </motion.div>
              )}
              
              {/* Telefone formatado */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="text-sm text-gray-600"
              >
                <span className="font-semibold">Telefone: </span>
                <span className="font-mono">
                  {formatPhoneNumber(winner.contato)}
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
            >
              <Button
                onClick={onClose}
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-lg px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Fechar
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WinnerModal;
