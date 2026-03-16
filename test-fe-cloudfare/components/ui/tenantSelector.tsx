import type { TenantId } from '@/lib/tenants';
import { tenantOptions } from '@/lib/tenants';

//Tenant selector - switching tenants changes the Authorization token used

type Props = {
  value: TenantId;
  onChange: (tenantId: TenantId) => void;
};

export function TenantSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label htmlFor="tenant" className="text-sm font-medium text-slate-700">
        Tenant
      </label>

      <select
        id="tenant"
        value={value}
        onChange={(e) => onChange(e.target.value as TenantId)}
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-0 focus:border-slate-400"
      >
        {tenantOptions.map((tenant) => (
          <option key={tenant.id} value={tenant.id}>
            {tenant.label}
          </option>
        ))}
      </select>
    </div>
  );
}