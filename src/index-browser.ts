import getWasmBrowser from "./wasm/get-wasm-browser";
import { WasmExports } from "./wasm/exports";

const runWasmAdd = async () => {
  // Instantiate our wasm module
  const wasmModule = await getWasmBrowser("./wasm/optimized.wasm");
  const moduleExports = wasmModule.instance.exports as WasmExports;

  // Call the Add function export from wasm, save the result
  const addResult = moduleExports.add(24, 24);

  // Set the result onto the body
  document.body.textContent = `Hello World! addResult: ${addResult}`;
};
runWasmAdd();