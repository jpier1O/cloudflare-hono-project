export const TENANT_IDS = ['tenant_a', 'tenant_b'] as const;
export type TenantId = (typeof TENANT_IDS)[number];

export type EnvBindings = {
  DATABASE_URL: string;
  TOKEN_TENANT_A: string;
  TOKEN_TENANT_B: string;
};

export type AppBindings = {
  Bindings: EnvBindings;
  Variables: {
    tenantId: TenantId;
    token: string;
  };
};