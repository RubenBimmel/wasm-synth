import { Module } from "assemblyscript-loader";

const defaultImportObject = { env: { abort: () => console.log("Abort!") } };

export async function initWasm(wasmModulePath: string, importObject?: {[key: string]: any}): Promise<Module> {
  const loader = require("assemblyscript-loader");
  return loader.load(wasmModulePath, { imports: importObject ?? defaultImportObject });
}

// https://github.com/torch2424/wasm-by-example/blob/master/demo-util/
export async function initWasmBrowser(wasmModuleUrl: string, importObject?: WebAssembly.Imports): Promise<WebAssembly.WebAssemblyInstantiatedSource> {
  let response: WebAssembly.WebAssemblyInstantiatedSource;
  importObject = importObject ?? defaultImportObject;

  // Check if the browser supports streaming instantiation
  if (WebAssembly.instantiateStreaming) {
    // Fetch the module, and instantiate it as it is downloading
    response = await WebAssembly.instantiateStreaming(
      fetch(wasmModuleUrl),
      importObject
    );
  } else {
    // Fallback to using fetch to download the entire module
    // And then instantiate the module
    const fetchAndInstantiateTask = async () => {
      const wasmArrayBuffer = await fetch(wasmModuleUrl).then(response =>
        response.arrayBuffer()
      );
      return WebAssembly.instantiate(wasmArrayBuffer, importObject);
    };
    response = await fetchAndInstantiateTask();
  }

  return response;
};
