// The parent holds `--allow-import` and spawns a worker restricted with
// `import: false` but `allowStaticImports: true`. The worker's statically
// analyzable imports are resolved under the parent's permissions while its
// module graph is built, so the worker may load the remote modules its source
// statically imports even though it has no import permission of its own.
new Worker(import.meta.resolve("./worker.ts"), {
  type: "module",
  deno: {
    permissions: {
      import: false,
    },
    allowStaticImports: true,
  },
});
