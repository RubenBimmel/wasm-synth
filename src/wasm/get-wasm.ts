import * as fs from "fs";
import * as loader from "@assemblyscript/loader";

const wasm = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), { /* imports */ });
export default wasm;