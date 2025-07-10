
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
      {/* Título animado fora do modal */}
      {isOpen && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-60">
          <motion.h2
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl text-center"
          >
            🎉 Parabéns!!! 🎉
          </motion.h2>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className="max-w-md bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 border-4 border-yellow-300 relative overflow-hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Fogos de artifício animados */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
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
                  y: [null, Math.random() * 300 - 150],
                  x: [null, Math.random() * 100 - 50]
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
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-6"
            >
              {/* Nome do participante */}
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 uppercase">
                {winner.nome}
              </div>
              
              {/* Número do cupom */}
              <div className="text-lg text-gray-700 mb-3">
                <span className="font-semibold">Cupom: </span>
                <span className="text-3xl font-bold text-green-600 font-mono">
                  {winner.numero}
                </span>
              </div>
              
              {/* Origem */}
              {winner.origem && (
                <div className="text-lg text-gray-700 mb-3">
                  <span className="font-semibold">Origem: </span>
                  <span className="text-blue-600 font-medium">
                    {winner.origem}
                  </span>
                </div>
              )}
              
              {/* Telefone formatado */}
              <div className="text-sm text-gray-600">
                <span className="font-semibold">Telefone: </span>
                <span className="font-mono">
                  {formatPhoneNumber(winner.contato)}
                </span>
              </div>
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
    </>
  );
};

export default WinnerModal;
