//cose per demo
import cpu from "./cpu/cpu";
import ppu from "./ppu/ppu";

class clock {
  cycle = 0;
  cpuFreeze = 0;
  lastInstructionLen = 0;
  toWait = 0;
  increment(value) {
    this.cycle += value;
    this.toWait += value * 559;
    this.lastInstructionLen += value;
  }

  freezeForOam() {
    this.cpuFreeze = 512;
    this.toWait += 512 * 559;
  }

  sendCpuInst() {
    if (this.cpuFreeze > 0) {
      this.cpuFreeze--;
    } else {
      cpu.step();
    }
  }

  ppuCycle() {
    for (var i = 0; i < this.lastInstructionLen; i++) {
      ppu.step();
      ppu.step();
      ppu.step();
    }
    this.lastInstructionLen = 0;
  }
  setNewInterval() {
    var delayNs = this.toWait;

    var carryNS = delayNs - 1000000;

    this.toWait = 0; //add "artificial" time to compensate the ns problem

    window.setTimeout(this.step.bind(this), 1);
  }
  step() {
    //1788 instruction at 559ns =1000000 = 1ms

    while (this.toWait < 10000000) {
      this.sendCpuInst();
      this.ppuCycle();
    }

    this.setNewInterval();
  }

  timeStep() {
    window.setTimeout(this.step.bind(this), 1);
  }
}

export default new clock();
