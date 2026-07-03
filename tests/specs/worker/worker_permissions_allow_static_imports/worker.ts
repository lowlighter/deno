// This worker has `import: false`, but opted into `allowStaticImports`, so its
// statically analyzable remote imports are resolved under the spawning thread's
// permissions rather than its own.
import { add } from "http://localhost:4545/add.ts";

console.log("worker:", add(3, 4));
self.close();
