
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Plane, Briefcase, Ticket, DollarSign, Sun, MapPin, ExternalLink } from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import WinnerModal from '@/components/WinnerModal';
import CountdownOverlay from '@/components/CountdownOverlay';

interface Participant {
  id: string;
  nome: string;
  contato: string;
  numero: number;
  origem?: string;
  data_atribuicao: string;
}

const PublicDraw = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [winner, setWinner] = useState<Participant | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [leverDown, setLeverDown] = useState(false);
  const [leverUp, setLeverUp] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showCountdown, setShowCountdown] = useState(false);
  const [highlightWheel, setHighlightWheel] = useState(false);

  useEffect(() => {
    loadParticipants();
  }, []);

  const loadParticipants = async () => {
    try {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .order('data_atribuicao', { ascending: false });

      if (error) throw error;
      setParticipants(data || []);
    } catch (error) {
      console.error('Erro ao carregar participantes:', error);
      toast.error('Erro ao carregar participantes');
    }
  };

  const handleLeverPull = () => {
    if (participants.length === 0) {
      toast.error('Nenhum participante cadastrado para o sorteio!');
      return;
    }

    if (isSpinning) return;

    // 1. Animação inicial da alavanca (movimento para baixo)
    setLeverDown(true);
    setTimeout(() => setLeverDown(false), 500);

    // 2. Iniciar contagem regressiva
    setShowCountdown(true);
    setHighlightWheel(true);
    setCountdown(10);

    // 3. Contagem regressiva
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setShowCountdown(false);
          
          // 4. Após contagem: alavanca sobe + roleta gira simultaneamente
          setTimeout(() => {
            setLeverUp(true);
            setIsSpinning(true);
            
            // 5. Após 6 segundos de roleta, mostrar vencedor
            setTimeout(() => {
              const randomIndex = Math.floor(Math.random() * participants.length);
              const selectedParticipant = participants[randomIndex];
              
              setWinner(selectedParticipant);
              setIsSpinning(false);
              setHighlightWheel(false);
              setShowWinner(true);
              setLeverUp(false);
              
              toast.success(`🎉 Temos um vencedor! Cupom ${selectedParticipant.numero}!`);
            }, 6000); // 6 segundos de roleta
          }, 500);
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCloseModal = () => {
    setShowWinner(false);
    setWinner(null);
  };

  const wheelIcons = [
    { icon: Plane, color: "text-blue-500" },
    { icon: Briefcase, color: "text-yellow-500" },
    { icon: Ticket, color: "text-green-500" },
    { icon: DollarSign, color: "text-emerald-500" },
    { icon: Sun, color: "text-orange-500" },
    { icon: MapPin, color: "text-red-500" }
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-4xl mx-auto p-4">
        <BackToHome />
      </div>

      {/* Overlay de contagem regressiva */}
      <CountdownOverlay isVisible={showCountdown} countdown={countdown} />

      {/* Modal do vencedor */}
      <WinnerModal 
        isOpen={showWinner} 
        onClose={handleCloseModal} 
        winner={winner} 
      />

      {/* Botão de participantes */}
      <Button
        onClick={() => window.open('/participants', '_blank')}
        className="fixed top-4 right-4 z-40 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
        size="sm"
      >
        📋 Participantes <ExternalLink className="ml-1 h-4 w-4" />
      </Button>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
              🎰 SORTEIO FINAL
            </h1>
            <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg">
              ✈️ Viagem dos Sonhos ✈️
            </p>
          </motion.div>

          {/* Wheel and Lever Container */}
          <div className="flex items-center justify-center gap-8 mb-12 relative">
            {/* Wheel */}
            <motion.div
              className="relative z-30"
              animate={{
                rotate: isSpinning ? 2160 : 0, // 6 voltas completas
                scale: highlightWheel ? 1.1 : 1
              }}
              transition={{
                rotate: {
                  duration: isSpinning ? 6 : 0, // 6 segundos de rotação
                  ease: isSpinning ? [0.25, 0.46, 0.45, 0.94] : "easeOut"
                },
                scale: {
                  duration: 0.5,
                  ease: "easeInOut"
                }
              }}
            >
              <div 
                className={`w-80 h-80 md:w-96 md:h-96 rounded-full border-8 border-yellow-400 shadow-2xl relative overflow-hidden transition-all duration-500 ${
                  highlightWheel ? 'ring-4 ring-yellow-300 ring-opacity-50 shadow-yellow-400/50' : ''
                }`}
                style={{
                  background: `conic-gradient(
                    from 0deg,
                    #ff6b6b 0deg 60deg,
                    #4ecdc4 60deg 120deg,
                    #45b7d1 120deg 180deg,
                    #96ceb4 180deg 240deg,
                    #feca57 240deg 300deg,
                    #ff9ff3 300deg 360deg
                  )`
                }}
              >
                {/* Icons */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-12 text-white text-6xl">
                    {wheelIcons.slice(0, 4).map((item, index) => (
                      <div key={index} className="flex items-center justify-center">
                        <item.icon className="w-16 h-16" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3">
                <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-red-600 drop-shadow-lg"></div>
              </div>
            </motion.div>

            {/* Lever */}
            <motion.div
              className="flex flex-col items-center z-30"
              animate={{
                y: leverDown ? 20 : leverUp ? -10 : 0
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 w-6 h-32 rounded-full shadow-lg border-2 border-yellow-700"></div>
              <Button
                onClick={handleLeverPull}
                disabled={isSpinning || showCountdown}
                className="bg-gradient-to-b from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 w-16 h-16 rounded-full shadow-xl border-4 border-red-800 text-white font-bold text-2xl disabled:opacity-50"
              >
                🎯
              </Button>
            </motion.div>
          </div>

          {/* Instructions */}
          {!showWinner && !isSpinning && !showCountdown && participants.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white/80 text-lg"
            >
              Puxe a alavanca para iniciar o sorteio!
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicDraw;
