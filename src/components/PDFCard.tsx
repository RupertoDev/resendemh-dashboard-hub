
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Eye, Edit, Trash2, Download, FileText } from 'lucide-react';
import { PDFDocument } from '@/contexts/PDFContext';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PDFCardProps {
  document: PDFDocument;
  onEdit?: (document: PDFDocument) => void;
  onDelete?: (id: string) => void;
}

const PDFCard: React.FC<PDFCardProps> = ({ document, onEdit, onDelete }) => {
  const { user } = useAuth();
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const canEdit = user?.role === 'admin' || document.uploadedBy === user?.email;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = document.fileUrl;
    link.download = document.fileName;
    link.click();
  };

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-rmh-primary/50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg font-heading font-semibold text-rmh-primary line-clamp-1">
                {document.title}
              </CardTitle>
              <CardDescription className="text-sm text-rmh-gray line-clamp-2">
                {document.description}
              </CardDescription>
            </div>
            <div className="flex-shrink-0 ml-3">
              <div className="w-16 h-20 bg-gradient-to-br from-rmh-primary to-rmh-secondary rounded-lg flex items-center justify-center">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="secondary" className="bg-rmh-light text-rmh-primary">
              {document.category}
            </Badge>
            <Badge variant="outline" className="border-rmh-primary text-rmh-primary">
              PDF
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-rmh-gray">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>Enviado em {formatDate(document.uploadedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{document.uploadedBy.split('@')[0]}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={() => setIsViewerOpen(true)}
                className="flex-1 bg-rmh-primary hover:bg-rmh-secondary"
              >
                <Eye className="h-4 w-4 mr-2" />
                Visualizar
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="border-rmh-primary text-rmh-primary hover:bg-rmh-primary hover:text-white"
              >
                <Download className="h-4 w-4" />
              </Button>

              {canEdit && (
                <div className="flex space-x-1">
                  {onEdit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(document)}
                      className="border-rmh-primary text-rmh-primary hover:bg-rmh-primary hover:text-white"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  {onDelete && user?.role === 'admin' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(document.id)}
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
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-xl font-heading font-semibold text-rmh-primary">
              {document.title}
            </DialogTitle>
            <p className="text-sm text-rmh-gray mt-1">{document.description}</p>
          </DialogHeader>
          <div className="px-6 pb-6">
            <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-100 h-96 flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-16 w-16 text-rmh-gray mx-auto mb-4" />
                <p className="text-rmh-gray mb-4">Visualização do PDF</p>
                <Button onClick={handleDownload} className="bg-rmh-primary hover:bg-rmh-secondary">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar PDF
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PDFCard;
