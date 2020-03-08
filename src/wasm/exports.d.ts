type WasmNumber = WebAssembly.Global;

interface WasmModule {
  add: (a: number, b: number) => number;
  ANSWER_TO_LIFE_UNIVERSE_AND_EVERYTHING: WasmNumber;
  // Add more exports here!
}

export type WasmExports = WasmModule & WebAssembly.Exports;