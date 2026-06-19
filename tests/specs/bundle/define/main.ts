declare const DEBUG: boolean;
declare const VERSION: string;

if (DEBUG) {
  console.log("debug build");
} else {
  console.log("release build");
}

console.log(`version ${VERSION}`);
