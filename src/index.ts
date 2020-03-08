import { WasmExports } from "./wasm/exports";
import { initWasm } from "./wasm/init-wasm";

(async () => {
  const wasmModule = await initWasm("./src/wasm/build/optimized.wasm");
  const moduleExports = wasmModule.exports as WasmExports;

  console.log(`24 + 24 = ${moduleExports.add(24, 24)}`);
  console.log(`And a magic number is ${moduleExports.ANSWER_TO_LIFE_UNIVERSE_AND_EVERYTHING}`);
})();
