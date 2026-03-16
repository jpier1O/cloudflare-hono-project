import type { Task } from '@/lib/api';

type Props = {
  tasks: Task[];
  isLoading: boolean;
  isDeleting: boolean;
  onDelete: (taskId: string) => Promise<void>;
};

export function TaskList({ tasks, isLoading, isDeleting, onDelete }: Props) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Cargando tareas...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-center shadow-sm">
        <p className="text-sm text-slate-500">No hay tareas para este tenant.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-slate-900">{task.title}</h3>
              <p className="text-sm text-slate-500">Estado: {task.status}</p>
              <p className="text-xs text-slate-400">ID: {task.id}</p>
              <p className="text-xs text-slate-400">
                Creada: {new Date(task.createdAt).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => onDelete(task.id)}
              disabled={isDeleting}
              className="rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}