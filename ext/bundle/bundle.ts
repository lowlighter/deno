// Copyright 2018-2026 the Deno authors. MIT license.
/// <reference path="../../cli/tsc/dts/lib.deno.unstable.d.ts" />
import { op_bundle } from "ext:core/ops";
import { core, primordials } from "ext:core/mod.js";
const { TextDecoder } = core.loadExtScript("ext:deno_web/08_text_encoding.js");

const {
  SafeArrayIterator,
  Uint8Array,
  ObjectPrototypeIsPrototypeOf,
  ObjectKeys,
  JSONStringify,
} = primordials;

const decoder = new TextDecoder();

export async function bundle(
  options: Deno.bundle.Options,
): Promise<Deno.bundle.Result> {
  if (options.define !== undefined) {
    // Values are JS literals; serialize each to the source text esbuild
    // substitutes (e.g. false -> "false", "1.0.0" -> "\"1.0.0\"").
    const define = { __proto__: null };
    for (const key of new SafeArrayIterator(ObjectKeys(options.define))) {
      define[key] = JSONStringify(options.define[key]);
    }
    options = { ...options, define };
  }
  const result = {
    success: false,
    ...await op_bundle(
      options,
    ),
  };
  result.success = result.errors.length === 0;

  for (
    const f of new SafeArrayIterator(
      // deno-lint-ignore no-explicit-any
      result.outputFiles as any ?? [],
    )
  ) {
    // deno-lint-ignore no-explicit-any
    const file = f as any;
    if (file.contents?.length === 0) {
      delete file.contents;
      file.text = () => "";
    } else {
      if (!ObjectPrototypeIsPrototypeOf(Uint8Array, file.contents)) {
        file.contents = new Uint8Array(file.contents);
      }
      file.text = () => decoder.decode(file.contents ?? "");
    }
  }
  if (result.outputFiles?.length === 0) {
    delete result.outputFiles;
  }
  return result;
}
