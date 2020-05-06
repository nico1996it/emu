import displayPattern from "../gui/displayPattern";
import drawingFunctions from "./drawingFunctions";
import scanlineDispatcher from "./scanlineDispatcher";
class ppu {
  memory = new Uint8Array(0x4000);
  vRamAdDress;
  clockCycle = 0;
  scanLineNr = 0;
  pixelNr = 0;
  bgRegister;
  bgPaletteReg;
  PPUCTRL = new Uint8Array(1);
  PPUMASK = new Uint8Array(1);
  PPUSTATUS = new Uint8Array(1);
  OAMADDR = new Uint8Array(1);
  OAMDATA = new Uint8Array(1);
  PPUSCROLL = new Uint8Array(1);
  OAMDMA = new Uint8Array(1);

  constructor() {
    this.PPUSTATUS[0] = 0b10000000;
  }
  nWritePPUaddr = 0;
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
    this.vRamAdDress += this.VRAMIncrement; //da mettere 1/32 a seconda di ppuctrl
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
  get enableNmi() {
    return this.PPUCTRL[0] & 0b10000000 ? 1 : 0;
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
