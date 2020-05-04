//cose per demo
import cpu from "./cpu/cpu";
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
    for (var i = 0; i < 500000; i++) {
      cpu.step();
      sleep();
    }
  }
}

export default new clock();
