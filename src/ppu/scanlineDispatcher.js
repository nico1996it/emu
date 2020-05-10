import preRender from "./preRender";
import visibleScanlines from "./visibleScanlines";
import postRender from "./postRender";
import vBank from "./vBank";
import ppu from "./ppu";
import spriteEvaluation from "./spriteEvaluation";
import colorMixer from "./colorMixer";
function scanlineDispatcher(scanline, pixel) {
  if (scanline >= 0 && scanline <= 239) {
    if (ppu.backgroundEnable === 1) {
      visibleScanlines(scanline, pixel);
    }
    if (ppu.spriteEnable === 1) {
      spriteEvaluation(scanline, pixel);
    }

    if (pixel <= 256) {
      colorMixer.print(scanline, pixel);
    }
  } else if (scanline >= 241 && scanline <= 260) vBank(scanline, pixel);
  else if (scanline === 240) postRender(scanline, pixel);
  else if (scanline === 261) preRender(scanline, pixel);
}
export default scanlineDispatcher;
