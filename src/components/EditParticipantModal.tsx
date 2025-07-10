import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Participant {
  id: string;
  nome: string;
  contato: string;
  numero: number;
  origem?: string;
  observacoes?: string;
  data_atribuicao: string;
}

interface EditParticipantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Participant>) => void;
  participant: Participant | null;
}

const EditParticipantModal: React.FC<EditParticipantModalProps> = ({
  isOpen,
  onClose,
  onSave,
  participant
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    contato: '',
    origem: '',
    observacoes: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (participant) {
      console.log('Carregando dados do participante no modal:', participant);
      setFormData({
        nome: participant.nome || '',
        contato: participant.contato || '',
        origem: participant.origem || '',
        observacoes: participant.observacoes || ''
      });
    }
  }, [participant]);

  const handleSave = async () => {
    if (!formData.nome.trim() || !formData.contato.trim()) {
      alert('Nome e contato são obrigatórios!');
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Salvando dados do formulário:', formData);
      
      await onSave({
        nome: formData.nome.trim(),
        contato: formData.contato.trim(),
        origem: formData.origem || null,
        observacoes: formData.observacoes || null
      });
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ nome: '', contato: '', origem: '', observacoes: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Participante</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-nome">Nome *</Label>
            <Input
              id="edit-nome"
              value={formData.nome}
              onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
              placeholder="Nome completo"
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="edit-contato">Contato *</Label>
            <Input
              id="edit-contato"
              value={formData.contato}
              onChange={(e) => setFormData(prev => ({ ...prev, contato: e.target.value }))}
              placeholder="E-mail ou telefone"
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="edit-origem">Origem</Label>
            <Select 
              value={formData.origem} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, origem: value }))}
              disabled={isLoading}
            >
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
            <Label htmlFor="edit-observacoes">Observações</Label>
            <Textarea
              id="edit-observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
              placeholder="Observações adicionais (opcional)"
              rows={3}
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={handleSave} 
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditParticipantModal;
