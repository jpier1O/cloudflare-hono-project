'use client';

import { useState } from 'react';

type Props = {
  onSubmit: (input: { title: string; status: 'pending' | 'done' }) => Promise<void>;
  isPending: boolean;
};

export function TaskForm({ onSubmit, isPending }: Props) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<'pending' | 'done'>('pending');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    await onSubmit({
      title: trimmedTitle,
      status,
    });

    setTitle('');
    setStatus('pending');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Nueva tarea</h2>
        <p className="text-sm text-slate-500">Crea una tarea para el tenant seleccionado.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-slate-700">
          Título
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej. Revisar documentación"
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="status" className="text-sm font-medium text-slate-700">
          Estado
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'pending' | 'done')}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:border-slate-400"
        >
          <option value="pending">pending</option>
          <option value="done">done</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? 'Creando...' : 'Crear tarea'}
      </button>
    </form>
  );
}