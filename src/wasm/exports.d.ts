import { Exports } from "assemblyscript-loader";

interface WasmModuleFunctions {
  add: (a: number, b: number) => number;
}

type WasmModuleNumberKeys =
| "ANSWER_TO_LIFE_UNIVERSE_AND_EVERYTHING"
;

export type WasmExportsBrowser = WasmModuleFunctions & {[numKey in WasmModuleNumberKeys]: WebAssembly.Global} & WebAssembly.Exports;

export type WasmExports = WasmModuleFunctions & {[numKey in WasmModuleNumberKeys]: number} & Exports;