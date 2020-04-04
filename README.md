# AssemblyScript project

### To get this working:
- `npm i`
- `npm run asbuild`
- `npm run serve`
- Go to http://localhost:1234

### Significant files:
- `src/wasm/assembly/index.ts`: the actual AssemblyScript file
- `src/wasm/build/optimized.wasm` / `src/wasm/build/untouched.wasm`: the binary files (optimized and non-optimized) built from the AssemblyScript that need to be initialised somewhere in your code.
- `src/wasm/exports.d.ts`: file where you can put TypeScript definitions of the exports from your WASM module, so that there is good intellisense
- `src/index-browser.ts`: the script that is run from the browser

### Wasm template:
- https://github.com/Jirinrin/AssemblyScript-Template