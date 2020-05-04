import displayPattern from "../gui/displayPattern";
class ppu {
  memory = new Uint8Array(0x4000);
  vRamAdDress;
  PPUCTRL = new Uint8Array(1);
  PPUMASK = new Uint8Array(1);
  PPUSTATUS = new Uint8Array(1);
  OAMADDR = new Uint8Array(1);
  OAMDATA = new Uint8Array(1);
  PPUSCROLL = new Uint8Array(1);
  //PPUADDR = new Uint8Array(1);
  // PPUDATA = new Uint8Array(1);
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
    this.vRamAdDress++;
  }

  printNametable() {
    for (var n = 0; n < 30; n++) {
      for (var i = 0; i < 32; i++) {
        this.drawTile(i * 8, n * 8, this.memory[0x2000 + i + n * 32] + 1, 0);
      }
    }
  }

  //TODO: da spostare
  getRow(row, page, tile) {
    var offset = tile * 16 + row;
    var planeA = this.memory[offset];
    var planeB = this.memory[offset + 0x8];
    var result = [0, 0, 0, 0, 0, 0, 0];

    for (var i = 7; i >= 0; i--) {
      var v = (planeA & 0b1 ? 1 : 0) + ((planeB & 0b1 ? 1 : 0) << 1);

      planeA = planeA >> 1;
      planeB = planeB >> 1;

      result[i] = v;
    }

    return result;
  }

  drawRow(x, y, row) {
    row.map((value, index) => displayPattern.drawPixel(x + index, y, value));
  }
  drawTile(x, y, number, page) {
    for (var i = 0; i < 8; i++) {
      this.drawRow(x, y + i, this.getRow(i, page, number));
    }
  }
  drawTileLine(y, page) {
    for (var i = 0; i < 256 / 8; i++)
      this.drawTile(i * 8, y * 8, y * 32 + i, page);
  }
  drawPage(page) {
    for (var i = 0; i < 256 / 8; i++) this.drawTileLine(i, page);
  }
}
export default new ppu();
