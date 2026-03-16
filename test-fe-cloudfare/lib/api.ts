import { getTenantToken, type TenantId } from './tenants';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8787';

export type Task = {
  id: string;
  title: string;
  status: 'pending' | 'done';
  tenantId: string;
  createdAt: string;
};

export type CreateTaskInput = {
  title: string;
  status: 'pending' | 'done';
};

async function request<T>(
  path: string,
  tenantId: TenantId,
  init?: RequestInit,
): Promise<T> {
  const token = getTenantToken(tenantId);

  if (!token) {
    throw new Error(`Missing token for ${tenantId}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    let message = 'Request failed';

    try {
      const data = await response.json();
      message = data?.error ?? message;
    } catch {
      // ignore json parse failure
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function getTasks(tenantId: TenantId) {
  return request<Task[]>('/tasks', tenantId, {
    method: 'GET',
  });
}

export function createTask(tenantId: TenantId, input: CreateTaskInput) {
  return request<Task>('/tasks', tenantId, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function deleteTask(tenantId: TenantId, taskId: string) {
  return request<void>(`/tasks/${taskId}`, tenantId, {
    method: 'DELETE',
  });
}