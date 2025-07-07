import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Minus, Users } from 'lucide-react';
import Header from '@/components/Header';

interface OrgNode {
  id: string;
  name: string;
  position: string;
  children: OrgNode[];
}

const OrganogramPage = () => {
  const [orgData, setOrgData] = useState<OrgNode>({
    id: '1',
    name: 'CEO',
    position: 'Chief Executive Officer',
    children: [
      {
        id: '2',
        name: 'Gerente de Vendas',
        position: 'Sales Manager',
        children: []
      },
      {
        id: '3',
        name: 'Gerente de TI',
        position: 'IT Manager',
        children: []
      }
    ]
  });

  const [newNodeName, setNewNodeName] = useState('');
  const [newNodePosition, setNewNodePosition] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const addNode = () => {
    if (!newNodeName || !newNodePosition) return;

    const newNode: OrgNode = {
      id: Date.now().toString(),
      name: newNodeName,
      position: newNodePosition,
      children: []
    };

    if (selectedNodeId) {
      const updateNodes = (node: OrgNode): OrgNode => {
        if (node.id === selectedNodeId) {
          return {
            ...node,
            children: [...node.children, newNode]
          };
        }
        return {
          ...node,
          children: node.children.map(updateNodes)
        };
      };
      setOrgData(updateNodes(orgData));
    } else {
      setOrgData({
        ...orgData,
        children: [...orgData.children, newNode]
      });
    }

    setNewNodeName('');
    setNewNodePosition('');
    setSelectedNodeId(null);
  };

  const removeNode = (nodeId: string) => {
    const removeFromChildren = (node: OrgNode): OrgNode => {
      return {
        ...node,
        children: node.children.filter(child => child.id !== nodeId).map(removeFromChildren)
      };
    };
    setOrgData(removeFromChildren(orgData));
  };

  const OrgNodeComponent: React.FC<{ node: OrgNode; level: number }> = ({ node, level }) => {
    const isSelected = selectedNodeId === node.id;
    
    return (
      <div className="flex flex-col items-center">
        <div
          className={`bg-white border-2 rounded-lg p-4 m-2 min-w-[200px] cursor-pointer transition-all ${
            isSelected 
              ? 'border-rmh-primary shadow-lg bg-rmh-primary/5' 
              : 'border-rmh-lightGray hover:border-rmh-primary/50 hover:shadow-md'
          }`}
          onClick={() => setSelectedNodeId(isSelected ? null : node.id)}
        >
          <div className="text-center">
            <div className="font-semibold text-rmh-primary text-sm">{node.name}</div>
            <div className="text-xs text-rmh-gray mt-1">{node.position}</div>
            {node.id !== '1' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeNode(node.id);
                }}
                className="mt-2 text-red-500 hover:text-red-700 h-6 w-6 p-0"
              >
                <Minus className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
        
        {node.children.length > 0 && (
          <>
            <div className="w-px h-4 bg-rmh-lightGray"></div>
            <div className="flex items-center">
              {node.children.map((child, index) => (
                <div key={child.id} className="flex flex-col items-center">
                  {index > 0 && <div className="w-8 h-px bg-rmh-lightGray"></div>}
                  <div className="w-px h-4 bg-rmh-lightGray"></div>
                  <OrgNodeComponent node={child} level={level + 1} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-heading font-bold text-rmh-primary">
                Organograma
              </h1>
              <p className="text-rmh-gray mt-1">
                Construa e visualize a estrutura organizacional
              </p>
            </div>
            <Users className="h-8 w-8 text-rmh-primary" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Controls */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-rmh-primary">Adicionar Funcionário</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={newNodeName}
                      onChange={(e) => setNewNodeName(e.target.value)}
                      placeholder="Digite o nome"
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Cargo</Label>
                    <Input
                      id="position"
                      value={newNodePosition}
                      onChange={(e) => setNewNodePosition(e.target.value)}
                      placeholder="Digite o cargo"
                    />
                  </div>
                  {selectedNodeId && (
                    <div className="text-xs text-rmh-gray bg-rmh-light p-2 rounded">
                      Será adicionado como subordinado do funcionário selecionado
                    </div>
                  )}
                  <Button 
                    onClick={addNode}
                    className="w-full bg-rmh-primary hover:bg-rmh-secondary"
                    disabled={!newNodeName || !newNodePosition}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Organogram */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-rmh-primary">Estrutura Organizacional</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto min-h-[500px] p-4">
                    <div className="flex justify-center">
                      <OrgNodeComponent node={orgData} level={0} />
                    </div>
                  </div>
                  <div className="text-xs text-rmh-gray mt-4 p-3 bg-rmh-light rounded">
                    <strong>Instruções:</strong> Clique em um funcionário para selecioná-lo e adicionar subordinados. 
                    Use o botão (-) para remover funcionários (exceto o CEO).
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganogramPage;