// sine-processor.js
class SineProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.port.onmessage = (event) => this.midiMessageReceived(this, event);
    this.voices = {};
  }

  process (inputs, outputs, parameters) {
    const output = outputs[0]
    output.forEach(channel => {
      for (let i = 0; i < channel.length; i++) {
        let result = 0;
        let velocity = 0;
        let voices = 0;
        for (const note in this.voices) {
          result += Math.sin(2 * Math.PI * this.voices[note].frequency * (currentFrame + i - this.voices[note].start) / sampleRate);
          velocity = Math.max(this.voices[note].velocity, velocity);
          voices++;
        }
        channel[i] = result * velocity / voices;
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
    
    // Note that not all MIDI controllers send a separate NOTE_OFF command for every NOTE_ON.
    if (cmd === NOTE_OFF || (cmd === NOTE_ON && velocity === 0)) {
      //Remove note
      delete module.voices[pitch.toString()];
    } else if (cmd === NOTE_ON) {
      //Add note
      module.voices[pitch.toString()] = {
        frequency: getFrequency(pitch),
        velocity: velocity / 128,
        start: currentFrame
      }
    }
  }
}

function getFrequency(pitch) {
  return 13.75 * Math.pow(2, (pitch - 9) / 12);
}

registerProcessor('sine-processor', SineProcessor);