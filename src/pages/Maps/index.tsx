import React from 'react';
import { Plus } from 'lucide-react';
import { useMaps } from '../../context/MapsContext';
import { useDrawer } from '../../context/DrawerContext';
import { DataTable } from '../../components/shared/DataTable';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { MapForm } from './MapForm';

export const Maps: React.FC = () => {
  const { maps, loading, deleteMap } = useMaps();
  const { openDrawer } = useDrawer();

  if (loading) {
    return <div>Loading...</div>;
  }

  const columns = [
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

  const handleEdit = (map: typeof maps[0]) => {
    openDrawer(<MapForm map={map} />);
  };

  const handleCreate = () => {
    openDrawer(<MapForm />);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Maps</h1>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4 inline" />
          Add Map
        </Button>
      </div>
      <DataTable
        data={maps}
        columns={columns}
        onEdit={handleEdit}
        onDelete={deleteMap}
      />
    </div>
  );
};