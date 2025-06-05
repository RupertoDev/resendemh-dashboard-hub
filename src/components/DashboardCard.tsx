
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Eye, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Dashboard } from '@/contexts/DashboardContext';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface DashboardCardProps {
  dashboard: Dashboard;
  onEdit?: (dashboard: Dashboard) => void;
  onDelete?: (id: string) => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ dashboard, onEdit, onDelete }) => {
  const { user } = useAuth();
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const canEdit = user?.role === 'admin' || dashboard.createdBy === user?.email;

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-corporate-blue/50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg font-heading font-semibold text-corporate-blue line-clamp-1">
                {dashboard.title}
              </CardTitle>
              <CardDescription className="text-sm text-corporate-gray line-clamp-2">
                {dashboard.description}
              </CardDescription>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="secondary" className="bg-corporate-lightGray text-corporate-blue">
              {dashboard.category}
            </Badge>
            <Badge variant="outline" className="border-corporate-blue text-corporate-blue">
              {dashboard.department}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-corporate-gray">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>Atualizado em {formatDate(dashboard.updatedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{dashboard.createdBy.split('@')[0]}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
                <DialogTrigger asChild>
                  <Button className="flex-1 bg-corporate-blue hover:bg-primary-800">
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar
                  </Button>
                </DialogTrigger>
              </Dialog>

              {canEdit && (
                <div className="flex space-x-1">
                  {onEdit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(dashboard)}
                      className="border-corporate-blue text-corporate-blue hover:bg-corporate-blue hover:text-white"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  {onDelete && user?.role === 'admin' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(dashboard.id)}
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-heading font-semibold text-corporate-blue">
                  {dashboard.title}
                </DialogTitle>
                <p className="text-sm text-corporate-gray mt-1">{dashboard.description}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(dashboard.iframeUrl, '_blank')}
                className="border-corporate-blue text-corporate-blue hover:bg-corporate-blue hover:text-white"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Abrir em nova aba
              </Button>
            </div>
          </DialogHeader>
          <div className="px-6 pb-6">
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <iframe
                src={dashboard.iframeUrl}
                width="100%"
                height={dashboard.height || 600}
                frameBorder="0"
                allowFullScreen
                className="w-full"
                title={dashboard.title}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardCard;
