import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function DataTable<T>({ data, columns, onEdit, onDelete }: DataTableProps<T>) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-500"
                >
                  {column.header}
                </th>
              ))}
              {(onEdit || onDelete) && <th className="px-4 py-2 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-4 py-2">
                    {column.render
                      ? column.render(item[column.key], item)
                      : String(item[column.key])}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-2">
                    <div className="flex justify-end space-x-2">
                      {onEdit && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => onEdit(item)}
                        >
                          Edit
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDelete(item)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}