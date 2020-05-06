import preRender from "./preRender";
import visibleScanlines from "./visibleScanlines";
import postRender from "./postRender";
import vBank from "./vBank";
import ppu from "./ppu";
function scanlineDispatcher(scanline, pixel) {
  if (scanline === 261) preRender(scanline, pixel);
  else if (scanline >= 0 && scanline <= 239) visibleScanlines(scanline, pixel);
  //else if (scanline === 0 && pixel === 0) ppu.printNametable();
  else if (scanline === 240) postRender(scanline, pixel);
  else if (scanline >= 241 && scanline <= 260) vBank(scanline, pixel);
}
export default scanlineDispatcher;
