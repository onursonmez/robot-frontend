import React from 'react';
import { Plus } from 'lucide-react';
import { useRobots } from '../../context/RobotsContext';
import { useDrawer } from '../../context/DrawerContext';
import { DataTable } from '../../components/shared/DataTable';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { RobotForm } from './RobotForm';

export const Robots: React.FC = () => {
  const { robots, loading, deleteRobot } = useRobots();
  const { openDrawer } = useDrawer();

  if (loading) {
    return <div>Loading...</div>;
  }

  const columns = [
    { key: 'serialNumber', header: 'Serial Number' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <Badge
          variant={
            value === 'IDLE'
              ? 'success'
              : value === 'IN_PROGRESS'
              ? 'info'
              : 'warning'
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'connectionState',
      header: 'Connection State',
      render: (value: string) => (
        <Badge variant={value === 'CONNECTED' ? 'success' : 'error'}>
          {value}
        </Badge>
      ),
    },
  ];

  const handleEdit = (robot: typeof robots[0]) => {
    openDrawer(<RobotForm robot={robot} />);
  };

  const handleCreate = () => {
    openDrawer(<RobotForm />);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Robots</h1>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4 inline" />
          Add Robot
        </Button>
      </div>
      <DataTable
        data={robots}
        columns={columns}
        onEdit={handleEdit}
        onDelete={deleteRobot}
      />
    </div>
  );
};