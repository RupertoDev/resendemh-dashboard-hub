
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useDashboards, Dashboard } from '@/contexts/DashboardContext';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardFormProps {
  isOpen: boolean;
  onClose: () => void;
  dashboard?: Dashboard | null;
}

const DashboardForm: React.FC<DashboardFormProps> = ({ isOpen, onClose, dashboard }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    department: '',
    iframeUrl: '',
    isActive: true,
    width: 1200,
    height: 600
  });

  const { addDashboard, updateDashboard, categories, departments } = useDashboards();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (dashboard) {
      setFormData({
        title: dashboard.title,
        description: dashboard.description,
        category: dashboard.category,
        department: dashboard.department,
        iframeUrl: dashboard.iframeUrl,
        isActive: dashboard.isActive,
        width: dashboard.width || 1200,
        height: dashboard.height || 600
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: '',
        department: '',
        iframeUrl: '',
        isActive: true,
        width: 1200,
        height: 600
      });
    }
  }, [dashboard, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.iframeUrl.trim()) {
      toast({
        title: "Erro",
        description: "Título e URL do iframe são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    try {
      if (dashboard) {
        updateDashboard(dashboard.id, formData);
        toast({
          title: "Sucesso",
          description: "Dashboard atualizado com sucesso"
        });
      } else {
        addDashboard({
          ...formData,
          createdBy: user?.email || ''
        });
        toast({
          title: "Sucesso",
          description: "Dashboard criado com sucesso"
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar dashboard",
        variant: "destructive"
      });
    }
  };

  const predefinedCategories = ['Vendas', 'Financeiro', 'Marketing', 'Operações', 'RH', 'TI'];
  const predefinedDepartments = ['Vendas', 'Financeiro', 'Marketing', 'Operações', 'RH', 'TI', 'Diretoria'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading font-semibold text-corporate-blue">
            {dashboard ? 'Editar Dashboard' : 'Novo Dashboard'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Nome do dashboard"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descreva o que este dashboard apresenta"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {predefinedCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                  {categories.filter(cat => !predefinedCategories.includes(cat)).map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Departamento</Label>
              <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um departamento" />
                </SelectTrigger>
                <SelectContent>
                  {predefinedDepartments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                  {departments.filter(dept => !predefinedDepartments.includes(dept)).map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="iframeUrl">URL do Power BI *</Label>
              <Input
                id="iframeUrl"
                value={formData.iframeUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, iframeUrl: e.target.value }))}
                placeholder="https://app.fabric.microsoft.com/view?r=..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="width">Largura (px)</Label>
              <Input
                id="width"
                type="number"
                value={formData.width}
                onChange={(e) => setFormData(prev => ({ ...prev, width: parseInt(e.target.value) || 1200 }))}
                min="600"
                max="2000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Altura (px)</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => setFormData(prev => ({ ...prev, height: parseInt(e.target.value) || 600 }))}
                min="400"
                max="1200"
              />
            </div>

            <div className="md:col-span-2 flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
              />
              <Label htmlFor="isActive">Dashboard ativo</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-corporate-blue hover:bg-primary-800">
              {dashboard ? 'Atualizar' : 'Criar Dashboard'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardForm;
