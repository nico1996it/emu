import ppu from "./ppu";
import cpuRam from "../cpu/cpuRam";

const nameMirror = { bound: [0x3000, 0x3eff], mirror: [0x2000, 0x2eff] };
const paletteMirror = { bound: [0x3f20, 0x3fff], mirror: [0x3f00, 0x3f1f] };
class ppuBus {
  adr;
  addressMirror = [nameMirror, paletteMirror];
  set address(address) {
    for (var i = 0; i < this.addressMirror.length; i++) {
      var mirror = this.addressMirror[i];
    }
    this.adr = address;
  }
  get address() {
    return this.adr;
  }

  get value() {
    return ppu.memory[this.adr];
  }
  set value(value) {
    ppu.memory[this.adr] = value;
  }
}

export default new ppuBus();
