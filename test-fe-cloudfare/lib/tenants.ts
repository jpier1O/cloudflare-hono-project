export type TenantId = 'tenant_a' | 'tenant_b';

export const tenantOptions: { id: TenantId; label: string }[] = [
  { id: 'tenant_a', label: 'Tenant A' },
  { id: 'tenant_b', label: 'Tenant B' },
];

export function getTenantToken(tenantId: TenantId): string {
  console.log('TOKEN A:', process.env.NEXT_PUBLIC_TOKEN_TENANT_A);
  console.log('TOKEN B:', process.env.NEXT_PUBLIC_TOKEN_TENANT_B);

  if (tenantId === 'tenant_a') {
    return process.env.NEXT_PUBLIC_TOKEN_TENANT_A ?? '';
  }

  return process.env.NEXT_PUBLIC_TOKEN_TENANT_B ?? '';
}