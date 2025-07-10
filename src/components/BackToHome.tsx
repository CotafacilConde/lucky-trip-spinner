
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackToHomeProps {
  title?: string;
}

const BackToHome: React.FC<BackToHomeProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
      <Button
        onClick={() => navigate('/')}
        variant="outline"
        className="bg-white/20 border-white/30 text-white hover:bg-white/30"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar ao Início
      </Button>
      {title && (
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      )}
    </div>
  );
};

export default BackToHome;
