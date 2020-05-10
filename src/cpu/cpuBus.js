import cpuRam from "./cpuRam";
import rom from "../rom";
import ppu from "../ppu/ppu";
import controller from "../controller/controller";
window.rom = rom;
window.ppu = ppu;

const ramBound = { bound: [0x00, 0x07ff], d: cpuRam.memory };

const PPUCTRL = { bound: [0x2000, 0x2000], d: ppu.PPUCTRL };
const PPUMASK = { bound: [0x2001, 0x2001], d: ppu.PPUMASK };
const PPUSTATUS = { bound: [0x2002, 0x2002], d: ppu.PPUSTATUS };
const OAMADDR = { bound: [0x2003, 0x2003], d: ppu.OAMADDR };
const CTRL1 = { bound: [0x4016, 0x4016], d: controller, p: "CTRL1" };
const OAMDATA = {
  bound: [0x2004, 0x2004],
  d: ppu,
  p: "OAMDATA",
  t: "REGISTER",
};
const PPUSCROLL = { bound: [0x2005, 0x2005], d: ppu.PPUSCROLL };
const PPUADDR = {
  bound: [0x2006, 0x2006],
  d: ppu,
  p: "PPUADDR",
};
const PPUDATA = {
  bound: [0x2007, 0x2007],
  d: ppu,
  p: "PPUDATA",
};
const OAMDMA = { bound: [0x4014, 0x4014], d: ppu, p: "OAMDMA" };

var memory = new Uint8Array(10000);

window.a = memory;
class CpuBus {
  addressSpaces = [
    ramBound,
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
    CTRL1,
  ];
  address = 0;
  selectedDevice = {};
  offset = 0;

  set adr(value) {
    this.address = value;

    for (var i = 0; i < this.addressSpaces.length; i++) {
      var device = this.addressSpaces[i];

      if (this.address >= device.bound[0] && this.address <= device.bound[1]) {
        this.selectedDevice = device;

        this.offset = device.bound[0];
      }
    }
  }
  get adr() {
    return this.address;
  }

  get value() {
    if (this.selectedDevice.p !== undefined) {
      return this.selectedDevice.d[this.selectedDevice.p];
    } else {
      return this.selectedDevice.d[this.address - this.offset];
    }
  }

  set value(value) {
    if (this.selectedDevice.p !== undefined) {
      this.selectedDevice.d[this.selectedDevice.p] = value;
    } else {
      this.selectedDevice.d[this.address - this.offset] = value;
    }
  }
}

export default new CpuBus();
