
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Participant {
  id: string;
  nome: string;
  contato: string;
  numero: number;
  origem: 'Online' | 'Presencial';
  data_atribuicao: string;
}

interface ParticipantTableProps {
  participants: Participant[];
}

export const ParticipantTable: React.FC<ParticipantTableProps> = ({ participants }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
          📋 Participantes Cadastrados
          <Badge variant="secondary" className="text-lg">
            {participants.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {participants.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">🎲</div>
            <p className="text-xl">Nenhum participante cadastrado ainda.</p>
            <p className="text-sm mt-2">Faça o primeiro sorteio para começar!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <TableHead className="font-bold">Nome</TableHead>
                  <TableHead className="font-bold">Contato</TableHead>
                  <TableHead className="font-bold text-center">Número</TableHead>
                  <TableHead className="font-bold text-center">Origem</TableHead>
                  <TableHead className="font-bold text-center">Data da Atribuição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.map((participant, index) => (
                  <TableRow 
                    key={participant.id}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <TableCell className="font-medium">
                      {participant.nome}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {participant.contato}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant="outline" 
                        className="font-bold text-lg bg-gradient-to-r from-yellow-100 to-orange-100 border-orange-300"
                      >
                        {participant.numero}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant={participant.origem === 'Online' ? 'default' : 'secondary'}
                        className={participant.origem === 'Online' ? 'bg-blue-500' : 'bg-green-500'}
                      >
                        {participant.origem === 'Online' ? '🌐' : '🏢'} {participant.origem}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-sm font-mono">
                      {formatDate(participant.data_atribuicao)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
