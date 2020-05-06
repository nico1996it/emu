import ppu from "./ppu";
import displayPattern from "../gui/displayPattern";

function findPalette(pixel, scanline) {
  var addressOfPalette =
    0x3c0 +
    ppu.baseNameTable +
    Math.floor(pixel / 32) +
    Math.floor(scanline / 32) * 8;
  var quadrantLR = pixel % 32;
  var quadrantTB = scanline % 32;
  var paletteByte = ppu.memory[addressOfPalette];
  var paletteIndex;

  if (quadrantLR && quadrantTB) {
    //Right bottom
    paletteIndex = (paletteByte & 0b11000000) >> 6;
  } else if (!quadrantLR && quadrantTB) {
    //bottom left
    //Right bottom
    paletteIndex = (paletteByte & 0b00110000) >> 4;
  } else if (quadrantLR && !quadrantTB) {
    //top right
    //Right bottom
    paletteIndex = (paletteByte & 0b00001100) >> 2;
  } else if (!quadrantLR && !quadrantTB) {
    //top left
    //Right bottom
    paletteIndex = paletteByte & 0b00000011;
  }

  switch (paletteIndex) {
    case 0:
      return 0x3f01;
    case 1:
      return 0x3f05;
    case 2:
      return 0x3f09;
    case 3:
      return 0x0f0d;
    default:
      break;
  }
}

function visibleScanlines(scanline, pixel) {
  pixel--; // sincronize with the fact the it renders from pixel 1 not 0
  scanline--; //as above
  if (pixel % 8 === 0 && pixel <= 256) {
    var tileNumber = pixel / 8;

    //here will be crucial for scrolling
    var addressOfTile =
      ppu.baseNameTable + tileNumber + Math.floor(scanline / 8) * 32;
    var byteOfTile = ppu.memory[addressOfTile] + 1;
    ppu.bgRegister = ppu.getRow(scanline % 8, ppu.bgPatternTable, byteOfTile);
    ppu.bgPaletteReg = findPalette(pixel, scanline);
  }

  if (pixel <= 256) {
    var color;
    var pixelColorIndex = ppu.bgRegister[pixel % 8];
    if (pixelColorIndex === 0) color = ppu.memory[0x3f00];
    else color = ppu.memory[pixelColorIndex + ppu.bgPaletteReg - 1];

    displayPattern.drawPixel(pixel, scanline, color);
  }
}

export default visibleScanlines;
