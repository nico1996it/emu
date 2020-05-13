import ppu from "./ppu";
import displayPattern from "../gui/displayPattern";
import colorMixer from "./colorMixer";
window.draw = displayPattern;
function spriteEvaluation(scanline, pixel) {
  if (pixel === 257) {
    scanline++;
    ppu.spriteRegister = []; //rest the register
    //find sprites in next scanline
    for (var i = 0; i < 256; i += 4) {
      //every 4 bytes we have the y top pos of a sprite

      if (scanline >= ppu.oamMemory[i] && scanline < ppu.oamMemory[i] + 8) {
        ppu.spriteRegister.push([
          ppu.oamMemory[i],
          ppu.oamMemory[i + 1],
          ppu.oamMemory[i + 2],
          ppu.oamMemory[i + 3],
        ]);
      }
      if (ppu.spriteRegister.length === 8) break; //sprite overflow
    }
  } else if (pixel <= 256) {
    pixel++;
    drawSprite(pixel, scanline);
  }
}
function drawSprite(pixel, scanline) {
  pixel -= 2;
  var spriteToDraw = null;
  for (var sprite of ppu.spriteRegister) {
    //for every sprite in register
    //check if have to print a sprite
    if (pixel >= sprite[3] && pixel < sprite[3] + 8) {
      spriteToDraw = sprite;

      break;
    }
  }
  //if we have something to draw
  if (spriteToDraw != null) {
    var paletteIndex = sprite[2] & 0b00000011; //find the corresponding palette address

    switch (paletteIndex) {
      case 0:
        paletteIndex = 0x3f11;
        break;
      case 1:
        paletteIndex = 0x3f15;
        break;
      case 2:
        paletteIndex = 0x3f19;
        break;
      case 3:
        paletteIndex = 0x3f1d;
        break;
      default:
        break;
    }
    var row = ppu.getRow(
      scanline - sprite[0],
      ppu.spritePatternTable,
      sprite[1]
    );

    var flipHorizontal = sprite[2] & 0b01000000;
    var posInRow = pixel - sprite[3];
    if (flipHorizontal) {
      posInRow = Math.abs(posInRow - 7);
    }
    var pixelColorIndex = row[posInRow];

    var color;

    if (pixelColorIndex !== 0) {
      color = ppu.memory[paletteIndex + pixelColorIndex - 1];
      colorMixer.priority = sprite[2] & 0b00100000;
      colorMixer.spriteColor = color;
    }
  }
}
export default spriteEvaluation;
