
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

  const formatNumber = (number: number) => {
    const numStr = number.toString();
    const firstTwo = numStr.slice(0, 2);
    const lastThree = numStr.slice(-3);
    const middle = '****';
    return `${firstTwo}${middle}${lastThree}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 border-4 border-yellow-300 relative overflow-hidden">
        {/* Fogos de artifício animados */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              initial={{
                x: Math.random() * 400,
                y: Math.random() * 300,
                scale: 0,
                opacity: 0
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [null, Math.random() * 300 - 150]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        <div className="text-center p-8 relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              🎉 Parabéns!!! 🎉
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-6"
          >
            <div className="text-6xl font-bold text-green-600 mb-4 font-mono">
              {formatNumber(winner.numero)}
            </div>
            <div className="text-2xl font-semibold text-gray-800 mb-2">
              {winner.nome}
            </div>
            {winner.origem && (
              <div className="text-gray-600">
                Origem: {winner.origem}
              </div>
            )}
          </motion.div>

          <Button
            onClick={onClose}
            size="lg"
            className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-xl px-8 py-3"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WinnerModal;
