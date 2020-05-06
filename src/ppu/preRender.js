import cpu from "../cpu/cpu";
import ppu from "./ppu";

function preRender(scanline, pixel) {
  if (pixel === 1) ppu.vBankFlag = 0;
}
export default preRender;
