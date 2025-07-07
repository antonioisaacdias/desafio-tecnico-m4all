'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Btn from "@/app/components/Btn";
import { useState, useEffect } from "react";
import { Printer } from "@/app/types/printer";
import toast from 'react-hot-toast';

interface PrinterFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  printer?: Printer | null;
  onSave?: (printer: any) => void; 
  onSuccess?: () => void; 
}

export default function PrinterFormModal({ isOpen, onClose, printer, onSave, onSuccess }: PrinterFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    location: '',
    paperCapacity: '',
    status: 'ONLINE' as 'ONLINE' | 'OFFLINE',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!(printer && printer.id);

  useEffect(() => {
    console.log('useEffect triggered:', { isEditing, printer, isOpen });
    console.log('printer object:', printer);
    console.log('printer?.id:', printer?.id);
    
    if (printer && printer.id) {
      setFormData({
        name: printer.name || '',
        model: printer.model || '',
        location: printer.location || '',
        paperCapacity: printer.paperCapacity?.toString() || '',
        status: printer.status?.toUpperCase() as 'ONLINE' | 'OFFLINE' || 'ONLINE',
      });
    } else {
      setFormData({
        name: '',
        model: '',
        location: '',
        paperCapacity: '',
        status: 'ONLINE',
      });
    }
    setError(null);
  }, [printer, isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    if (!formData.name.trim()) {
      setError('Nome da impressora é obrigatório');
      toast.error('Nome da impressora é obrigatório');
      setLoading(false);
      return;
    }

    if (!formData.model.trim()) {
      setError('Modelo da impressora é obrigatório');
      toast.error('Modelo da impressora é obrigatório');
      setLoading(false);
      return;
    }

    if (!formData.location.trim()) {
      setError('Localização da impressora é obrigatória');
      toast.error('Localização da impressora é obrigatória');
      setLoading(false);
      return;
    }

    if (!formData.paperCapacity || parseInt(formData.paperCapacity) <= 0) {
      setError('Capacidade de papel deve ser maior que zero');
      toast.error('Capacidade de papel deve ser maior que zero');
      setLoading(false);
      return;
    }

    const printerData = {
      name: formData.name.trim(),
      model: formData.model.trim(),
      location: formData.location.trim(),
      status: formData.status,
      paperCapacity: parseInt(formData.paperCapacity),
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;
      
      console.log('isEditing:', isEditing);
      console.log('printer:', printer);
      console.log('printer?.id:', printer?.id);
      console.log('printerData sendo enviado:', printerData);
      
      if (printer && printer.id) {
        const url = `${baseUrl}/printers/${printer.id}`;
        console.log('Fazendo PUT para:', url);
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(printerData),
        });

        console.log('Response status PUT:', response.status);
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Erro no PUT:', errorText);
          throw new Error('Erro ao atualizar impressora');
        }
        
        toast.success('Impressora atualizada com sucesso!');
      } else {
        const url = `${baseUrl}/printers`;
        console.log('Fazendo POST para:', url);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(printerData),
        });

        console.log('Response status POST:', response.status);
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Erro no POST:', errorText);
          throw new Error('Erro ao criar impressora');
        }
        
        toast.success('Impressora criada com sucesso!');
      }

      if (onSave) {
        onSave(printerData);
      }
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Impressora' : 'Nova Impressora'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Edite as informações da impressora.' : 'Adicione uma nova impressora ao sistema.'} 
            <br />
            <span className="text-sm text-gray-500">Campos marcados com <span className="text-red-500">*</span> são obrigatórios.</span>
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome da Impressora <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Impressora Sala 1"
              required
            />
          </div>
          
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
              Modelo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="model"
              value={formData.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: HP LaserJet Pro M404"
              required
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Localização <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Sala 3"
              required
            />
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">Offline</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="paperCapacity" className="block text-sm font-medium text-gray-700 mb-1">
              Capacidade de Papel <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="paperCapacity"
              value={formData.paperCapacity}
              onChange={(e) => handleInputChange('paperCapacity', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 250"
              min="1"
              required
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Btn onClick={onClose} disabled={loading}>Cancelar</Btn>
          </DialogClose>
          <Btn onClick={handleSave} disabled={loading}>
            {loading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Criar Impressora')}
          </Btn>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
