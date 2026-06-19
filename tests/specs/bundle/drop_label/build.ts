const result = await Deno.bundle({
  entrypoints: ["./main.ts"],
  outputPath: "./out_api.js",
  dropLabels: ["DEV"],
});

console.log("success:", result.success);
