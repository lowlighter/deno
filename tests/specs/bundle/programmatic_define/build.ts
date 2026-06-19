const result = await Deno.bundle({
  entrypoints: ["./entry.ts"],
  outputPath: "./out.js",
  define: { FLAG: '"prod"' },
  dropLabels: ["DEV"],
});

console.log("success:", result.success);
