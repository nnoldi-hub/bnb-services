'use client';

import { useEffect, useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { apiClient } from '@/lib/api-client';

interface Task {
  id: string;
  title: string;
  description?: string;
  type: 'CLEANING' | 'EMERGENCY' | 'MAINTENANCE' | 'INSPECTION';
  status: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate?: string;
  property: {
    id: string;
    name: string;
  };
  assignedTo?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

const statusColors = {
  PENDING: 'bg-gray-100 text-gray-800',
  ASSIGNED: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

const priorityColors = {
  LOW: 'bg-gray-100 text-gray-600',
  MEDIUM: 'bg-blue-100 text-blue-600',
  HIGH: 'bg-orange-100 text-orange-600',
  URGENT: 'bg-red-100 text-red-600',
};

const typeLabels = {
  CLEANING: 'Curățenie',
  EMERGENCY: 'Urgență',
  MAINTENANCE: 'Mentenanță',
  INSPECTION: 'Inspecție',
};

const statusLabels = {
  PENDING: 'În Așteptare',
  ASSIGNED: 'Asignat',
  IN_PROGRESS: 'În Lucru',
  COMPLETED: 'Finalizat',
  CANCELLED: 'Anulat',
};

const priorityLabels = {
  LOW: 'Scăzută',
  MEDIUM: 'Medie',
  HIGH: 'Înaltă',
  URGENT: 'Urgentă',
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get<{ success: boolean; data: Task[] }>('/tasks');
      setTasks(response.data || []);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTasks = statusFilter === 'ALL'
    ? tasks
    : tasks.filter(task => task.status === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Taskuri</h1>
          <p className="mt-2 text-gray-600">
            Gestionează taskurile pentru proprietățile tale
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adaugă Task
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={statusFilter === 'ALL' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter('ALL')}
        >
          Toate
        </Button>
        {Object.entries(statusLabels).map(([status, label]) => (
          <Button
            key={status}
            variant={statusFilter === status ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter(status)}
          >
            {label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Se încarcă...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12">
            <p className="text-gray-600 mb-4">
              {statusFilter === 'ALL'
                ? 'Nu ai încă taskuri create'
                : `Nu există taskuri cu statusul "${statusLabels[statusFilter as keyof typeof statusLabels]}"`}
            </p>
            {statusFilter === 'ALL' && (
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adaugă Primul Task
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[task.status]}`}>
                        {statusLabels[task.status]}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${priorityColors[task.priority]}`}>
                        {priorityLabels[task.priority]}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-600">
                        {typeLabels[task.type]}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <CardDescription className="mt-1">
                      Proprietate: {task.property.name}
                    </CardDescription>
                  </div>
                  {task.dueDate && (
                    <div className="text-sm text-gray-500">
                      Termen: {new Date(task.dueDate).toLocaleDateString('ro-RO')}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {task.description && (
                  <p className="text-sm text-gray-600 mb-4">{task.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {task.assignedTo ? (
                      <span>Asignat: {task.assignedTo.firstName} {task.assignedTo.lastName}</span>
                    ) : (
                      <span className="italic">Neasignat</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Detalii
                    </Button>
                    {task.status !== 'COMPLETED' && task.status !== 'CANCELLED' && (
                      <Button variant="outline" size="sm">
                        Actualizează
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
