import cpu from "../cpu/cpu";
import ppu from "./ppu";
function vBank(scanline, pixel) {
  if (pixel === 1 && scanline === 241) {
    ppu.vBankFlag = 1;
    if (ppu.enableNmi === 1) {
      cpu.NMI();
    }
  }
}
export default vBank;
