import React from 'react';
import { Plus } from 'lucide-react';
import { useGraphs } from '../../context/GraphsContext';
import { useDrawer } from '../../context/DrawerContext';
import { DataTable } from '../../components/shared/DataTable';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { GraphForm } from './GraphForm';

export const Graphs: React.FC = () => {
  const { graphs, loading, deleteGraph } = useGraphs();
  const { openDrawer } = useDrawer();

  if (loading) {
    return <div>Loading...</div>;
  }

  const columns = [
    { key: '_id', header: 'Graph ID' },
    { key: 'mapId', header: 'Map ID' },
    {
      key: 'isActive',
      header: 'Status',
      render: (value: boolean) => (
        <Badge variant={value ? 'success' : 'warning'}>
          {value ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
  ];

  const handleEdit = (graph: typeof graphs[0]) => {
    openDrawer(<GraphForm graph={graph} />);
  };

  const handleCreate = () => {
    openDrawer(<GraphForm />);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Graphs</h1>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4 inline" />
          Add Graph
        </Button>
      </div>
      <DataTable
        data={graphs}
        columns={columns}
        onEdit={handleEdit}
        onDelete={deleteGraph}
      />
    </div>
  );
};