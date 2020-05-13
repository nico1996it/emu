//cose per demo
import cpu from "./cpu/cpu";
import ppu from "./ppu/ppu";

class clock {
  cycle = 0;
  cpuFreeze = 0;
  lastInstructionLen = 0;
  toWait = 0;
  totaltime = 0;
  iteration = 0;
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

    window.setTimeout(this.step.bind(this), 0);
  }
  step() {
    //1788 instruction at 559ns =1000000 = 1ms
    var time = Date.now();

    while (this.toWait < 50000000) {
      this.sendCpuInst();
      this.ppuCycle();
    }
    console.log("time", this.totaltime / this.iteration);
    this.toWait = 0;
    this.totaltime += Date.now() - time;
    this.iteration++;
  }

  timeStep() {
    window.setInterval(this.step.bind(this), 0);
  }
}

export default new clock();
