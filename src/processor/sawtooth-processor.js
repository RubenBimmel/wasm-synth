// sawtooth-processor.js
class SawtoothProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.port.onmessage = (event) => this.midiMessageReceived(this, event);
    this.frequency = 440;
    this.velocity = 0;
  }

  process (inputs, outputs, parameters) {
    const output = outputs[0]
    output.forEach(channel => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = this.velocity * (1 - 2 * (this.frequency * (currentFrame + i) / sampleRate) % 1);
      }
    })
    return true
  }

  midiMessageReceived(module, event) {
    const NOTE_ON = 9;
    const NOTE_OFF = 8;
  
    const cmd = event.data[0] >> 4;
    const pitch = event.data[1];
    const velocity = (event.data.length > 2) ? event.data[2] : 1;
    
    // You can use the timestamp to figure out the duration of each note.
    const timestamp = Date.now();
    
    // Note that not all MIDI controllers send a separate NOTE_OFF command for every NOTE_ON.
    if (cmd === NOTE_OFF || (cmd === NOTE_ON && velocity === 0)) {
      //Remove note
      module.frequency = getFrequency(pitch);
      module.velocity = 0;
    } else if (cmd === NOTE_ON) {
      //Add note
      module.frequency = getFrequency(pitch);
      module.velocity = velocity / 128;
    }
  }
}

function getFrequency(pitch) {
  return 13.75 * Math.pow(2, (pitch - 9) / 12);
}

registerProcessor('sawtooth-processor', SawtoothProcessor);