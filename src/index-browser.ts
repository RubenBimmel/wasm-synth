import { WasmExportsBrowser } from "./wasm/exports";
import { getWasmBrowser } from "./wasm/get-wasm";

(async () => {
  // Instantiate our wasm module
  const wasmModule = await getWasmBrowser("./wasm/optimized.wasm");
  const moduleExports = wasmModule.instance.exports as WasmExportsBrowser;

  // Call the Add function export from wasm, save the result
  const addResult = moduleExports.add(24, 24);

  const magicNumber = moduleExports.ANSWER_TO_LIFE_UNIVERSE_AND_EVERYTHING.valueOf();

  // Set the result onto the body
  document.body.innerHTML = `Hello World! addResult: ${addResult} <br/> The magic number of today is: ${magicNumber}`;
})();