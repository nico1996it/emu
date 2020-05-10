import displayPattern from "../gui/displayPattern";
import drawingFunctions from "./drawingFunctions";
import scanlineDispatcher from "./scanlineDispatcher";
import cpuBus from "../cpu/cpuBus";
import clock from "../clock";
class ppu {
  memory = new Uint8Array(0x4000);
  oamMemory = new Uint8Array(256);
  vRamAdDress;
  clockCycle = 0;
  scanLineNr = 0;
  pixelNr = 0;
  bgRegister;
  bgPaletteReg;
  spriteRegister = [];
  PPUCTRL = new Uint8Array(1);
  PPUMASK = new Uint8Array(1);
  PPUSTATUS = new Uint8Array(1);
  OAMADDR = new Uint8Array(1);
  PPUSCROLL = new Uint8Array(1);

  nWritePPUaddr = 0;
  constructor() {
    this.PPUSTATUS[0] = 0b01000000;
  }

  set PPUADDR(value) {
    if (this.nWritePPUaddr === 0) {
      this.vRamAdDress = value << 8;
      this.nWritePPUaddr = 1;
    } else {
      this.vRamAdDress += value;
      this.nWritePPUaddr = 0;
    }
  }

  set PPUDATA(value) {
    this.memory[this.vRamAdDress] = value;

    this.vRamAdDress += this.VRAMIncrement; //1 or 32 it depends on ppuctrl
  }
  get PPUDATA() {
    var result = this.memory[this.vRamAdDress];

    this.vRamAdDress += this.VRAMIncrement; //1 or 32 it depends on ppuctrl
    return result;
  }

  set OAMDATA(value) {
    this.oamMemory[this.OAMADDR] = value;
    this.OAMADDR[0]++;
  }
  set OAMDMA(value) {
    var cpuAdr = value << 8;
    for (var i = 0; i < 256; i++) {
      cpuBus.adr = cpuAdr;
      this.oamMemory[this.OAMADDR[0]] = cpuBus.value;
      this.OAMADDR[0]++;
      cpuAdr++;
    }
    clock.freezeForOam();
  }

  get VRAMIncrement() {
    return this.PPUCTRL & 0b100 ? 32 : 1;
  }
  get baseNameTable() {
    var result = this.PPUCTRL & ~0b11111100;
    switch (result) {
      case 0:
        return 0x2000;

      case 1:
        return 0x2400;

      case 2:
        return 0x2800;

      case 3:
        return 0x2c00;

      default:
        break;
    }
  }
  get bgPatternTable() {
    return this.PPUCTRL[0] & 0b10000 ? 1 : 0;
  }
  get spritePatternTable() {
    return this.PPUCTRL[0] & 0b1000 ? 1 : 0;
  }
  get enableNmi() {
    return this.PPUCTRL[0] & 0b10000000 ? 1 : 0;
  }
  get backgroundEnable() {
    return this.PPUMASK[0] & 0b00001000 ? 1 : 0;
  }
  get spriteEnable() {
    return this.PPUMASK[0] & 0b00010000 ? 1 : 0;
  }
  set vBankFlag(value) {
    if (value === 1) this.PPUSTATUS[0] |= 0b10000000;
    else if (value === 0) {
      this.PPUSTATUS[0] &= ~0b10000000;
    }
  }

  step() {
    this.pixelNr++;
    if (this.pixelNr % 341 === 0) {
      //first cycle of the next scan line
      this.pixelNr = 0; //reset pixel
      this.scanLineNr++; //increase scan line
    }
    if (this.scanLineNr === 262) {
      //next frame
      this.pixelNr = 0; //reset pixel
      this.scanLineNr = 0; //reset scanline
    }

    scanlineDispatcher(this.scanLineNr, this.pixelNr);
  }
}

ppu.prototype.drawTile = drawingFunctions.drawTile;
ppu.prototype.getRow = drawingFunctions.getRow;

export default new ppu();
