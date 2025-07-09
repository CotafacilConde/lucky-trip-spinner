
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface AssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (data: {
    nome: string;
    contato: string;
    numero: number;
    origem: 'Online' | 'Presencial';
  }) => void;
  selectedNumber: number | null;
}

export const AssignModal: React.FC<AssignModalProps> = ({
  isOpen,
  onClose,
  onAssign,
  selectedNumber,
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    contato: '',
    origem: '' as 'Online' | 'Presencial' | '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome.trim() || !formData.contato.trim() || !formData.origem || !selectedNumber) {
      toast.error('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    onAssign({
      nome: formData.nome.trim(),
      contato: formData.contato.trim(),
      numero: selectedNumber,
      origem: formData.origem,
    });

    // Reset form
    setFormData({
      nome: '',
      contato: '',
      origem: '',
    });
  };

  const handleClose = () => {
    setFormData({
      nome: '',
      contato: '',
      origem: '',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-blue-600">
            🎯 Atribuir Número
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="numero" className="text-sm font-medium">
              Número Sorteado
            </Label>
            <Input
              id="numero"
              value={selectedNumber || ''}
              disabled
              className="bg-gray-100 font-bold text-lg text-center"
              placeholder="----"
            />
          </div>

          <div>
            <Label htmlFor="nome" className="text-sm font-medium">
              Nome Completo *
            </Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Digite o nome do participante"
              required
            />
          </div>

          <div>
            <Label htmlFor="contato" className="text-sm font-medium">
              Contato (E-mail ou Telefone) *
            </Label>
            <Input
              id="contato"
              value={formData.contato}
              onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
              placeholder="email@exemplo.com ou (11) 99999-9999"
              required
            />
          </div>

          <div>
            <Label htmlFor="origem" className="text-sm font-medium">
              Origem *
            </Label>
            <Select
              value={formData.origem}
              onValueChange={(value: 'Online' | 'Presencial') =>
                setFormData({ ...formData, origem: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a origem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Online">🌐 Online</SelectItem>
                <SelectItem value="Presencial">🏢 Presencial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium">Data da Atribuição</Label>
            <Input
              value={new Date().toLocaleString('pt-BR')}
              disabled
              className="bg-gray-100"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-500 hover:bg-green-600"
            >
              💾 Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
