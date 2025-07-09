
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Plane, Briefcase, Ticket, DollarSign, Settings, Users, Trophy } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-vibrant-primary p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🎰 Sistema de Sorteio
          </h1>
          <h2 className="text-2xl md:text-3xl text-white/90 mb-6 drop-shadow-md">
            ✈️ Viagem dos Sonhos ✈️
          </h2>
          <div className="flex justify-center gap-4 text-white text-2xl">
            <Plane className="animate-bounce" />
            <Briefcase className="animate-bounce delay-100" />
            <Ticket className="animate-bounce delay-200" />
            <DollarSign className="animate-bounce delay-300" />
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Admin Assignment */}
          <Card className="card-vibrant p-8 hover:shadow-2xl transition-all cursor-pointer group">
            <div 
              className="text-center space-y-4"
              onClick={() => navigate('/admin')}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                <Settings className="w-16 h-16 mx-auto text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                🎯 Roleta de Atribuição
              </h3>
              <p className="text-gray-600 text-sm">
                Sistema administrativo para cadastrar participantes e atribuir números
              </p>
              <Button className="btn-vibrant-primary w-full py-3">
                Acessar Admin
              </Button>
            </div>
          </Card>

          {/* Public Draw */}
          <Card className="card-vibrant p-8 hover:shadow-2xl transition-all cursor-pointer group">
            <div 
              className="text-center space-y-4"
              onClick={() => navigate('/sorteio')}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="w-16 h-16 mx-auto text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                🎉 Sorteio Final
              </h3>
              <p className="text-gray-600 text-sm">
                Roleta pública para o sorteio final do vencedor da viagem
              </p>
              <Button className="btn-vibrant-secondary w-full py-3">
                Ir para Sorteio
              </Button>
            </div>
          </Card>

          {/* Participants Panel */}
          <Card className="card-vibrant p-8 hover:shadow-2xl transition-all cursor-pointer group">
            <div 
              className="text-center space-y-4"
              onClick={() => navigate('/participants')}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-16 h-16 mx-auto text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                📋 Painel de Participantes
              </h3>
              <p className="text-gray-600 text-sm">
                Visualizar lista completa dos participantes cadastrados
              </p>
              <Button className="btn-vibrant-success w-full py-3">
                Ver Participantes
              </Button>
            </div>
          </Card>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 text-white/80">
          <p className="text-lg">
            🎲 Sistema completo de sorteio para promoções e eventos
          </p>
          <p className="text-sm mt-2">
            Escolha uma das opções acima para começar
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
