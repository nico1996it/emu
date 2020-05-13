import displayPattern from "../gui/displayPattern";

class colorMixer {
  bgColor;
  spriteColor = null;
  priority = null;
  print(scanline, pixel) {
    var color;
    if (this.spriteColor != null) color = this.spriteColor;
    else color = this.bgColor;
    displayPattern.drawPixel(pixel, scanline, color);
    this.spriteColor = null;
  }
}
export default new colorMixer();
