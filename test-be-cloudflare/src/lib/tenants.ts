import type { EnvBindings, TenantId } from '../env';

export function getTenantFromToken(
  token: string,
  env: EnvBindings,
): TenantId | null {
  if (token === env.TOKEN_TENANT_A) {
    return 'tenant_a';
  }

  if (token === env.TOKEN_TENANT_B) {
    return 'tenant_b';
  }

  return null;
}