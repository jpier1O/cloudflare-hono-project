
'use client'


import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTask, deleteTask, getTasks } from '@/lib/api';
import type { TenantId } from '@/lib/tenants';
import { TenantSelector } from '@/components/ui/tenantSelector';
import { TaskForm } from '@/components/ui/forms/taskForm';
import { TaskList } from '@/components/ui/list/taskList';


export default function Home() {
  const [tenantId, setTenantId] = useState<TenantId>('tenant_a');
  const queryClient = useQueryClient();

  const queryKey = useMemo(() => ['tasks', tenantId], [tenantId]);

  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => getTasks(tenantId),
  });

  const createTaskMutation = useMutation({
    mutationFn: (input: { title: string; status: 'pending' | 'done' }) =>
      createTask(tenantId, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => deleteTask(tenantId, taskId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <p className="text-sm font-medium text-slate-500">Cloudflare Challenge with Hono and Next.js</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Multi-tenant Task Manager
          </h1>
          <p className="mt-3 text-slate-600">
            This is a simple multi-tenant task manager built with Hono and Next.js.
          </p>
          
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <TenantSelector value={tenantId} onChange={setTenantId} />
        </div>

        <TaskForm
          isPending={createTaskMutation.isPending}
          onSubmit={async (input) => {
            await createTaskMutation.mutateAsync(input);
          }}
        />

        {isError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Error: {error instanceof Error ? error.message : 'No se pudieron cargar las tareas.'}
          </div>
        ) : null}

        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          isDeleting={deleteTaskMutation.isPending}
          onDelete={async (taskId) => {
            await deleteTaskMutation.mutateAsync(taskId);
          }}
        />
        </div>
      </main>
    </div>
  );
}
