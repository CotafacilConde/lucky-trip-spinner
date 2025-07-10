import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';

interface ParticipantMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ParticipantMenu: React.FC<ParticipantMenuProps> = ({ onEdit, onDelete }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-8 w-8 p-0 hover:bg-gray-100 focus:bg-gray-100 data-[state=open]:bg-gray-100"
        >
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-white border border-gray-200 shadow-lg z-50"
        sideOffset={5}
      >
        <DropdownMenuItem 
          onClick={onEdit}
          className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50 px-3 py-2"
        >
          <Edit className="mr-2 h-4 w-4 text-blue-600" />
          <span className="text-gray-700">Editar</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={onDelete} 
          className="cursor-pointer hover:bg-red-50 focus:bg-red-50 px-3 py-2 text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Excluir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ParticipantMenu;
