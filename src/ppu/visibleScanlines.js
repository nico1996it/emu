import ppu from "./ppu";
import displayPattern from "../gui/displayPattern";
import colorMixer from "./colorMixer";

function findPalette(pixel, scanline) {
  var atrByteAddress =
    0x3c0 +
    ppu.baseNameTable +
    Math.floor(pixel / 32) + //number of this tile in this scanline
    Math.floor(scanline / 32) * 8; //number of tiles in the prev scanlines
  var quadrantLR = pixel % 32 >= 16 ? 1 : 0;
  var quadrantTB = scanline % 32 >= 16 ? 1 : 0;
  var atrByte = ppu.memory[atrByteAddress];
  var paletteIndex;

  if (quadrantLR && quadrantTB) {
    //Right bottom
    paletteIndex = (atrByte & 0b11000000) >> 6;
  } else if (!quadrantLR && quadrantTB) {
    //bottom left

    paletteIndex = (atrByte & 0b00110000) >> 4;
  } else if (quadrantLR && !quadrantTB) {
    //top right

    paletteIndex = (atrByte & 0b00001100) >> 2;
  } else if (!quadrantLR && !quadrantTB) {
    //top left

    paletteIndex = atrByte & 0b00000011;
  }

  switch (
    paletteIndex //find the corresponding palette address
  ) {
    case 0:
      return 0x3f01;
    case 1:
      return 0x3f05;
    case 2:
      return 0x3f09;
    case 3:
      return 0x3f0d;
    default:
      break;
  }
}

function visibleScanlines(scanline, pixel) {
  pixel--; // sincronize with the fact the it renders from pixel 1 not 0

  if (pixel % 8 === 0 && pixel <= 256) {
    var tileNumber = pixel / 8;

    //here will be crucial for scrolling
    var addressOfTile =
      ppu.baseNameTable + tileNumber + Math.floor(scanline / 8) * 32;
    var byteOfTile = ppu.memory[addressOfTile];
    ppu.bgRegister = ppu.getRow(scanline % 8, ppu.bgPatternTable, byteOfTile);

    ppu.bgPaletteReg = findPalette(pixel, scanline);
  }

  if (pixel < 256 && pixel >= 0) {
    var color;

    var pixelColorIndex = ppu.bgRegister[pixel % 8];
    if (pixelColorIndex === 0) color = ppu.memory[0x3f00];
    else color = ppu.memory[pixelColorIndex + ppu.bgPaletteReg - 1];

    colorMixer.bgColor = color;
  }
}

export default visibleScanlines;
