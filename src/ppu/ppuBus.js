import ppu from "./ppu";
import cpuRam from "../cpu/cpuRam";

const nameMirror = { bound: [0x3000, 0x3eff], mirror: [0x2000, 0x2eff] };
const nameVert1 = { bound: [0x2800, 0x2bff], mirror: [0x2000, 0x23ff] };
const nameVert2 = { bound: [0x2c00, 0x2fff], mirror: [0x2400, 0x27ff] };
const paletteMirror = { bound: [0x3f20, 0x3fff], mirror: [0x3f00, 0x3f1f] };
const paletteMirror1 = { bound: [0x3f10, 0x3f10], mirror: [0x3f00, 0x3f00] };

class ppuBus {
  adr;
  addressMirror = [
    nameMirror,
    nameVert1,
    nameVert2,
    paletteMirror,
    paletteMirror1,
  ];

  evaluateMirroring(address) {
    for (var i = 0; i < this.addressMirror.length; i++) {
      var range = this.addressMirror[i];
      if (address >= range.bound[0] && address <= range.bound[1]) {
        var offset = range.bound[0] - range.mirror[0];

        return this.evaluateMirroring(address - offset);
      }
    }
    return address;
  }

  set address(address) {
    this.adr = this.evaluateMirroring(address);
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
