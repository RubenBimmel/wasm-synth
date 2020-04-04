import { WasmExports } from "./wasm/exports";
import { initWasm } from "./wasm/init-wasm";

document.getElementById('start-sound').addEventListener('click', async () => {
  const audioContext = new AudioContext();
  await audioContext.audioWorklet.addModule('processor/sine-processor.js');
  const sineNode = new AudioWorkletNode(audioContext, 'sine-processor');
  sineNode.connect(audioContext.destination);
  
  navigator.requestMIDIAccess()
  .then(function(midi) {
    const inputs = midi.inputs.values();
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      input.value.addEventListener('midimessage', (m: WebMidi.MIDIMessageEvent) => {
        sineNode.port.postMessage(m.data);
      })
    }
  });
});
