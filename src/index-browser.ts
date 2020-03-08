// import { getWasmBrowser } from "./wasm";

const getWasmBrowser = async (wasmModuleUrl: string, importObject?: WebAssembly.Imports): Promise<WebAssembly.WebAssemblyInstantiatedSource> => {
  let response: WebAssembly.WebAssemblyInstantiatedSource = undefined;

  if (!importObject) {
    importObject = {
      env: {
        abort: () => console.log("Abort!")
      }
    };
  }

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


const runWasmAdd = async () => {
  // Instantiate our wasm module
  const wasmModule = await getWasmBrowser("./src/wasm/build/optimized.wasm");

  // Call the Add function export from wasm, save the result
  const addResult = (wasmModule.instance.exports as any).add(24, 24); // todo: fix type stuff

  // Set the result onto the body
  document.body.textContent = `Hello World! addResult: ${addResult}`;
};
runWasmAdd();