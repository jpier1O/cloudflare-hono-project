
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <p className="text-sm font-medium text-slate-500">Cloudflare Challenge with Hono and Next.js</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Multi-tenant Task Manager
          </h1>
          <p className="mt-3 text-slate-600">
            This is a simple multi-tenant task manager built with Hono and Next.js.
          </p>
        </div>
      </main>
    </div>
  );
}
