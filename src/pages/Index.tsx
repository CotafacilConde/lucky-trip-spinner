
import React, { useState, useEffect } from 'react';
import { SpinWheel } from '@/components/SpinWheel';
import { AssignModal } from '@/components/AssignModal';
import { ParticipantTable } from '@/components/ParticipantTable';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plane, Briefcase, Ticket, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface Participant {
  id: string;
  nome: string;
  contato: string;
  numero: number;
  origem: 'Online' | 'Presencial';
  data_atribuicao: string;
}

const Index = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);

  // Inicializar números disponíveis
  useEffect(() => {
    const allNumbers = [];
    for (let i = 1001; i <= 9999; i++) {
      allNumbers.push(i);
    }
    
    const usedNumbers = participants.map(p => p.numero);
    const available = allNumbers.filter(num => !usedNumbers.includes(num));
    setAvailableNumbers(available);
  }, [participants]);

  const handleSpin = () => {
    if (availableNumbers.length === 0) {
      toast.error('Todos os números já foram atribuídos!');
      return;
    }

    setIsSpinning(true);
    
    // Simular tempo de roleta
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const drawnNumber = availableNumbers[randomIndex];
      setSelectedNumber(drawnNumber);
      setIsSpinning(false);
      toast.success(`Número sorteado: ${drawnNumber}!`);
    }, 3000);
  };

  const handleAssignNumber = (participantData: Omit<Participant, 'id' | 'data_atribuicao'>) => {
    if (!selectedNumber) return;

    const newParticipant: Participant = {
      id: Date.now().toString(),
      ...participantData,
      numero: selectedNumber,
      data_atribuicao: new Date().toISOString(),
    };

    setParticipants(prev => [newParticipant, ...prev]);
    setSelectedNumber(null);
    setIsModalOpen(false);
    toast.success(`Número ${selectedNumber} atribuído a ${participantData.nome}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🎰 Sorteio da Viagem dos Sonhos
          </h1>
          <div className="flex justify-center gap-4 text-white text-2xl">
            <Plane className="animate-bounce" />
            <Briefcase className="animate-bounce delay-100" />
            <Ticket className="animate-bounce delay-200" />
            <DollarSign className="animate-bounce delay-300" />
          </div>
        </div>

        {/* Roleta Section */}
        <Card className="bg-white/90 backdrop-blur-sm p-8 mb-8 shadow-2xl">
          <div className="text-center">
            <SpinWheel 
              isSpinning={isSpinning}
              selectedNumber={selectedNumber}
            />
            
            <div className="mt-8 space-y-4">
              <Button
                onClick={handleSpin}
                disabled={isSpinning || availableNumbers.length === 0}
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold px-8 py-4 text-xl shadow-lg transform hover:scale-105 transition-all"
              >
                {isSpinning ? '🎰 Girando...' : '🎰 Girar Roleta'}
              </Button>

              {selectedNumber && !isSpinning && (
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-green-600 animate-pulse">
                    Número Sorteado: {selectedNumber}
                  </div>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3"
                  >
                    ✅ Atribuir Número
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-6 text-gray-600">
              <p>Números disponíveis: <span className="font-bold text-blue-600">{availableNumbers.length}</span></p>
              <p>Participantes cadastrados: <span className="font-bold text-green-600">{participants.length}</span></p>
            </div>
          </div>
        </Card>

        {/* Tabela de Participantes */}
        <ParticipantTable participants={participants} />

        {/* Modal de Atribuição */}
        <AssignModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAssign={handleAssignNumber}
          selectedNumber={selectedNumber}
        />
      </div>
    </div>
  );
};

export default Index;
