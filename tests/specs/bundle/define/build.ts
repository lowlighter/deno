const result = await Deno.bundle({
  entrypoints: ["./main.ts"],
  outputPath: "./out_api.js",
  define: { DEBUG: false, VERSION: "1.2.3" },
  dropLabels: ["DEV"],
});

console.log("success:", result.success);
