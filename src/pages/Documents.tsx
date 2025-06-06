
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Grid3X3, List } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { usePDFs, PDFDocument } from '@/contexts/PDFContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import PDFCard from '@/components/PDFCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DocumentsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { user } = useAuth();
  const { getFilteredDocuments, deleteDocument, categories } = usePDFs();
  const { toast } = useToast();

  const filteredDocuments = getFilteredDocuments(
    selectedCategory === 'all' ? undefined : selectedCategory
  );

  const handleDeleteDocument = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este documento?')) {
      deleteDocument(id);
      toast({
        title: "Sucesso",
        description: "Documento excluído com sucesso"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-heading font-bold text-rmh-primary">
                Documentos PDF
              </h1>
              <p className="text-rmh-gray mt-1">
                Acesse e organize os documentos da empresa
              </p>
            </div>
            
            {user?.role === 'admin' && (
              <Button className="bg-rmh-primary hover:bg-rmh-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Novo Documento
              </Button>
            )}
          </div>

          {/* Filters and View Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              {selectedCategory !== 'all' && (
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory('all')}
                  className="border-rmh-primary text-rmh-primary hover:bg-rmh-primary hover:text-white"
                >
                  Limpar Filtros
                </Button>
              )}

              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' 
                    ? 'bg-rmh-primary hover:bg-rmh-secondary rounded-none' 
                    : 'text-rmh-primary hover:bg-rmh-light rounded-none'
                  }
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' 
                    ? 'bg-rmh-primary hover:bg-rmh-secondary rounded-none' 
                    : 'text-rmh-primary hover:bg-rmh-light rounded-none'
                  }
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="space-y-4">
            {filteredDocuments.length > 0 ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-rmh-gray">
                  <FileText className="h-4 w-4" />
                  <span>
                    {filteredDocuments.length} documento{filteredDocuments.length !== 1 ? 's' : ''} encontrado{filteredDocuments.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                }>
                  {filteredDocuments.map((document) => (
                    <PDFCard
                      key={document.id}
                      document={document}
                      onDelete={handleDeleteDocument}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-rmh-gray mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-rmh-primary mb-2">
                  Nenhum documento encontrado
                </h3>
                <p className="text-rmh-gray mb-6">
                  {selectedCategory !== 'all'
                    ? 'Tente ajustar os filtros para encontrar documentos.'
                    : 'Não há documentos enviados ainda.'}
                </p>
                {selectedCategory !== 'all' && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedCategory('all')}
                    className="border-rmh-primary text-rmh-primary hover:bg-rmh-primary hover:text-white"
                  >
                    Limpar Filtros
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentsPage;
