//cose per demo
import cpu from "./cpu/cpu";
import ppu from "./ppu/ppu";
var to_wait = 0;
function sleep() {
  const date = performance.now();
  do {} while (performance.now() - date < 0.0005599 * to_wait);
}

class clock {
  cycle = 0;

  increment(value) {
    this.cycle += value;
    to_wait += value;
  }
  reset() {
    to_wait = 0;
  }
  step() {
    for (var i = 0; i < 50000; i++) {
      cpu.step();
      ppu.step();
      ppu.step();
      ppu.step();
    }
  }
}

export default new clock();
