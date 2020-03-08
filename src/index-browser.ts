import getWasmBrowser from "./wasm/get-wasm-browser";

const runWasmAdd = async () => {
  // Instantiate our wasm module
  const wasmModule = await getWasmBrowser("./wasm/optimized.wasm");

  // Call the Add function export from wasm, save the result
  const addResult = (wasmModule.instance.exports as any).add(24, 24); // todo: fix type stuff

  // Set the result onto the body
  document.body.textContent = `Hello World! addResult: ${addResult}`;
};
runWasmAdd();