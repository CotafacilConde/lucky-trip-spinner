import React, { useState, useEffect } from 'react';
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
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { RefreshCw, X } from 'lucide-react';

interface Participant {
  id: string;
  nome: string;
  contato: string;
  numero: number;
  origem?: string;
  observacoes?: string;
  data_atribuicao: string;
}

const ParticipantsPanel = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParticipants();
  }, []);

  const loadParticipants = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .order('data_atribuicao', { ascending: false });

      if (error) throw error;
      setParticipants(data || []);
    } catch (error) {
      console.error('Erro ao carregar participantes:', error);
      toast.error('Erro ao carregar participantes');
    } finally {
      setLoading(false);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              📋 Painel de Participantes
            </h1>
            <p className="text-slate-600 mt-1">
              Lista completa dos participantes cadastrados
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={loadParticipants}
              variant="outline"
              size="sm"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            <Button
              onClick={() => window.close()}
              variant="outline"
              size="sm"
            >
              <X className="h-4 w-4 mr-2" />
              Fechar
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{participants.length}</div>
                <div className="text-sm text-slate-600">Total de Participantes</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {participants.filter(p => p.origem === 'Online').length}
                </div>
                <div className="text-sm text-slate-600">Participantes Online</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {participants.filter(p => p.origem === 'Presencial').length}
                </div>
                <div className="text-sm text-slate-600">Participantes Presenciais</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Participants Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Lista de Participantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-slate-600 mt-4">Carregando participantes...</p>
              </div>
            ) : participants.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-xl">Nenhum participante cadastrado ainda.</p>
                <p className="text-sm mt-2">Use a roleta de atribuição para começar!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="font-bold">Número</TableHead>
                      <TableHead className="font-bold">Nome</TableHead>
                      <TableHead className="font-bold">Contato</TableHead>
                      <TableHead className="font-bold text-center">Origem</TableHead>
                      <TableHead className="font-bold">Observações</TableHead>
                      <TableHead className="font-bold text-center">Data da Atribuição</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participants.map((participant, index) => (
                      <TableRow 
                        key={participant.id}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                      >
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className="font-bold text-lg bg-gradient-to-r from-yellow-100 to-orange-100 border-orange-300"
                          >
                            {participant.numero}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {participant.nome}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {participant.contato}
                        </TableCell>
                        <TableCell className="text-center">
                          {participant.origem ? (
                            <Badge 
                              variant={participant.origem === 'Online' ? 'default' : 'secondary'}
                              className={participant.origem === 'Online' ? 'bg-blue-500' : 'bg-green-500'}
                            >
                              {participant.origem === 'Online' ? '🌐' : '🏢'} {participant.origem}
                            </Badge>
                          ) : (
                            <span className="text-slate-400 text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-xs">
                          {participant.observacoes ? (
                            <div className="text-sm text-slate-600 truncate" title={participant.observacoes}>
                              {participant.observacoes}
                            </div>
                          ) : (
                            <span className="text-slate-400 text-sm">-</span>
                          )}
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
      </div>
    </div>
  );
};

export default ParticipantsPanel;