// Copyright 2018-2025 the Deno authors. MIT license.
import { assertEquals, assertIsError, delay } from "./test_util.ts";

Deno.test(
  { permissions: { env: true, read: true } },
  async function workerEnvArrayPermissions() {
    const { promise, resolve } = Promise.withResolvers<boolean[]>();

    const worker = new Worker(
      import.meta.resolve(
        "../testdata/workers/env_read_check_worker.js",
      ),
      { type: "module", deno: { permissions: { env: ["test", "OTHER"] } } },
    );

    worker.onmessage = ({ data }) => {
      resolve(data.permissions);
    };

    worker.postMessage({
      names: ["test", "TEST", "asdf", "OTHER"],
    });

    const permissions = await promise;
    worker.terminate();

    if (Deno.build.os === "windows") {
      // windows ignores case
      assertEquals(permissions, [true, true, false, true]);
    } else {
      assertEquals(permissions, [true, false, false, true]);
    }
  },
);

Deno.test(
  { permissions: { import: true } },
  async function workerImportPermissions() {
    const { promise, resolve, reject } = Promise.withResolvers<boolean[]>();

    const worker = new Worker(
      import.meta.resolve(
        "../testdata/workers/static_remote.ts",
      ),
      { type: "module", deno: { permissions: { import: false } } },
    );

    worker.onerror = (error) => {
      resolve(error);
    };

    await Promise.race([promise, delay(500)]);
    worker.terminate();

    assertIsError(
      await promise,
      /Requires import access to "example.com:443", run again with the --allow-import flag/i,
    );
  },
);
