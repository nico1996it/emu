//cose per demo
import cpu from "./cpu/cpu";
import ppu from "./ppu/ppu";

class clock {
  cycle = 0;
  cpuFreeze = 0;
  lastInstructionLen = 0;
  toWait = 0;
  offset = 0;

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
  setNewInterval(time) {
    time = time + this.offset;
    if (time < 0) {
      this.offset = time;
      time = 0;
    } else {
      this.offset = 0;
    }
    window.setTimeout(this.step.bind(this), time);
  }
  step() {
    //1788 instruction at 559ns =1000000 = 1ms
    var time = Date.now();

    while (this.toWait < 30000000) {
      this.sendCpuInst();
      this.ppuCycle();
    }
    //   console.log("time", this.totaltime / this.iteration);
    this.setNewInterval(this.toWait / 1000000 - (Date.now() - time));
    this.toWait = 0;
  }

  timeStep() {}
}

export default new clock();
