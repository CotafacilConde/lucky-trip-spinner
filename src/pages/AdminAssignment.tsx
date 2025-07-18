import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import BackToHome from '@/components/BackToHome';

interface Participant {
  id: string;
  nome: string;
  contato: string;
  numero: number;
  origem?: string;
  observacoes?: string;
  data_atribuicao: string;
}

const AdminAssignment = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [formData, setFormData] = useState({
    nome: '',
    contato: '',
    origem: '',
    observacoes: ''
  });

  // Load participants from Supabase
  useEffect(() => {
    loadParticipants();
  }, []);

  // Update available numbers when participants change
  useEffect(() => {
    const allNumbers = [];
    for (let i = 1001; i <= 9999; i++) {
      allNumbers.push(i);
    }
    
    const usedNumbers = participants.map(p => p.numero);
    const available = allNumbers.filter(num => !usedNumbers.includes(num));
    setAvailableNumbers(available);
  }, [participants]);

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

  const handleSpin = () => {
    if (availableNumbers.length < quantity) {
      toast.error(`Não há números suficientes disponíveis! Restam apenas ${availableNumbers.length} números.`);
      return;
    }

    setIsSpinning(true);
    
    // Simular tempo de sorteio
    setTimeout(() => {
      const drawnNumbers = [];
      const availableCopy = [...availableNumbers];
      
      for (let i = 0; i < quantity; i++) {
        const randomIndex = Math.floor(Math.random() * availableCopy.length);
        const drawnNumber = availableCopy[randomIndex];
        drawnNumbers.push(drawnNumber);
        availableCopy.splice(randomIndex, 1);
      }
      
      setSelectedNumbers(drawnNumbers);
      setIsSpinning(false);
      toast.success(`${quantity} número(s) sorteado(s)!`);
    }, 2000);
  };

  const handleSaveParticipant = async () => {
    if (selectedNumbers.length === 0 || !formData.nome || !formData.contato) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }

    try {
      // Inserir um registro para cada número sorteado
      const insertPromises = selectedNumbers.map(numero => 
        supabase
          .from('participants')
          .insert({
            nome: formData.nome,
            contato: formData.contato,
            numero: numero,
            origem: formData.origem || null,
            observacoes: formData.observacoes || null
          })
      );

      const results = await Promise.all(insertPromises);
      
      // Verificar se houve algum erro
      const errors = results.filter(result => result.error);
      if (errors.length > 0) {
        throw new Error('Erro ao salvar alguns números');
      }

      toast.success(`Participante cadastrado com ${selectedNumbers.length} número(s)!`);
      setSelectedNumbers([]);
      setIsModalOpen(false);
      setFormData({ nome: '', contato: '', origem: '', observacoes: '' });
      loadParticipants();
    } catch (error) {
      console.error('Erro ao salvar participante:', error);
      toast.error('Erro ao salvar participante');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="max-w-4xl mx-auto">
        <BackToHome title="Atribuir Número" />

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Sistema de Atribuição de Números</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {/* Number Display */}
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-sm text-slate-600 mb-2">
                {quantity > 1 ? `Próximos ${quantity} Números:` : 'Próximo Número:'}
              </div>
              <div className="text-4xl font-bold font-mono">
                {isSpinning ? (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="text-blue-600"
                  >
                    ????
                  </motion.span>
                ) : selectedNumbers.length > 0 ? (
                  <div className="space-y-2">
                    {selectedNumbers.map((number, index) => (
                      <motion.div
                        key={number}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 200,
                          delay: index * 0.1 
                        }}
                        className="text-green-600"
                      >
                        {number}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <span className="text-slate-400">----</span>
                )}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm font-medium">
                Quantidade de números:
              </Label>
              <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
                <SelectTrigger className="w-32 mx-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleSpin}
                disabled={isSpinning || availableNumbers.length < quantity}
                size="lg"
                className="px-8 py-3 text-lg"
              >
                {isSpinning ? '🎯 Sorteando...' : '🎯 Girar Roleta de Atribuição'}
              </Button>

              {selectedNumbers.length > 0 && !isSpinning && (
                <div className="space-y-4">
                  <div className="text-lg font-semibold text-green-600">
                    {selectedNumbers.length > 1 
                      ? `Números Sorteados: ${selectedNumbers.join(', ')}`
                      : `Número Sorteado: ${selectedNumbers[0]}`
                    }
                  </div>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="outline"
                    className="px-6 py-2"
                  >
                    📝 Cadastrar Participante
                  </Button>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 text-sm text-slate-600 pt-4 border-t">
              <div>
                <span className="font-medium text-blue-600">{availableNumbers.length}</span> números disponíveis
              </div>
              <div>
                <span className="font-medium text-green-600">{participants.length}</span> participantes cadastrados
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modal de Cadastro */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Cadastrar Participante - {selectedNumbers.length > 1 
                  ? `${selectedNumbers.length} Números`
                  : `Número ${selectedNumbers[0]}`
                }
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <Label htmlFor="contato">Contato *</Label>
                <Input
                  id="contato"
                  value={formData.contato}
                  onChange={(e) => setFormData(prev => ({ ...prev, contato: e.target.value }))}
                  placeholder="E-mail ou telefone"
                />
              </div>
              <div>
                <Label htmlFor="origem">Origem</Label>
                <Select value={formData.origem} onValueChange={(value) => setFormData(prev => ({ ...prev, origem: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a origem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Presencial">Presencial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                  placeholder="Observações adicionais (opcional)"
                  rows={3}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveParticipant} className="flex-1">
                  💾 Salvar Participante
                </Button>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminAssignment;
