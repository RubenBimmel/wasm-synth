interface WasmModule {
  add: (a: number, b: number) => number;
  // Add more exports here!
}

export type WasmExports = WasmModule & WebAssembly.Exports;