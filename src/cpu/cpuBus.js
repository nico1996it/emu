import { observable } from "mobx";
import cpuRam from "./cpuRam";
import rom from "../rom";
import ppu from "../ppu/ppu";
window.rom = rom;
window.ppu = ppu;

const ramBound = { bound: [0x00, 0x07ff], d: cpuRam, p: "memory" };
const romBound = { bound: [0x8000, 0xffff], d: rom, p: "memory" };
const PPUCTRL = { bound: [0x2000, 0x2000], d: ppu, p: "PPUCTRL" };
const PPUMASK = { bound: [0x2001, 0x2001], d: ppu, p: "PPUMASK" };
const PPUSTATUS = { bound: [0x2002, 0x2002], d: ppu, p: "PPUSTATUS" };
const OAMADDR = { bound: [0x2003, 0x2003], d: ppu, p: "OAMADDR" };
const OAMDATA = { bound: [0x2004, 0x2004], d: ppu, p: "OAMDATA" };
const PPUSCROLL = { bound: [0x2005, 0x2005], d: ppu, p: "PPUSCROLL" };
const PPUADDR = { bound: [0x2006, 0x2006], d: ppu, p: "PPUADDR" };
const PPUDATA = { bound: [0x2007, 0x2007], d: ppu, p: "PPUDATA" };
const OAMDMA = { bound: [0x4014, 0x4014], d: ppu, p: "OAMDMA" };

var memory = new Uint8Array(10000);

window.a = memory;
class CpuBus {
  addressSpaces = [
    ramBound,
    romBound,
    PPUCTRL,
    PPUMASK,
    PPUSTATUS,
    OAMADDR,
    OAMDATA,
    PPUSCROLL,
    PPUADDR,
    PPUDATA,
    OAMDATA,
    OAMDMA,
  ];
  address = 0;
  selectedDevice = null;
  offset = 0;

  set adr(value) {
    this.address = value;

    for (var i = 0; i < this.addressSpaces.length; i++) {
      var device = this.addressSpaces[i];

      if (this.address >= device.bound[0] && this.address <= device.bound[1]) {
        this.selectedDevice = device.d[device.p];
        this.offset = device.bound[0];
      }
    }
  }
  get adr() {
    return this.address;
  }

  get value() {
    return this.selectedDevice[this.address - this.offset];
  }

  set value(value) {
    if (this.address === 0x2006) {
      ppu.PPUADDR = value;
    } else if (this.address === 0x2007) {
      ppu.PPUDATA = value;
    } else if (this.address === 0x2000) {
      console.log(value);
    } else {
      this.selectedDevice[this.address - this.offset] = value;
    }
  }
}

export default new CpuBus();
