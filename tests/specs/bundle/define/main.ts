declare const DEBUG: boolean;
declare const VERSION: string;

DEV: {
  console.log("dev-only logging");
}

TEST: {
  console.log("test-only logging");
}

if (DEBUG) {
  console.log("debug build");
} else {
  console.log("release build");
}

console.log(`version ${VERSION}`);
