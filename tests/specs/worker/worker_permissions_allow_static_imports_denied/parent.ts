// `allowStaticImports` resolves the worker's static imports under the spawning
// thread's permissions — it cannot grant more than the spawner itself has.
// Here the parent has no `--allow-import`, so the worker's statically
// analyzable remote import is denied even with `allowStaticImports: true`.
new Worker(import.meta.resolve("./worker.ts"), {
  type: "module",
  deno: {
    permissions: {
      import: false,
    },
    allowStaticImports: true,
  },
});
