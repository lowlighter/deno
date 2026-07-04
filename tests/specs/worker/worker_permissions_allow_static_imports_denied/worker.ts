// The parent has no `--allow-import`, so this statically analyzable remote
// import cannot be resolved under the parent's permissions and is denied even
// though `allowStaticImports` is set.
import { add } from "http://localhost:4545/add.ts";

console.log("FAIL: worker imported a remote module the parent could not");
console.log(add(1, 2));
